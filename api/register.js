const Users = require('../models/users.js');
/**
 * Register api
 *
 * @param  {Object} req
 * @param  {Object} res
 *
 * @return {Object} res
 */
module.exports = (req, res) => {
	console.log("register");

	if (!req.body.email || !req.body.password) {
		return res.status(400).send({
			msg:"Either email or password is missing"
		})
	}

	let user = new Users({
		email: req.body.email,
		password: req.body.password
	});

	user.save()
		.then(_ => {
			res.status(202).send({
				msg:'ok'
			})
		})
		.catch(err => {
			res.status(400).send({
				err: err.toString()
			})
		})
};
