const Users = require('../models/users.js');

/**
 * Login api
 *
 * @param  {Object} req
 * @param  {Object} res
 *
 * @return {Object} res
 */
module.exports = (req, res) => {
	console.log("login");

	console.log(req.app.locals.db);

	if (!req.body.email || !req.body.password) {
		return res.status(400).send({
			msg:"Either email or password is missing"
		})
	}

	Users.findOne({'email':req.body.email, 'password':req.body.password}).exec()
		.then(data => {
			console.log(data);
			if (!data) {
				res.status(400).send({
					err: "Invalid username or password"
				});
			}
			else {
				res.status(200).send()
			}
		})
		.catch(err => {
			console.log(err);
			res.status(400).send({
				err: "Invalid username or password"
			});
		})
}
