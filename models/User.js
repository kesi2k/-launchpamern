const mongoose = require('mongoose');
// const { Schema } = mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
	googleId: String,
	name: String,
	description: String,
	email: String,
	password: String,
	photoLocation: String

});


// Mongoose creates this model in mongoDB database
mongoose.model('users', userSchema);