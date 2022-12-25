const mongoose = require('mongoose');
const ProjectSchema = require('./project.model').ProjectSchema;

// Important: Given the current schema design and implementation, it will take
// a team document to have ~~16 projects with each a 1000 issues to
// exceed the 16MB mongoDB document size limit. (best case scenario)

const TeamSchema = mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, required: true },
	name: { type: String, required: true },
	users: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
	manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	members: { type: [ mongoose.Schema.Types.ObjectId ], default: undefined },
	projects: { type: [ mongoose.Schema.Types.ObjectId ], ref: 'Project', default: undefined }
 });

module.exports = {
	Team: mongoose.model('Team', TeamSchema)
};
