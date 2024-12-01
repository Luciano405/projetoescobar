const product = require('../models/product');

class ProductController{
    constructor(ProductService){
        this.productService = ProductService;
    }
    async createProduct(req,res){
        
        const {name_product, description_product, price_product, stock_product} = req.body;
        try{
            const newProduct = await this.productService.create({name_product, description_product, price_product, stock_product});
            res.status(201).json(newProduct);          
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao gravar o novo Produto.'});
        }
    }
    async findAllProducts(req,res){
        try{
            const AllProducts = await this.productService.findAll();
            res.status(200).json(AllProducts);
        }
            catch(error){
           res
                .status(500)
                .json({error: 'Ocorreu um erro ao localizar novo Produto.'});
            
        }
    }

    async findProductById(req,res){
        const {id_product} = req.params;
        try{
            const foundproduct = await this.productService.findById(id_product);
            if (!foundproduct){
                return res.status(404).json({ error: 'Produto não encontrado.'});
            }
            res.status(200).json(foundproduct);
        }
        catch(error){
            res
                 .status(500)
                 .json({error: 'Ocorreu um erro ao localizar o produto pelo id.'});

    }
}


    async updateProduct(req, res){
        const {id_product} = req.params;
        const data = req.body;
        try{
            const updateProduct = await this.productService.update(id_product, data);
            if(!updateProduct){
                return res.status(404).json({ error: 'Produto não encontrado para atualização'});
        }
        res.status(200).json(updateProduct);
    }
    catch(error){
        res
            .status(500).json({error: 'Erro atualizar o produto'});
    }
}

    async deleteProduct(req, res){
        const {id_product} = req.params;
        try{
            const response = await this.productService.delete(id_product);
            if(!response){
                return res.status(404).json({ error: 'Produto não encontrado para deletar'});
        }
        res.status(200).json(response);
    }
    catch(error){
        res
            .status(500).json({error: 'Erro ao deletar o produto'});
    }
}



}

module.exports = ProductController;