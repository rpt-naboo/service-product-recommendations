const Product = require('../models').Product;

module.exports = {
  create(req, res) {
    return Product
      .create({
        name: req.body.name, imageUrl: req.body.image_url
      })
      .then(product => res.status(201).send(product))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Product
      .findAll({})
      .then(products => res.status(200).send(products))
      .catch(error => res.status(400).send(error));
  },
  get(req, res) {
    return Product
      .findAll({where: {id: req.params.id}})
      .then(products => res.status(200).send(products))
      .catch(error => res.status(400).send(error));
  }
};
