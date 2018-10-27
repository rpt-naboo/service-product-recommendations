const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 3000;
// Serve up the public folder since that's where our client bundle.js file will end up.
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname , '/../client/dist/index.html'), (err) => {
		if (err) {
			res.status(500).send(err);
		}
	})
});

app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});

// require('./routes')(app);
// app.get('*', (req, res) => res.status(200).send({
//   message: 'Welcome to the beginning of naboo.',
// }));

// if (process.env.NODE_ENV !== 'test') {
//   app.listen(port, () => {
//     console.log(`Exapmle app listening on port ${port}!`);
//   });
// }

// module.exports = app;