const express = require('express');

const app = express();

app.get('/', (req, res) => {
	res.send({hi: 'WAzzzzuuupp'})
})


//dynamic port binding
const PORT = process.env.PORT || 5000

app.listen(PORT, function(){
	console.log("app running on port 5000")
});