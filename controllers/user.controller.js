const bcrypt = require('bcryptjs');
const redisClient = require('../redis');
const jwtToken = require('../helpers/jwtToken').jwtToken;
const winston = require('../log');
const User = require('../models/user.model').User;
const UserRepository = require('../repositories/user.repository');
const validateSignIn = require('../validators/validators').validateSignIn;
const validateSignUp = require('../validators/validators').validateSignUp;

const handleValidation = (res, validateObject, validateFn) => {
	const [ isInvalid, error ] = validateFn(validateObject);

	if (isInvalid) {
		return res.status(500).json({ error: error });
	}
};

const handleSignIn = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(500).json({ message: 'Error' });
	}

	handleValidation(res, req.body, validateSignIn);

	const user = await UserRepository.get(username);

	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	const passwordsMatch = await bcrypt.compare(password, user.password);

	if (passwordsMatch) {
		const token = jwtToken.createSession(user);
		return res.status(200).json({
			success: 'true',
			username: user.username,
			userId: user._id,
			roles: user.roles,
			token: token
		});
	} else {
		return res.status(500).json({ message: 'Failed ' });
	}
};

const userController = {
	async createUser(req, res) {
		const { username, email, password } = req.body;

		if (!username || !password) {
			return res.status(400).json({ message: 'Incorrect form submission' });
		}

		handleValidation(res, req.body, validateSignUp);

		let user = await UserRepository.get(username);
		if (user) return res.status(404).json({ message: 'User already exists' });
		if (!user) {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);
			if (!hash) throw err;

			try {
				user = await UserRepository.add(req.body, hash);
				const token = jwtToken.createSession(user);
				return res.status(200).json({
					success: 'true',
					username: user.username,
					userId: user._id,
					token: token
				});
			} catch (err) {
				console.log(err);
				winston.log('5', err);
				res.status(500).json({ success: false, message: "Couldn't create token" });
			}
		}
	},

	handleSignOut(req, res) {
		jwtToken.removeTokenFromDb(req.body.token, redisClient);
		return res.status(200).json({ message: 'success' });
	},

	//for handling sign in/up taking username, email etc
	getUser(req, res) {
		const { token } = req.headers;
		token ? jwtToken.checkTokenInDb(req, res, redisClient) : handleSignIn(req, res);
	},

	//only takes username
	async findUserWithUsername(req, res) {
		const { username } = req.body;
		const user = await User.findOne({ username: username });
		if (user) {
			return res.status(200).json({ message: 'User already exists' });
		}

		if (!user) {
			return res.status(200).json({ message: 'User not found' });
		}
	},

	async getUsers(req, res) {
		try {
			const users = await User.find({}, { _id: 0, username: 1 });
			//service?
			users = users.map((user) => ({ value: user.username, label: user.username.toUpperCase() }));
			return res.status(200).json({ doc: users });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ message: "Couldn't get users" });
		}
	},

	async updateUser(req, res) {
		try {
			await UserRepository.update(req.params);
			return res.status(200).json({ message: 'success' });
		} catch (err) {
			console.log(err);
			winston.log('5', err);
			return res.status(500).json({ message: 'Something went wrong' });
		}
	},

	async deleteUser(req, res) {
		try {
			await UserRepository.delete(req.params);
			return res.status(200).json({ message: 'Deleted user successfully' });
		} catch (err) {
			winston.log('5', err);
			return res.status(500).json({ message: 'Something went wrong' });
		}
	}
};

module.exports = userController;
