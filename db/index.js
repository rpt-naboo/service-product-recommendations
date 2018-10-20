//Import the mongoose module
const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1/service_product_recommendations';
const ProductModel = require('./models/product.js');
const SuggestProductModel = require('./models/suggestProduct.js');

const promise = mongoose.connect(mongoDB);

promise.then((db) => {
  console.log('woohoo mongoose connected successfully');
}).catch((err) => {
  console.log('mongoose connection error, please make sure your mongodb is running.');  
});

var db = mongoose.connection;

const Product = mongoose.model('Product', ProductModel.schema);
const SuggestProduct = mongoose.model('SuggestProduct', SuggestProductModel.schema);

module.exports.ProductModel = ProductModel;
module.exports.Product = Product;
module.exports.SuggestProductModel = SuggestProductModel;
module.exports.SuggestProduct = SuggestProduct;