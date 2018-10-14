const mongoose = require('mongoose');
const fs = require('fs');
const _ = require('underscore');
const PATH = 'product_data.json';
const productModel = require('./../../db/models/product.js')


if (mongoose.model('Product', productModel.schema)){
	//console.log('model has been created')
	mongoose.deleteModel('Product');
}
const Product = mongoose.model('Product', productModel.schema);
Product.remove();

fs.readFile(PATH, (err, data)=>{
	if (err) throw err
	const result = JSON.parse(data);
	let products = _.filter(result, (item) => {
		return item['item_type'] === "product"
	});

	_.each(products, (item) => {
		productModel.create(Product, item, (err, res) => {
			console.log(err, res);
		})
	})
	
});

const mongoDB = 'mongodb://127.0.0.1/service_product_recommendations';
const promise = mongoose.connect(mongoDB);
