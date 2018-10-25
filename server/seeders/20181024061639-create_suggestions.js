'use strict';

const db = require('../models')
const _ = require('underscore');

const k = 5;

module.exports = {
  up: (queryInterface, Sequelize) => {
    const Product = db.sequelize.models.Product;
    return Product.findAll({})
      .then(products => {
        const n = products.length;
        var suggestions = []
        for(var i = 0; i < n; i++) {
          var productId = products[i].id;          
          for(var idx = 0; idx < k; idx++) {
            let p = Math.floor(Math.random()*n);
            if (i !== p) {
              let suggestProductId = products[p].id;
              suggestions.push({productId: productId, suggestProductId: suggestProductId})
            }            
          }
        }
        return suggestions;
      })
      .then(suggestions => {        
        const Suggestion = db.sequelize.models.Suggestion;
        return Promise.all(suggestions.map((item) => {
          return Suggestion.create(item);
        }))    
      });

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Suggestion', null, {});
  }
};
