const jwt = require('jsonwebtoken')
const secret = '123'; //Ponto de vulnerabilidade porque a chave secreta não acessivel
//Recomenda-se gravar em variaveis de ambiente do sistema operacional


async function generateToken(user){
    const id = user.id;
    const email = user.email;
    const token = jwt.sign({id,email},secret, {expiresIn:'1h'});
    return token;
}


async function verifyToken(req, res, next){
    
    const authheader = req.headers['authorization']
    if(!authheader){
        return res.status(401).json({Message:'Token não informado'});
    }

    const token = authheader.split(' ')[1];
        if(!token){
        return res.status(401).json({message:'Token não informado'});
    }
    
    jwt.verify(token, secret,(err, decoded)=>{
        if (err){
            
            return res.status(401).json({Message:'Token inválido'});
        }
        req.user = decoded;
        next();
    });
}

module.exports =  {generateToken, verifyToken};
