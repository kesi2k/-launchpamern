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

app.get('/', (req, res) => {
	res.send({hi: "Hi waaazzzuppp" + ' ' + token});
})

app.get('/dashboard', (req, res) => {
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

app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
	
});

//dynamic port binding
const PORT = process.env.PORT || 5000

app.listen(PORT, function(){
	console.log("app running on port 5000")
});