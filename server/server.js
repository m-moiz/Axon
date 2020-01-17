const express = require('express');
const compression = require('compression');
const dotenv = require('dotenv');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const GithubStrategy = require('passport-github2');
const User = require('./models/user.model').User;
const cookieSession = require('cookie-session');
const cors = require('cors');
const app = express();
const routes = require('./routes/routes');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById({ id }, (err, user) => {
		done(null, user);
	});
});

app.use(
	cookieSession({
		maxAge: 24 * 60 * 60 * 1000,
		keys: [ process.env.COOKIE_SECRET ]
	})
);

app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));
app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', routes);
dotenv.config();

passport.use(
	new GithubStrategy(
		{
			callbackUrl: '/auth/github/redirect',
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET
		},
		(accessToken, refreshToken, profile, done) => {
			User.findById({ githubId: profile.id }, (err, user) => {
				if (user) {
					done(null, user);
				} else {
					new User({
						username: profile.displayName,
						githubId: profile.id
					})
						.save()
						.then(function isDone() {
							done(null, user);
						});
				}
			});
		}
	)
);

const mongodb = process.env.MongoDB_URL;
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));
db.on('error', () => console.error.bind(console, 'MongoDB connection error'));

app.listen(process.env.PORT || 4001, () => {
	console.log(`Listening to port ${process.env.PORT || 4001}`);
});
