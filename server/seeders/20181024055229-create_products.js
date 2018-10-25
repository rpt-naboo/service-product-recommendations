'use strict';

const db = require('../models')
const _ = require('underscore');
const seeds = require('../../libs/helpers/product_data');

var seedProducts = _.filter(seeds.products, (product) => {
  return product.item_type === 'product';
});

seedProducts = _.map(seedProducts, (product) => {
  return {name: product.name, imageUrl: product.desktop_image_url}
})

module.exports = {
  up: (queryInterface, Sequelize) => {
    const Products = seedProducts;
    const Product = db.sequelize.models.Product;
    return Promise.all(Products.map((item) => {
      return Product.create(item)
    }))
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Product', null, {});
  }
};
