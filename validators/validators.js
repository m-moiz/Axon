const Joi = require('@hapi/joi');
const logger = require('../log');
const issueTypes = require('../types/types').issueTypes;
const statusTypes = require('../types/types').statusTypes;
const priorityTypes = require('../types/types').priorityTypes;

exports.validateComment = (object) => {
	const schema = Joi.object({
		commentText: Joi.string().required()
	});

	const { error } = schema.validate(object);

	if (error) {
		return [ true, error ];
	}

	return [ false, error ];
};

exports.validateSignUp = (object) => {
	const schema = Joi.object({
		username: Joi.string().alphanum().min(3).max(20).required(),
		password: Joi.string()
			.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#(){}[\]])[A-Za-z\d@$!%*?&#(){}[\]]{10,}$/)
			.required(),
		email: Joi.string().email().required()
	});

	const { error } = schema.validate(object);

	if (error) {
		logger.info(error);
		return [ true, error ];
	}

	return [ false, error ];
};

exports.validateSignIn = (object) => {
	const schema = Joi.object({
		username: Joi.string().max(30).min(3),
		password: Joi.string()
			.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#(){}[\]])[A-Za-z\d@$!%*?&#(){}[\]]{10,}$/)
			.required()
	});

	const { error } = schema.validate(object);

	if (error) {
		logger.info(error);
		return [ true, error ];
	}

	return [ false, error ];
};

exports.validateIssue = (object) => {
	const schema = Joi.object({
		createdBy: Joi.string().allow(''),
		issueType: Joi.string().valid(issueTypes).required(),
		reporter: Joi.string().alphanum(),
		status: Joi.string().valid(statusTypes).required(),
		description: Joi.string(),
		summary: Joi.string().required(),
		priorityType: Joi.string().valid(priorityTypes).required(),
		dueDate: Joi.string(),
		environment: Joi.string(),
		version: Joi.string().regex(/^[\d\.]+$/)
	});

	const { error } = schema.validate(object);

	if (error) {
		logger.info(error);
		return [ true, error ];
	}
	return [ false, error ];
};
