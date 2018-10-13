const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;

const ProductModelSchema = new Schema({
	name: String,
	// code: {type: String, unique: true},
	// slug: {type: String, unique: true},
	imageUrl: String,
	description: String,	
	updateDate: {type: Date, default: Date.now},
	createdDate: {type: Date, default: Date.now}
});

const Product = mongoose.model('Product', ProductModelSchema);

const create = (item, callback) => {
	Product.create(item, (err, res) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, res);
		}
	});
}

//module.exports.Product = Product;
module.exports.create = create;