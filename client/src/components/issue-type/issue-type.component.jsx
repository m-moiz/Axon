import React from 'react';
import Badge from 'react-bootstrap/Badge';

const IssueType = ({ issueType, variant }) => (
	<div>
		<Badge variant={variant}>{issueType}</Badge>
	</div>
);

export default IssueType;
