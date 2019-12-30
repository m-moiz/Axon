const bcrypt = require('bcryptjs');
const logger = require('../log');
const Joi = require('@hapi/joi');
const jwtToken = require('../helpers/jwtToken');
const User = require('../models/user.model').User;

const handleSignIn = (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ message: 'Incorrect form submission' });
	}

	User.findOne({ username })
		.then((user) => {
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}

			bcrypt
				.compare(password, user.password)
				.then((isMatch) => {
					if (isMatch) {
						jwtToken.createSessions(user, res);
					} else {
						return res.status(404).json({ message: 'Password is wrong, Try again! ' });
					}
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => console.log(err));
};

const validateSignUp = (username, password, email, res) => {
	const schema = Joi.object({
		username: Joi.string().alphanum().min(3).max(20).required(),
		password: Joi.string()
			.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#(){}[\]])[A-Za-z\d@$!%*?&#(){}[\]]{10,}$/)
			.required(),
		email: Joi.string().email().required()
	});

	const { error } = schema.validate({ username: username, password: password, email: email });

	if (error) {
		logger.info(error);
		return res.status(404).json({ error: error });
	}
};

const userController = {
	createUser(req, res) {
		let user = new User();
		const { username, email, password } = req.body;

		if (!username || !password) {
			return res.status(400).json({ message: 'Incorrect form submission' });
		}

		validateSignUp(username, password, email, res);

		User.findOne({ username: username }, (err, user) => {
			if (user) {
				return res
					.status(400)
					.json({ message: `User ${username} already exists`, error: 'User already exists' });
			}
		});

		User.findOne({ email: email }, (err, user) => {
			if (user) {
				return res
					.status(400)
					.json({ message: `Email ${email} already exists`, error: 'Email is already being used' });
			}
		});

		user.username = username;
		user.email = email;
		user.password = password;

		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				if (err) throw err;
				user.password = hash;

				user
					.save()
					.then((user) => {
						jwtToken.createSessions(user, res);
					})
					.catch((err) => {
						console.log(err);
						res.status(404).json({ success: false, message: "Couldn't create token" });
					});
			});
		});
	},

	getUser(req, res) {
		const { token } = req.headers;
		token ? jwtToken.checkTokenInDb(req, res) : handleSignIn(req, res);
	},

	updateUser(req, res) {
		const { userId } = req.params;

		User.updateOne({ _id: userId }, (err, res) => {
			if (!err) return res.status(200).json({ message: 'success' });
			if (err) return res.status(404).json({ message: err });
		});
	},

	deleteUser(req, res) {
		const { userId } = req.params;

		User.deleteOne({ _id: userId }, (err) => {
			if (!err) return res.status(200).json({ message: 'Deleted user successfully' });
			if (err) return res.status(404).json({ message: err });
		});
	}
};

module.exports = userController;
