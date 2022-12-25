const mongoose = require('mongoose');
const { User } = require('../models/user.model');
const { Project } = require('../models/project.model');
const { Issue } = require('../models/issue.model');

const IssueRepository = {
  async add(ids, fields, id) {
    const { projectId } = ids;
    // Create a new issue document
    const issue = new Issue({
      _id: id,
      createdBy: fields.createdBy,
      creator: fields.creator,
      summary: fields.summary,
      issueType: fields.issueType,
      assignee: fields.assignee,
      version: fields.version,
      status: fields.status,
      reporter: fields.reporter,
      description: fields.description,
      priorityType: fields.priorityType,
      dueDate: fields.dueDate,
      environment: fields.environment
    });

    // Save the issue
    await issue.save();

    // Update the users document to add the assigned issue to a user
    await User.findOneAndUpdate(
      { _id: fields.assignee },
      { $push: { assigned: issue._id } }
    );


    // Update the project document to add the new issue
    await Project.findOneAndUpdate(
      { _id: projectId },
      { $push: { issues: issue._id } }
    );
  },

  async getAll(ids) {
    const {projectId } = ids;
    return await Project.findOne({ _id: projectId })
      .populate('issues');
  },

  async get(ids) {
    const { issueId } = ids;
    const issue = await Issue.findById(issueId)
      .populate('users')
      .populate('reporter', 'username -_id')
      .populate('assignee', 'username -_id')
      .lean()
      .exec();

    const reporterUsername = issue.reporter.username;
    const assigneeUsername = issue.assignee.username;
    
    return {
      ...issue,
      reporter: reporterUsername,
      assignee: assigneeUsername,
    };
  },

  async delete(ids) {
    const { projectId, issueId } = ids;

    // Delete the issue document
    const issue = await Issue.findByIdAndDelete(issueId);

    // Remove the issue from the project document
    await Project.findOneAndUpdate(
      { _id: projectId },
      { $pull: { issues: issueId } }
    );

    //Remove the issue from the user document
    await User.findOneAndUpdate(
      { _id: issue.assignee },
      { $pull: { assigned: issueId } }
    );

    // All the referenced comments also need to be deleted
    await comment.deleteMany({ discussion_id: issueId });
  },

  async update(ids, updates) {
    const { issueId } = ids;

    // Update the issue document
    await Issue.findByIdAndUpdate(issueId, {
      issueType: updates.issueType,
      summary: updates.summary,
      reporter: updates.reporter,
      assignee: updates.assignee,
      description: updates.description,
      priorityType: updates.priorityType,
      dueDate: updates.dueDate,
      environment: updates.environment,
      status: updates.status,
      version: updates.version
    });
  },

  async updateStatus(ids, column, state) {
    const { issueId } = ids;
    await Issue.findByIdAndUpdate(issueId, {
      boardColumn: column,
      status: state
    });
  }
};

module.exports = IssueRepository;
