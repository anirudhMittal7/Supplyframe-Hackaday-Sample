const express = require('express');
const app=express();


app.get('/', (req,res) => {
	res.sendFile(__dirname + '/public/main.html');
});


//Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Hackaday Node Server running on port ${PORT}`))