const { generateToken } = require('../auth');

class UserController {
    constructor(UserService) {
        this.userService = UserService;
    }
    
    // Criar usuário
    async createUser(req, res) {
        const { email,  password } = req.body;

        try {
           
            const newUser = await this.userService.create({ email, password });
           
            return res.status(201).json(newUser); 
        } catch (error) {
           
            console.error(error);
            return res.status(500).json({ error: 'Ocorreu um erro ao gravar o novo usuário.' });
        }
    }

    
    async findAllUsers(req, res) {
        try {
            const allUsers = await this.userService.findAll();
            return res.status(200).json(allUsers);
        } catch (error) {
            return res.status(500).json({ error: 'Ocorreu um erro ao localizar os usuários.' });
        }
    }

  
    async findUserById(req, res) {
        const { id } = req.query;
        try {
            const user = await this.userService.findById(id);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: 'Ocorreu um erro ao localizar o usuário pelo ID.' });
        }
    }
    
    async login(req, res) {
        const { email, password } = req.body;
    
        try {
            
            const user = await this.userService.login(email, password);
    
            if (!user) {
                return res.status(401).json({ error: 'Usuário ou senha inválidos' });
            }
    
           
            const token = await generateToken(user);
    
            
            return res.status(200).json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                },
            });
        } catch (error) {
            console.error('Erro ao logar o usuário:', error);
            return res.status(500).json({ error: 'Erro ao logar o usuário' });
        }
    }
}

module.exports = UserController;
