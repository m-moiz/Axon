const express = require('express');
const compression = require('compression');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const routes = require('./routes/routes');

app.use(morgan('dev'));
app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', routes);

/*
app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});
*/

dotenv.config();

const mongodb = process.env.MongoDB_URL;
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));
db.on('error', () => console.error.bind(console, 'MongoDB connection error'));

app.listen(process.env.PORT || 4001, () => {
	console.log(`Listening to port ${process.env.PORT || 4001}`);
});
