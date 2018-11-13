const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

const mongoose = require('mongoose');

// Need to call mongoose so it can run and create our schema of Users
// Create the models before using them in passport or error will occur
require('./models/User');
const passportConfig = require('./services/passport')

mongoose.connect(keys.mongoURI);
const requireLogin = require('./middlewares/requireLogin');

const User = mongoose.model('users')

const app = express();

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

// app.get('/dashboard', (req, res) => {
// 	res.send('Dashboard here ' + req.user);
// })

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

app.get('/api/logout', (req, res) => {
	req.logout();
	res.redirect('/');
	
});

app.get('/api/users', async (req, res) => {
	const users = await User.find();
	res.send(users);
})


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