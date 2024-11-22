const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const productsFilePath = path.join(__dirname, 'products.json');

router.get('/search', (req, res) => {
    const { name } = req.query;
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const filteredProducts = products.filter(product =>
        product.produto.toLowerCase().includes(name.toLowerCase())
    );
    res.json(filteredProducts);
});

module.exports = router;
