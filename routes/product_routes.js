var express = require('express');
var router = express.Router();

const db = require('../models') 


const ProductService = require('../services/productService');
const ProductController = require('../controllers/productController');


const productService = new ProductService(db.Product);
const productController = new ProductController(productService);

router.get('/', function(req, res, next) {
  res.send('Módulo de produtos rodando.');
});


router.post('/', async(req, res)=>{
 productController.createProduct(req,res);
});

router.get('/all', async (req,res)=>{
 productController.findAllProducts(req,res);
});

router.put('/:id_product', async (req,res)=>{
 productController.updateProduct(req,res);
});

router.delete('/:id_product', async (req,res)=>{
 productController.deleteProduct(req,res);
});

module.exports = router;
