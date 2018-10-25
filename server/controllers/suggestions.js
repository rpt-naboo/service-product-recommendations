const Suggestion = require('../models').Suggestion;

module.exports = {
  list(req, res) {
    return Suggestion
      .findAll({})
      .then(suggestions => res.status(200).send(suggestions))
      .catch(error => res.status(400).send(error));
  },
};
