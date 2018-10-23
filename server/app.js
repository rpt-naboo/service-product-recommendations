const express = require('express');
const path = require('path');

const app = express();
const port = 3007;
const db = require('../db/index.js');

// Serve up the public folder since that's where our client bundle.js file will end up.
// app.use(express.static(__dirname + '/../client/dist'));
app.use(express.static(path.join(__dirname, '/../client/dist')));

const Product = db.Product;
const ProductModel = db.ProductModel;
// const { Product, ProductModel } = db.SuggestProduct;
const SuggestProduct = db.SuggestProduct;
const SuggestProductModel = db.SuggestProductModel;

// const { SuggestProduct, SuggestProductModel } = db.SuggestProduct;

app.get('/api/products', (req, res) => {
  ProductModel.all(Product, (err, resData) => {
    if (err) {
      res.send('err');
    } else {
      res.send(resData);
    }
  });
});

app.get('/api/suggestProducts/:id', (req, res) => {
  // '5bc966caa6944b44e5edf886'
  const id = req.params.id;
  SuggestProductModel.get(SuggestProduct, id, (err, resData) => {
    if (err) {
      res.send('err');
    } else {
      res.send(resData);
    }
  });
});

app.get('/api/suggestProducts', (req, res) => {
  SuggestProductModel.all(SuggestProduct, (err, resData) => {
    if (err) {
      res.send('err');
    } else {
      res.send(resData);
    }
  });
});

app.get('/', (req, res) => {
  res.send('Hello world!');
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Exapmle app listening on port ${port}!`);
  });
}

module.exports = app;
