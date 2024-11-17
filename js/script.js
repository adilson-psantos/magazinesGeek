// Seleciona o formulário pelo seu ID
const formulario = document.getElementById("form-novo-produto");
// Seleciona a seção onde os produtos serão exibidos
const secaoProdutos = document.querySelector(".produtos");

// Adiciona um evento ao formulário para capturar o envio dos dados
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault(); // Impede o comportamento padrão de recarregar a página ao enviar o formulário

    // Captura os valores dos campos do formulário
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const valor = document.getElementById("valor").value;
    const imagem = document.getElementById("imagem").value;
    const whatsapp = document.getElementById("whatsapp").value;

    // Cria um novo elemento `div` para representar o produto
    const produto = document.createElement("div");
    produto.classList.add("produto"); // Adiciona a classe CSS `produto` para estilização

    // Define o conteúdo HTML do novo produto
    produto.innerHTML = `
        <img src="${imagem}" alt="${titulo}" class="imagem-produto">
        <!-- Adiciona a imagem do produto -->
        <h2 class="titulo-produto">${titulo}</h2>
        <!-- Adiciona o título do produto -->
        <p class="descricao-produto">${descricao}</p>
        <!-- Adiciona a descrição do produto -->
        <p class="valor-produto">R$ ${parseFloat(valor).toFixed(2)}</p>
        <!-- Adiciona o valor do produto, formatado com duas casas decimais -->
        <a href="https://wa.me/55${whatsapp}" class="contato-whatsapp" target="_blank">Contato via WhatsApp</a>
        <!-- Adiciona o link para o WhatsApp do vendedor -->
    `;

    // Adiciona o novo produto na seção de produtos
    secaoProdutos.appendChild(produto);

    // Limpa os campos do formulário após a adição do produto
    formulario.reset();
});