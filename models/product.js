const Sequelize = require('sequelize');
module.exports = (sequelize) =>{
    const Product = sequelize.define('Product',{
        id_product:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey:true,
        },
        name_product:{
            type: Sequelize.STRING,
            allowNull:false
        },
        description_product:{
            type: Sequelize.STRING,
            allowNull: true 
        },
        price_product:{
            type: Sequelize.DECIMAL,
            allowNull:false,
            validate:{ 
                min: 0
            }
        },
        stock_product:{
            type: Sequelize.INTEGER,
            allowNull: false,
            validate:{
                min: 0
            }
        }
    });
    return Product;
};