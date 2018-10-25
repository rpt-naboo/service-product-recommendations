'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.hasMany(models.Suggestion, {
    	foreignKey: 'productId',
    	as: 'suggestions'
    });
  };
  return Product;
};