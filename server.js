const express = require('express');
const axios = require('axios');
const app=express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
	res.sendFile(__dirname + '/public/main.html');
});


app.get('/projects', (req,res) => {
	

	const KEY='d4XbAIMISelhdFxS';
	const url = 'https://api.hackaday.io/v1/projects';
	const {page} = req.query;
	console.log(`fetching projects for page ${page}`);
	axios
	.get(url,{ params: {api_key: KEY, page: page}})
	.then((response) =>{
		res.status(200).json(response.data);

	})
	.catch((error) => {
		console.log(error);
	})

});


//Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Hackaday Node Server running on port ${PORT}`))