const express = require('express');
const app = express();
const port = 3007;
const db = require('../db/index.js');


let Product = db.Product;
let ProductModel = db.ProductModel;

app.get('/api/products', (req, res)=> {
	ProductModel.all(Product, (err, resData)=> {
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

app.listen(port, () => {
	console.log(`Exapmle app listening on port ${port}!`);
})

