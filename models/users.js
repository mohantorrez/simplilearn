const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

const users = new Schema({
	id: ObjectId,
	name: String,
	email: String,
	password: String
});

users.pre("save",function(next, done) {
	var self = this;
	mongoose.models["users"].findOne({email : self.email},function(err, results) {
		if(err) {
			next(err);
		} else if(results) { //there was a result found, so the email address exists
			next("email must be unique");

		}
		next();

	});
});

module.exports = mongoose.model('users', users);