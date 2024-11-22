function loadProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    const products = JSON.parse(localStorage.getItem('products')) || [];

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

document.getElementById('productForm').addEventListener('submit', function (event) {
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
    reader.onload = function (e) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.push({
            produto,
            tipo,
            descricao,
            preco,
            nome,
            whatsapp,
            imagem: e.target.result,
        });
        localStorage.setItem('products', JSON.stringify(products));

        loadProducts();
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('productForm').reset();

        setTimeout(() => {
            document.getElementById('successMessage').style.display = 'none';
        }, 3000);
    };
    reader.readAsDataURL(imagem);
});

document.getElementById('clearButton').addEventListener('click', () => {
    document.getElementById('productForm').reset();
});

window.onload = loadProducts;

// Endpoint para buscar produtos pelo nome
app.get('/api/products/search', (req, res) => {
    const { name } = req.query;
    const products = loadProducts();

    if (!name) {
        return res.status(400).json({ error: 'O parâmetro "name" é obrigatório para a busca.' });
    }

    // Filtrar produtos que correspondem ao nome (case insensitive)
    const filteredProducts = products.filter(product =>
        product.produto.toLowerCase().includes(name.toLowerCase())
    );

    res.json(filteredProducts);
});

// Endpoint para excluir produto pelo nome
app.delete('/api/products', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'O campo "name" é obrigatório para excluir um produto.' });
    }

    const products = loadProducts();
    const filteredProducts = products.filter(product =>
        product.produto.toLowerCase() !== name.toLowerCase()
    );

    if (products.length === filteredProducts.length) {
        return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    saveProducts(filteredProducts);
    res.json({ message: 'Produto excluído com sucesso.' });
});



