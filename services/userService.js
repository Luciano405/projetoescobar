const auth = require('../auth');
const bcrypt = require('bcrypt');
const db = require('../models');
const round_salts = 10;

class UserService {
    constructor(UserModel) {
        this.User = UserModel;
    }

   
    async create({ email, password }) {
        try {
            //verificação de email
            const existingUser = await this.User.findOne({ where: { email } });
            if (existingUser) {
                throw new Error('O e-mail já está cadastrado.');
            }

            //criptografia da senha
            const hashpassword = await bcrypt.hash(password, round_salts);


            const newUser = await this.User.create({
                email,
                password: hashpassword
            });

            return newUser;
        } catch (error) {
            throw error; 
        }
    }

    //encontrar todos os usuarios
    async findAll() {
        try {
            const allUsers = await this.User.findAll();
            if (!allUsers) {
                throw new Error('Nenhum usuário encontrado.');
            }
            return allUsers;
        } catch (error) {
            throw error;
        }
    }

    //encontrar usuario utilizando id
    async findById(id) {
        try {
            const user = await this.User.findByPk(id);
            if (!user) {
                throw new Error('Usuário não encontrado.');
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    //login do usuario
    async login(email, password) {
        try {
            const user = await this.User.findOne({ where: { email } });

            //verificação de usuario
            if (!user) {
                throw new Error('Usuário não encontrado');
            }

            //comparar a senha com a criptografia
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Senha inválida');
            }

            //geração de token
            const token = await auth.generateToken(user);

            //limpar a senha do objeto
            user.dataValues.password = ''; 

            //retornar o token
            return { user, token };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;
