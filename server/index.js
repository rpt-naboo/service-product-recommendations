const express = require('express');
const app = express();
const port = 3007;

app.get('/', (req, res) => {
	res.send('Hello world!');
});


app.listen(port, () => {
	console.log(`Exapmle app listening on port ${port}!`);
})