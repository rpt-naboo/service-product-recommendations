'use strict';
module.exports = (sequelize, DataTypes) => {
  const Suggestion = sequelize.define('Suggestion', {
    productId: DataTypes.INTEGER,
    suggestProductId: DataTypes.INTEGER
  }, {});
  Suggestion.associate = function(models) {
    // associations can be defined here
    Suggestion.belongsTo(models.Product, {
    	foreignKey: 'productId',
    	onDelete: 'CASCADE',
    })
  };
  return Suggestion;
};