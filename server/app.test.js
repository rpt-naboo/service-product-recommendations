const request = require('supertest');
const chai = require('chai');
const app = require('./app');

const expect = chai.expect;

describe('Suggestion GET API Test', () => {
  describe('#GET / api/suggestions/products/:id', () => {
    it('should get all suggestions', (done) => {
      request(app).get('/api/suggestions/products/1')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.length).to.equal(5);
          done();
        });
    });
  });
});
