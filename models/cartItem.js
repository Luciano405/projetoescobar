const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const CartItem = sequelize.define('CartItem', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_product: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Products', 
                key: 'id_product',
            }
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 1,
        },
        totalPrice: {
            type: Sequelize.DECIMAL,
            allowNull: true,
        }
    });
    
    
    return CartItem;
};
