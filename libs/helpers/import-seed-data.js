const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const PATH = ['product_data.json','data_suggests.json'];
const productModel = require('./../../db/models/product.js')
const suggestProductModel = require('./../../db/models/suggestProduct.js')

let Product = mongoose.model('Product', productModel.schema);
Product.remove({}, function(err) { 
   console.log('Product removed') 
});

//let Product = mongoose.model('Product', productModel.schema);

fs.readFile(path.join(__dirname,PATH[0]) , (err, data)=>{
	if (err) throw err
	const result = JSON.parse(data);
	let products = _.filter(result, (item) => {
		return item['item_type'] === "product"
	});
	_.each(products, (item) => {
		// productModel.create(Product, item, (err, res) => {
		// 	console.log(err, res);
		// })
		console.log(item)
		productModel.create(Product, item, (res, err) => {
			if(err) {
				console.log(err)
			}
		})
	});	
});

// import SuggestProduct

let SuggestProduct = mongoose.model('SuggestProduct', suggestProductModel.schema);
SuggestProduct.remove({}, function(err) { 
   console.log('SuggestProduct removed') 
});
//SuggestProduct = mongoose.model('SuggestProduct', suggestProductModel.schema);

fs.readFile(path.join(__dirname,PATH[1]), (err, data)=>{
	if (err) throw err
	const result = JSON.parse(data);
	_.each(result, (item) => {
		let slug = item['slug'];
		var sugggests = item['suggestItems'];
		_.each(sugggests, (suggestItem) => {
			var sugggestSlug = suggestItem['slug'];
			suggestProductModel.create(Product, SuggestProduct, {slug: slug, suggestSlug: sugggestSlug})
			.then((res) => {
				console.log(res);
			});
			console.log('done....')
		})
	});	
});

const mongoDB = 'mongodb://127.0.0.1/service_product_recommendations';
const promise = mongoose.connect(mongoDB);
