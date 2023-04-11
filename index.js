import express from 'express';

const port = 8000;
const app = express();

app.get('/hello', (req, res) => {
	res.send('Hello there');
});

app.listen(port, () => {
	console.log(`Server runs on http://localhost:${port}`);
});
