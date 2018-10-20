const express = require('express');
const app = express();
const port = 3007;
const db = require('../db/index.js');

// Serve up the public folder since that's where our client bundle.js file will end up.
app.use(express.static(__dirname + '/../client/dist'));

let Product = db.Product;
let ProductModel = db.ProductModel;

let SuggestProduct = db.SuggestProduct;
let SuggestProductModel = db.SuggestProductModel;

app.get('/api/products', (req, res)=> {
	ProductModel.all(Product, (err, resData)=> {		
		if(err) {
			res.send('err');
		} else {
			res.send(resData);
		}		
	})
});

app.get('/api/suggestProducts/:id', (req, res) => {	
	const id = req.params.id;  //'5bc966caa6944b44e5edf886'
	console.log(id)
	SuggestProductModel.get(SuggestProduct, id, (err, resData) =>{
		if(err) {
			res.send('err');
		} else {
			res.send(resData);
		}
	})
})

app.get('/api/suggestProducts', (req, res) => {
	console.log('here?')
	SuggestProductModel.all(SuggestProduct, (err, resData)=> {
		if(err) {
			res.send('err');
		} else {
			res.send(resData);
		}		
	})
});


app.get('/', (req, res) => {
	res.send('Hello world!');
});

if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => {
		console.log(`Exapmle app listening on port ${port}!`);
	})	
}

module.exports = app;