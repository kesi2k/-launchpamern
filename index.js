const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
//required by express to extract body info from form.
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Need to call mongoose so it can run and create our schema of Users
// Create the models before using them in passport or error will occur
require('./models/User');
const passportConfig = require('./services/passport')

mongoose.connect(keys.mongoURI);
const requireLogin = require('./middlewares/requireLogin');

const User = mongoose.model('users')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
	cookieSession({
		// age of session will be one month
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
	)

app.use(passport.initialize());
app.use(passport.session());

var token = 'No value';

// app.get('/', (req, res) => {
// 	res.send({hi: "Hi waaazzzuppp" + ' ' + token});
// })

app.get('/userinfo', (req, res) => {
	res.send('Dashboard here ' + req.user);
})

app.get('/auth/google', passport.authenticate('google',{
	scope: ['profile', 'email']
	})
)

app.get('/auth/google/callback', passport.authenticate('google'),
		(req, res) => {
			res.redirect('/dashboard')
		}
);

app.get('/api/current_user', (req, res) => {
	res.send(req.user);
})


app.get('/api/users', async (req, res) => {
	const users = await User.find();
	res.send(users);
})


app.get('/api/user/:id', (req, res) => {
	//console.log(req.params.id);
	const user = User.findOne({_id: req.params.id}, function(err, user){
		if(user){
			res.send(user);
		}
	})
})


app.post('/api/usersave', requireLogin, async (req, res) => {
	//Check that user is editing his profile
	//Then make post
	//name: String,
	//description: String,
	const postBody = req.body;
  	//console.log(postBody);
  	//console.log(postBody.name);

  	//console.log("user is", req.user);

	//const { name, description} = req.body

	User.findOne({_id: req.user.id}, function(err, user){
	if(user)
	{
		console.log(user);
		user.name = postBody.name;
		user.description= postBody.description;

		user.save();

		console.log(user);

		//Get a fresh user model after the save request
		//const user = await req.user.save()
		res.send(user);
		    //res.redirect('/dashboard');
	}
	else
	{
		const user = new User({
			name: postBody.name,
			description: postBody.description
		}).save()
		res.send(user);
	}

	})
})









app.get('/api/logout', (req, res) => {
	req.logout();
	res.redirect('/');
	
});


if(process.env.NODE_ENV === 'production')
{
	// Express will serve production assets
	// like main.js file or, main.css
	app.use(express.static('client/build'));

	// Express will serve index.html if a request comes in that is not matched with any of the routes above.
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})


}

//dynamic port binding
const PORT = process.env.PORT || 5000

app.listen(PORT, function(){
	console.log("app running on port 5000")
});