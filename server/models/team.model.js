const mongoose = require('mongoose');
const ProjectSchema = require('./project.model').ProjectSchema;

const TeamSchema = mongoose.Schema({
	_id: { type: String, required: true },
	name: { type: String, required: true },
	users: [ { type: String } ],
	projects: { type: [ ProjectSchema ], default: undefined }
});

module.exports = {
	Team: mongoose.model('Team', TeamSchema)
};
