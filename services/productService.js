const db = require('../models');

class ProductService{
    constructor(ProductModel){
        this.Product = ProductModel;
    }

    async create({name_product, description_product, price_product, stock_product}){
        try{
            const newProduct = await this.Product.create({
                name_product,
                description_product,
                price_product,
                stock_product

          });
            return newProduct;
            
        }
        catch (error){
            throw error;
        }
    }
    


    async findAll()
    {
        try{
            const AllProducts = await this.Product.findAll();
            return AllProducts? AllProducts : null;
        }
        catch(error){
            throw error;
        }

    }
   
    async findById(id_product){
        try{
            const Product = await this.Product.findByPk(id_product);
            return Product? Product: null;
        }
        catch (error){
            throw error;
        }
    }

    
    async update(id_product, data){
        try{
        const product = await this.Product.findByPk(id_product);
        
        if (!product){
            return null;
        }
                const update_product = await product.update(data);
                return update_product;
            }
            catch (error){
                throw error;
            }
        }
         
    async delete(id_product){
        try{
            const product = await this.Product.findByPk(id_product);
            if (!product){
                return null;
            }
            await product.destroy();
            return { message: 'Produto deletado.'};
        }
        catch (error){
            throw error;
        }
     }
}  
    
    
    
    


module.exports = ProductService;