const express = require('express');
const app = express();
const port = 3007;
const db = require('../db/index.js');

app.get('/api', (req, res)=>{
	//const data = new db.ProductModel({name: 'GG'});
	db.productCreate({name: 'Josh'}, (err, res) => {
		console.log(err, res)
	})
	res.send('Hello world!');
});

app.get('/', (req, res) => {
	res.send('Hello world!');
});

app.listen(port, () => {
	console.log(`Exapmle app listening on port ${port}!`);
})

