var express = require('express');//Para as rotas
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Importando o Sequelize e o modelo User
var sequelize = require('./models').sequelize;
// var User = require('./models/user')(sequelize);

const cors = require('cors');

var indexRouter = require('./routes/index');//Para a rota principal do app
var usersRouter = require('./routes/users');//Para a rota users ./routes/users.js
var productRouter = require('./routes/product_routes');//Para a rota de produtos
var cartRouter = require('./routes/cart_routes');//Para a rota da cesta de produtos


var app = express();//Ativa a API com o Express

const { verifyToken } = require('./auth');

app.use(cors({
    origin: 'http://localhost:3000',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  
    allowedHeaders: ['Content-Type', 'Authorization']  
  }));
app.use(logger('dev'));
app.use(express.json()); //Permite o uso de JSon
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', usersRouter); //Rota users protegida
app.use('/', indexRouter);//Cria a rota app/
app.use('/products', verifyToken, productRouter); //Rota de produtos protegida
app.use('/cart', verifyToken, cartRouter);  //Rota app/cart protegida


// Sincronizando o Sequelize (em dev)
//Instanciar o banco de dados

const db = require('./models');

async function applyDataStructure(){
    await db.sequelize.sync({alter: true});
}

applyDataStructure();
// if (process.env.NODE_ENV !== 'production') {
//     sequelize.sync({ force: true }) // use 'force: true' para recriar as tabelas a cada inicialização (útil em dev)
//         .then(() => {
//             console.log('Banco de dados sincronizado');
//         })
//         .catch(err => {
//             console.error('Erro ao sincronizar o banco de dados:', err);
//         });
// }

//Inciar o servidor com o app.js na porta 8083
var port = 8083;
app.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`);
});
module.exports = app;
