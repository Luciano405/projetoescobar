var express = require('express');
var router = express.Router();
const { verifyToken } = require('../auth');

const db = require('../models') 


const CartService = require('../services/cartService');
const CartController = require('../controllers/cartController');


const cartService = new CartService(db.Cart);
const cartController = new CartController(cartService);

router.post('/add', verifyToken, (req, res,) => {
  cartController.addProduct(req,res);
});


router.delete('/remove/:id', verifyToken, (req, res)=>{
 cartController.removeProduct(req,res);
});

router.get('/', verifyToken, (req,res)=>{
 cartController.getCart(req,res);
});


module.exports = router;
