const bcrypt = require('bcryptjs');
const jwtToken = require('../helpers/jwtToken').jwtToken;
const User = require('../models/user.model').User;
const Team = require('../models/team.model').Team;
const validateSignIn = require('../validators/validators').validateSignIn;
const validateSignUp = require('../validators/validators').validateSignUp;

const handleValidation = (res, validateObject, validateFn) => {
	const [ isInvalid, error ] = validateFn(validateObject);

	if (isInvalid) {
		return res.status(500).json({ error: error });
	}
};

const handleSignIn = (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ message: 'Incorrect form submission' });
	}

	const validateObject = {
		username: username,
		password: password
	};

	handleValidation(res, validateObject, validateSignIn);

	User.findOne({ username })
		.then((user) => {
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}

			bcrypt
				.compare(password, user.password)
				.then((isMatch) => {
					if (isMatch) {
						jwtToken.createSession(user, res);
					} else {
						return res.status(404).json({ message: 'Password is wrong, Try again! ' });
					}
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => console.log(err));
};

const userController = {
	createUser(req, res) {
		let user = new User();
		const { username, email, password } = req.body;

		if (!username || !password) {
			return res.status(400).json({ message: 'Incorrect form submission' });
		}

		const validateObject = {
			email: email,
			username: username,
			password: password
		};

		handleValidation(res, validateObject, validateSignUp);

		User.findOne({ username }).then((doc) => {
			if (doc) return res.status(404).json({ message: 'User already exists' });
			if (!doc) {
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
								jwtToken.createSession(user, res);
							})
							.catch((err) => {
								console.log(err);
								res.status(404).json({ success: false, message: "Couldn't create token" });
							});
					});
				});
			}
		});
	},

	handleSignOut(req, res) {
		jwtToken.removeTokenFromDb(req.body.token);
		return res.status(200).json({ message: 'success' });
	},

	//for handling sign in/up taking username, email etc
	getUser(req, res) {
		const { token } = req.headers;
		token ? jwtToken.checkTokenInDb(req, res) : handleSignIn(req, res);
	},

	//only takes username
	findUserWithUsername(req, res) {
		const { username } = req.body;
		User.find({ username: username }, (err, doc) => {
			if (doc.length > 0) {
				return res.status(200).json({ message: 'User already exists' });
			}

			if (doc.length === 0) {
				return res.status(200).json({ message: 'User not found' });
			}
		});
	},

	getUsers(req, res) {
		User.find({}, { _id: 0, username: 1 }, (err, doc) => {
			if (err) return res.status(500).json({ message: "Couldn't get users" });
			doc = doc.map((item) => ({ value: item.username, label: item.username.toUpperCase() }));
			return res.status(200).json({ doc: doc });
		});
	},

	updateUser(req, res) {
		const { userId } = req.params;

		User.updateOne({ _id: userId }, (err, res) => {
			if (!err) return res.status(200).json({ message: 'success' });
			if (err) return res.status(404).json({ message: err });
		});
	},

	addTeamToUser(req, res) {
		const { id } = req.params;
		let { name } = req.body;
		name = name.value;

		Team.find({ name: name }, (err, team) => {
			if (err) return res.status(500).json({ message: 'No such team exists' });
			console.log(team);

			User.findOneAndUpdate(
				{ _id: id },
				{
					$push: {
						teams: {
							teamId: team[0]._id,
							name: team[0].name
						}
					}
				},
				{ new: true },
				(err, user) => {
					if (err) return res.status(500).json({ message: "Couldn't update user", error: err });
					console.log(user);

					return res.status(200).json({
						message: 'Successfully updated user',
						_teamId: user.teams[0].teamId,
						teams: user.teams
					});
				}
			);
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
