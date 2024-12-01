const { Cart, Product, CartItem} = require('../models');
console.log(CartItem);

class CartService {
    async addProduct(userId, product) {
        try {
            
            const existingProduct = await Product.findByPk(product.id_product);
            if (!existingProduct) {
                throw new Error('Produto não encontrado.');
            }
          
            
            let cart = await Cart.findOne({ where: { userId } });
            if (!cart) {
                cart = await Cart.create({ userId });
              
            } else {
               
            }
    
           
            const existingCartItem = await CartItem.findOne({
                where: { cartId: cart.id, id_product: existingProduct.id }
            });
    
            if (existingCartItem) {
                existingCartItem.quantity += product.quantity;
                existingCartItem.totalPrice = existingCartItem.quantity * existingProduct.price_product;
                await existingCartItem.save();
              
            } else {
                await CartItem.create({
                    id_product: existingProduct.id,
                    quantity: product.quantity,
                    totalPrice: existingProduct.price_product * product.quantity,
                });
                
            }
    
            return await this.getCart(userId);
        } catch (error) {
            console.error('Erro ao adicionar produto ao carrinho:', error.message);
            throw error;
        }
    }
    
    
    async removeProduct(userId, id_product) {
        const cart = await Cart.findOne({ where: { userId } });
        if (!cart) return null;
    
        const cartItem = await CartItem.findOne({ where: { cartId: cart.id, id_product } });
        if (cartItem) {
            await cartItem.destroy(); 
            return await this.getCart(userId);
        }
        
        return null; 
    }

    async getCart(userId) {
        const cart = await Cart.findOne({ where: { userId } });
        if (!cart) return null;
    
        const items = await CartItem.findAll({ where: { cartId: cart.id } });
        const itemDetails = await Promise.all(items.map(async (item) => {
            const product = await Product.findByPk(item.id_product);
            return {
                id: product.id_product,
                name: product.name_product,
                quantity: item.quantity,
                totalPrice: item.totalPrice,
            };
        }));
    
        return {
            id: cart.id,
            userId: cart.userId,
            items: itemDetails,
            createdAt: cart.createdAt,
            updatedAt: cart.updatedAt,
        };
    }
}

module.exports = CartService;