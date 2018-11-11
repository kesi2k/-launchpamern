const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const keys = require('../config/keys');

// Import mongoose
const mongoose = require('mongoose');

// get access to the users model
const User = mongoose.model('users');

// Serialize users in order to set cookies
// user variable below is the user that was pulled out the DB
passport.serializeUser((user, done) => {
	// null would be for handling/showing any errors
	// user.id here refers to the id of the collection in MongoDB
	// No matter the authentication this ID will always be unique
	done(null, user.id)
});

// Find user based on cookie
passport.deserializeUser((userId, done) => {
	User.findById(userId).then(user => {
		done(null, user)
	})

})


passport.use(new GoogleStrategy(
{
	clientID: keys.googleClientID,
	clientSecret: keys.googleClientSecret,
	callbackURL: '/auth/google/callback',
	// Heroku runs through proxies for load balancing etc. This setting tells Google OAuth to trust its https:// and not revert to http:
	proxy: true
}, (accessToken, refreshToken, profile, done ) => {
	//console.log('Access token', accessToken);
	//console.log('Refresh token', refreshToken);
	//console.log('Profile: ', profile);
	//console.log('Profile: ', profile.photos[0]['value']);

	User.findOne({ googleId: profile.id})
		.then((existingUser) => {
			if(existingUser)
			{
				// Already have profile id. First argument for errors.
				done(null, existingUser);
			}
			else
			{
				//Make new record
				new User ({
					googleId: profile.id,
					name: profile.displayName
				}).save()
				//User below is one returned from the DB
				.then((user) => { done(null, user)});
			}
		})
})
)

