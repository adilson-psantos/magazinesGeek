    // Função para carregar produtos do localStorage
    function loadProducts() {
        const productList = document.getElementById('productList');
        const products = JSON.parse(localStorage.getItem('products')) || [];
        
        // Exibir os produtos armazenados
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <img src="${product.imagem}" alt="Imagem do Produto">
                <h3>${product.produto}</h3>
                <p><strong>Tipo:</strong> ${product.tipo}</p>
                <p><strong>Descrição:</strong> ${product.descricao}</p>
                <p><strong>Preço:</strong> R$ ${product.preco}</p>
                <p><strong>Nome:</strong> ${product.nome}</p>
                <a href="https://wa.me/55${product.whatsapp}" class="whatsapp-button" target="_blank">WhatsApp</a>
            `;
            productList.appendChild(productItem);
        });
    }

    document.getElementById('productForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const produto = document.getElementById('produto').value;
        const tipo = document.getElementById('tipo').value;
        const descricao = document.getElementById('descricao').value;
        const preco = document.getElementById('preco').value;
        const nome = document.getElementById('nome').value;
        const whatsapp = document.getElementById('whatsapp').value;
        const imagem = document.getElementById('imagem').files[0];

        if (!/^\d{11}$/.test(whatsapp)) {
            alert('Por favor, insira um número de WhatsApp válido com 11 dígitos.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            // Armazenar os produtos no localStorage
            const products = JSON.parse(localStorage.getItem('products')) || [];
            products.push({
                produto,
                tipo,
                descricao,
                preco,
                nome,
                whatsapp,
                imagem: e.target.result
            });
            localStorage.setItem('products', JSON.stringify(products));

            // Atualizar a lista de produtos
            loadProducts();

            // Exibir mensagem de sucesso
            document.getElementById('successMessage').style.display = 'block';

            // Resetar o formulário
            document.getElementById('productForm').reset();

            // Ocultar mensagem após alguns segundos
            setTimeout(function() {
                document.getElementById('successMessage').style.display = 'none';
            }, 3000);
        };
        reader.readAsDataURL(imagem);
    });

    // Função para limpar o formulário
    document.getElementById('clearButton').addEventListener('click', function() {
        document.getElementById('productForm').reset();
    });

    // Carregar os produtos quando a página for carregada
    window.onload = loadProducts;

    