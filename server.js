const express = require('express');
const compression = require('compression');
const path = require('path');
const dotenv = require('dotenv');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const routes = require('./routes/routes');

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api', routes);
dotenv.config();

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client', 'build')));

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	});
}

const mongodb = process.env.MongoDB_URL;
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));
db.on('error', () => console.error.bind(console, 'MongoDB connection error'));

app.listen(process.env.PORT || 4001, () => {
	console.log(`Listening to port ${process.env.PORT || 4001}`);
});
