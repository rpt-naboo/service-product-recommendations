const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;

const schema = new Schema({
	name: String,
	slug: {type: String, unique: true},
	desktop_square_image_url: String,
	description: String,	
	updateDate: {type: Date, default: Date.now},
	createdDate: {type: Date, default: Date.now}
});

const create = (model, item, callback) => {
	model.where({slug: item.slug}).findOne((err, res) => {
		if (err) console.log(err);
		if (res === null) {
			model.create(item, (err, res) => {
				if (err) {
					callback(err, null);
				} else {
					callback(null, res);
				}
			});
		}
	})
}

const deleteOne = (model, id, callback) => {
	model.where({_id: id}).findOne((err, res) => {
		if (err) console.log(err);
		console.log('hello', '5bc24683ee474a562fad1eb8');
		if (res !== null) {
			model.deleteOne({_id: id}, (err) => {
				callback(err);
			})
		}
	})	
}

const all = (model, callback) => {
	model.find({}, (err, res) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, res);
		}
	})
}

//module.exports.Product = Product;
module.exports.schema = schema;
module.exports.create = create;
module.exports.deleteOne = deleteOne;
module.exports.all = all;
