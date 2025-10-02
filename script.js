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
    if (catalogo.length == 0) {
        listaFilmesContainer.innerHTML = '';
    }


    // A. CRIAÇÃO DE ELEMENTOS HTML (document.createElement)

    // Cria a <div> que será o container de cada filme.
    const filmeDiv = document.createElement('div');
    filmeDiv.classList.add('filme-item'); // Adiciona uma classe para a estilização

    // Cria o <h3> para o tíltulo e define seu texto.
    const tituloH3 = document.createElement('h3');
    tituloH3.textContent = filme.titulo
}