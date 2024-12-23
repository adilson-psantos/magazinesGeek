const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Caminho para o arquivo JSON onde os produtos serão armazenados
const DATA_FILE = './products.json';

// Função para carregar produtos
const loadProducts = () => {
    if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE);
        return JSON.parse(data);
    }
    return [];
};

// Função para salvar produtos
const saveProducts = (products) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
};

// Endpoint para obter produtos
app.get('/api/products', (req, res) => {
    const products = loadProducts();
    res.json(products);
});

// Endpoint para adicionar um novo produto
app.post('/api/products', (req, res) => {
    const newProduct = req.body;

    // Validar campos obrigatórios
    if (!newProduct.produto || !newProduct.tipo || !newProduct.descricao || !newProduct.preco || !newProduct.nome || !newProduct.whatsapp || !newProduct.imagem) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const products = loadProducts();
    products.push(newProduct);
    saveProducts(products);

    res.status(201).json({ message: 'Produto adicionado com sucesso!', product: newProduct });
});

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

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
