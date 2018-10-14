//Import the mongoose module
const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1/service_product_recommendations';
const ProductModel = require('./models/product.js');

const promise = mongoose.connect(mongoDB);

promise.then((db) => {
  console.log('woohoo mongoose connected successfully');
}).catch((err) => {
  console.log('mongoose connection error, please make sure your mongodb is running.');  
});

var db = mongoose.connection;

module.exports.ProductModel = ProductModel;
module.exports.productCreate = ProductModel.create;