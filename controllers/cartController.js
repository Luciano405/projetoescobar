class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }

    async addProduct(req, res) {
        const { product } = req.body;
        const userId = req.user?.id; 
        
        if (!userId) {
            return res.status(400).json({ error: 'Usuário não autenticado' });
        }

        try {
            const updatedCart = await this.cartService.addProduct(userId, product);
            res.status(200).json(updatedCart);
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao adicionar produto à cesta.' });
        }
    }

    async removeProduct(req, res) {
        const userId = req.user.id;  
        const { id } = req.params;

        try {
            const updatedCart = await this.cartService.removeProduct(userId, id);
            if (!updatedCart) {
                return res.status(404).json({ error: 'Produto não encontrado no carrinho.' });
            }
            res.status(200).json(updatedCart);
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao remover produto da cesta.' });
        }
    }

    async getCart(req, res) {
        const userId = req.user.id;  
        try {
            const cart = await this.cartService.getCart(userId);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter cesta' });
        }
    }
}

module.exports = CartController;
