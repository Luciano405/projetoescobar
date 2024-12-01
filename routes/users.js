var express = require('express');
var router = express.Router();
const { verifyToken } = require('../auth');


const db = require('../models')


const UserService = require('../services/userService');
const UserController = require('../controllers/userController');


const userService = new UserService(db.User);
const userController = new UserController(userService);

router.get('/', function(req, res, next) {
  res.send('Módulo de usuários rodando.');
});

router.post('/login', async (req, res) => {
  try {
      await userController.login(req, res);
  } catch (error) {
      res.status(500).json({ error: 'Erro ao processar a requisição de login' });
  }
});


router.post('/newuser', async (req,res)=>{
  console.log('Requisição para criar novo usuário recebida');
  userController.createUser(req,res);
});

router.get('/allusers', verifyToken, async (req,res)=>{
  userController.findAllUsers(req,res);
});


router.get('/getUserById', async (req,res)=>{
  userController.findUserById(req,res);
});

module.exports = router;
