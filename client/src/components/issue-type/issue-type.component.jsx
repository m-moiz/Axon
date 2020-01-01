import React from 'react';
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';

const IssueType = ({ issueType, variant }) => (
	<div>
		<Badge variant={variant}>{issueType}</Badge>
	</div>
);

IssueType.propTypes = {
	issueType: PropTypes.node,
	variant: PropTypes.string
};

export default IssueType;
