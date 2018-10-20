const request = require('supertest');
const app = require('./app.js');

describe('Gets api/suggestProducts/id', () => {
	it('should return suggests products', async () => {
		const res = await request(app).get('/api/suggestProducts/5bc966caa6944b44e5edf886');
		console.log(res.body.length)
		expect((res.body.length)).toBe(9);
	});
});
