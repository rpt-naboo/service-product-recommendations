const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;

const schema = new Schema({
	product: { type: Schema.Types.ObjectId, ref: 'Product' },
	suggestedProduct: { type: Schema.Types.ObjectId, ref: 'Product' },
	updateDate: {type: Date, default: Date.now},
	createdDate: {type: Date, default: Date.now}
});

// to insert a new suggestion, 
// we need to find the _id for the product, and the suggesting product _id
const create = (parentModel, model, item, callback) => {
	return parentModel
		.findOne({slug: item.slug})
		.then((mainItem) => {
			if (mainItem !== undefined) {
				//console.log(mainItem._id)
				return mainItem._id;
			} else {
				return null;
			}
		}).then((mainSlug) => {
			return parentModel.findOne({slug: item.suggestSlug})
			.then((suggestItem) => {
				console.log(suggestItem)
				if (suggestItem !== undefined) {
					console.log("#28", {"product": mainSlug, "suggestedProduct": suggestItem._id})
					return {"product": mainSlug, "suggestedProduct": suggestItem._id};
				} else {
					return null;
				}
			})
		})
		.then((suggestItem) => {
			console.log(suggestItem)
			if (suggestItem !== undefined) {
				console.log('we are going to create', suggestItem);
				var newItem = new model(suggestItem);
				return newItem.save();
			} else {
				return null;
			}
		})
		.then((product) => {
			//console.log('created', product)
			return product;
		})
		.catch((err) => {
			//console.log('err mesg', err, item)
			return {err};
		})
		
}

const get = (model, id, callback ) => {
	return model.find({product: id})
		.populate('suggestedProduct')
		.exec((err, res) => {
			callback(err, res);
		});
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

module.exports.schema = schema;
module.exports.create = create;
module.exports.all = all;
module.exports.get = get;
