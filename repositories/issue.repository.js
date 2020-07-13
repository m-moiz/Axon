const Issue = require('../models/issue.model').Issue;
const Team = require('../models/team.model').Team;
const comment = require('../models/comment.model').Comment;
const mongoose = require('mongoose');

const IssueRepository = {
	async add(ids, fields, id) {
		const { teamId, projectId } = ids;
		const issue = new Issue();

		issue._id = id;
		issue.createdBy = fields.createdBy;
		issue.creator = fields.creator;
		issue.summary = fields.summary;
		issue.issueType = fields.issueType;
		issue.assignee = fields.assignee;
		issue.version = fields.version;
		issue.status = fields.status;
		issue.reporter = fields.reporter;
		issue.description = fields.description;
		issue.priorityType = fields.priorityType;
		issue.dueDate = fields.dueDate;
		issue.environment = fields.environment;

		await Team.findOneAndUpdate(
			{ _id: teamId, 'projects._id': projectId },
			{
				$push: {
					'projects.$.issues': issue
				}
			}
		);
	},

	async getAll(ids) {
		const { teamId, projectId } = ids;
		return await Team.findOne({ _id: teamId, 'projects._id': projectId }, { 'projects.$.issues': 1 });
	},

	async get(ids) {
		const { teamId, projectId, issueId } = ids;
		return await Team.findOne({ _id: teamId, 'projects._id': projectId }, { 'projects.$.issues': issueId });
	},

	async delete(ids) {
		const { teamId, projectId, issueId } = ids;

		await Team.findOneAndUpdate(
			{ _id: teamId, 'projects._id': projectId },
			{
				$pull: {
					'projects.$.issues': { _id: issueId }
				}
			},
			{ new: true }
		);

		//All the referenced comments also need to be deleted
		await comment.deleteMany({ discussion_id: issueId });
	},

	async update(ids, updates) {
		const { teamId, projectId, issueId } = ids;

		await Team.findOneAndUpdate(
			{ _id: teamId },
			{
				$set: {
					'projects.$[i].issues.$[j].issueType': updates.issueType,
					'projects.$[i].issues.$[j].summary': updates.summary,
					'projects.$[i].issues.$[j].reporter': updates.reporter,
					'projects.$[i].issues.$[j].assignee': updates.assignee,
					'projects.$[i].issues.$[j].description': updates.description,
					'projects.$[i].issues.$[j].priorityType': updates.priorityType,
					'projects.$[i].issues.$[j].dueDate': updates.dueDate,
					'projects.$[i].issues.$[j].environment': updates.environment,
					'projects.$[i].issues.$[j].status': updates.status,
					'projects.$[i].issues.$[j].version': updates.version
				}
			},
			{
				arrayFilters: [ { 'i._id': projectId }, { 'j._id': issueId } ]
			}
		);
	},

	async updateStatus(ids, column, state) {
		const { teamId, projectId, issueId } = ids;
		await Team.findOneAndUpdate(
			{ _id: teamId },
			{
				$set: {
					'projects.$[i].issues.$[j].boardColumn': column,
					'projects.$[i].issues.$[j].status': state
				}
			},
			{
				arrayFilters: [ { 'i._id': projectId }, { 'j._id': issueId } ]
			}
		);
	}
};

module.exports = IssueRepository;
