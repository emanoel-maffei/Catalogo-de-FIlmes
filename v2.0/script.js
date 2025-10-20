const API_KEY = 'f55f96f2'; // Substitua com a sua chave da API

// 1. ARMAZENAMENTO DE DADOS
const catalogo = JSON.parse(localStorage.getItem('catalogoFilmes')) || [];

// 2. CAPTURA DE ELEMENTOS DO DOM (Document Object Model)
const form = document.getElementById('cadastro-filme');
const tituloInput = document.getElementById('titulo');
const listaFilmesContainer = document.getElementById('lista-filmes');

//------------------------------------------------------------------------------------------
// FUNÇÃO PARA SALVAR NO LOCALSTORAGE
//------------------------------------------------------------------------------------------

function salvarCatalogo() {
    localStorage.setItem('catalogo', JSON.stringify(catalogo));
}

//------------------------------------------------------------------------------------------
// FUNÇÃO DE REMOÇÃO (mantida da fase 1)
//------------------------------------------------------------------------------------------


function removerFilme(indice, elementoDOM) {
    catalogo.splice(indice, 1);
    salvarCatalogo();
    elementoDOM.remove();

    if (catalogo.length === 0) {
        listaFilmesContainer.innerHTML = '<p>Nenhum filme cadastrado ainda.</p>';
    }
}

//-------------------------------------------------------------------------------------
// FUNÇÃO RENDERIZAÇÃO
//-------------------------------------------------------------------------------------

function renderizarFilme(filme, indice) {
    if (catalogo.length === 1) listaFilmesContainer.innerHTML = '';

    const filmeDiv = document.createElement('div');
    filmeDiv.classList.add('filme-item');

    // A. elemento imagem (poster)
    const imagemPoster = document.createElement('img');
    imagemPoster.src = filme.poster && filme.poster !== 'N/A'
        ? filme.poster
        : 'https://via.placeholder.com/100x150?text=Poster+Nao+disponivel';
    imagemPoster.alt = `Poster do filme ${filme.titulo}`;
    imagemPoster.classList.add('filme-poster');

    // B. elementos de texto e info
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('filme-info');

    const tituloH3 = document.createElement("h3");
    tituloH3.textContent = filme.titulo;

    const sinopseP = document.createElement('p');
    sinopseP.textContent = filme.sinopse || 'Sinopse não disponivel';

    const removerBotao = document.createElement('button');
    removerBotao.textContent = 'Remover';
    removerBotao.classList.add('btn-remover');

    // C. Evento de remoção
    removerBotao.addEventListener('click', () => {
        const indiceAtual = catalogo.findIndex(f => f.titulo === filme.titulo);
        if (indiceAtual > -1) removerFilme(indice, filmeDiv);
    });

    // D. montagem do DOM
    infoDiv.appendChild(tituloH3);
    infoDiv.appendChild(sinopseP);
    infoDiv.appendChild(removerBotao);

    filmeDiv.appendChild(imagemPoster);
    filmeDiv.appendChild(infoDiv);

    listaFilmesContainer.appendChild(filmeDiv);
}

async function adicionarFilme(evento) {
    evento.preventDefault();

    const titulo = tituloInput.value.trim();
    if (!titulo) return; // Se não houver título, não prossegue

    const tituloFormatado = encodeURIComponent(titulo);
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(titulo)}&lang=pt`;

    try {
        const resposta = await fetch(url);
        const dadosdoFilme = await resposta.json();

        if (dadosdoFilme.Response === "True") {
            const novoFilme = {
                titulo: dadosdoFilme.Title,
                sinopse: dadosdoFilme.Plot,
                poster: dadosdoFilme.Poster,
            };

            // Armazenamento no catálogo e renderização
            catalogo.push(novoFilme);
            salvarCatalogo();
            renderizarFilme(novoFilme, catalogo.length - 1);
        } else {
            alert(`Filme não encontrado: "${titulo}".`);
        }
    } catch (erro) {
        alert('Ocorreu um erro ao tentar buscar o filme na API.');
        console.error('Erro:', erro);
    }

    form.reset();
}

function carregarLogo() {
    if (catalogo.length > 0) {
        listaFilmesContainer.innerHTML = '';
        catalogo.forEach((filme, i) => renderizarFilme(filme, i));
    }
}

// 8. ESCUTANDO O EVENTO DO BOTÃO/FORMULARIO
form.addEventListener('submit', adicionarFilme);