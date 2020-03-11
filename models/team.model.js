const mongoose = require('mongoose');
const ProjectSchema = require('./project.model').ProjectSchema;

// Important: Given the current schema design and implementation, it will take
// a team document to have ~~16 projects with each a 1000 issues to
// exceed the 16MB mongoDB document size limit. (best case scenario)

const TeamSchema = mongoose.Schema({
	_id: { type: String, required: true },
	name: { type: String, required: true },
	users: [ { type: String } ],
	projects: { type: [ ProjectSchema ], default: undefined }
});

module.exports = {
	Team: mongoose.model('Team', TeamSchema)
};
