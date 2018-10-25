const productsController = require('../controllers').products;
const suggestionsController = require('../controllers').suggestions;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status.send({
    message: 'Welcome to the Naboo API!',
  }));
  
  app.get('/api/products', productsController.list);
  app.post('/api/products', productsController.create);
  app.get('/api/products/:id', productsController.get);
  app.get('/api/suggestions', suggestionsController.list);
  app.get('/api/suggestions/products/:productId', suggestionsController.get);
};