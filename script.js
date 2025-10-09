// 1. ARMAZENAMENTO DE DADOS
// Array global que irá guardar todos os filmes como Objetivos.
// Ex.: [{titulo: 'filme X', sinopse: 'sinopse Y'}]
const catalogo = []
// 2. CAPTURA DE ELEMENTOS DO DOM (Document Object Model)
// Capturamos os elementos HTML que vamos interagir, usando IDs.

const form = document.getElementById("cadastro-filme");
const listaFilmesContainer = document.getElementById("lista-filmes");

// -------------------------------------------------------------------
// FUNÇÃO DE REMOÇÃO
// -------------------------------------------------------------------

/*
 * Remove um filme do array de dados e do elemento HTML na tela.
 * @param {number} indice - A posição do filme no array 'catálogo'.
 * @param {HTMLElement} elementoDOM - O elemento <div> do filme a ser removido da tela
 */

function removerFilme(indice, elementoDOM) {
    // A. REMOÇÃO DO ARRAY (Lógica)
    // splice(indice, 1) remove 1 elemento a partir da posição 'índice'.
    // Isso atualiza o array 'catalogo'.
    catalogo.splice(indice, 1);

    // B. REMOÇÃO DO DOM (Visual)
    // O método .remove() retira o elemento HTML da visualização do usuário.
    elementoDOM.remove();

    // Opcional: Atualiza a mensagem da lista se estiver vazia
    if (catalogo.length == 0) {
        listaFilmesContainer.innerHTML = '<p>Nenhum filme cadastrado ainda.</p>';
    }

    console.log(`Filme no índice ${indice} removido. Catálogo atualizado:`, catalogo);
}

// -------------------------------------------------------------------
// FUNÇÃO DE RENDERIZAÇÃO
// -------------------------------------------------------------------

/**
 * Cria a exibe a estrutura HTMML de um  filme na lista.
 * @param {Object} filme - O objeto {titulo, sinopse} do filme.
 * @param {number} indice - O índicce atual do filme no array 'catalogo'.
 */
function renderizarFilme(filme, indice) {
    // Remove a mensagem inicial se for o primeiro filme
    if (catalogo.length >= 1) {
        listaFilmesContainer.innerHTML = '';
    }


    // A. CRIAÇÃO DE ELEMENTOS HTML (document.createElement)

    // Cria a <div> que será o container de cada filme.
    const filmeDiv = document.createElement('div');
    filmeDiv.classList.add('filme-item'); // Adiciona uma classe para a estilização

    // Cria o <h3> para o tíltulo e define seu texto.
    const tituloH3 = document.createElement('h3');
    tituloH3.textContent = filme.titulo;

    // Cria o <p> para a sinopse e define seu texto.
    const sinopseP = document.createElement('p');
    sinopseP.textContent = filme.sinopse;

    // Cria o botão de remoção.
    const removerBotao = document.createElement('button');
    removerBotao.textContent = "Remover";
    removerBotao.classList.add('btn-remover');

    // B. DEFINIÇÃO DO EVENTO DE REMOÇÃO (addEventListener)
    // Anexa a função 'removerFilme' ao clique do botão.
    removerBotao.addEventListener('click', () => {
        // Ao clicar, chamamos a função, passando o índice (posição) e a própria <div> (filmeDiv)
        removerFilme(indice, filmeDiv);
    });

    // C. ANEXAR ELEMENTO (appendChild)
    //  Monta a estrutura hierárquica:
    // filmeDiv
    //  |- tituloH3
    //  |- sinopseP
    //  |- removerBotao
    filmeDiv.appendChild(tituloH3);
    filmeDiv.appendChild(sinopseP);
    filmeDiv.appendChild(removerBotao);

    // D. INSERÇÃO NO DOM FINAL
    // Adiciona o filme montado (filmeDiv) dentro do container principal na página.
    listaFilmesContainer.appendChild(filmeDiv);
}

// -------------------------------------------------------------------
// FUNÇÃO PRINCIPAL DE ADIÇÃO (Manipulador do Formulário)
// -------------------------------------------------------------------

/**
 * Lida com o envio do formulário, captura os dados e salva op filme.
 * @param {Event} evento - O evento de 'submit' do formulário.
 */
function adicionarFilme(evento) {
    // 3. Previne o recarregamento da página
    // O comportamento padrão de um formulário é recarregar a página. O preventeDefault() impede isso.
    evento.preventDefault();

    // 4. Captura 
    const tituloInput = document.getElementById('titulo');
    const sinopseInput = document.getElementById('sinopse');

    // Cria o objetivo JaaScript com os dados
    const novoFilme = {
        titulo: tituloInput.value,
        sinopse: sinopseInput.value
    };

    // 5. Armazena o filme no Array
    // O método .push() adiciona o novo objeto no final do array 'catalogo'.
    catalogo.push(novoFilme);

    // 6. Renderiza na Tela
    // Passamos o novo objeto e seu índice (que é sempre o último, ou seja, tamanho -1).
    renderizarFilme(novoFilme, catalogo.length - 1);
    
    // 7. Limpa o formulário
    // O método .reset() limpa os campos todos os campos do formulário para o próximo cadastro.
    form.reset();
}

// 8. ESCUTANDO O EVENTO DO BOTÃO/FORMULÁRIO
// Anexamos a função 'adicionarFilme' ao evento de 'submit' do formulário.
form.addEventListener('submit', adicionarFilme);

console.log("JavaScript carregado. pronto para iniciar o catálogo!");