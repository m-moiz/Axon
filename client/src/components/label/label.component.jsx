import React from 'react';
import PropTypes from 'prop-types';
import './label.styles.scss';

function Label({ labelType, marginLeft }) {
	let content = '';
	let className = 'label';
	if (labelType === 'Bug') {
		content = 'Bug';
		className += ' bug';
	} else if (labelType === 'Improvement') {
		content = 'Improvement';
		className += ' improvement';
	} else if (labelType === 'Feature') {
		content = 'New Feature';
		className += ' feature';
	} else if (labelType === 'Epic') {
		content = 'Epic';
		className += ' epic';
	} else if (labelType === 'Task') {
		content = 'Task';
		className += ' task';
	} else if (labelType === 'Review') {
		content = 'Review';
		className += ' review';
	}

	return (
		<React.Fragment>
			{labelType ? (
				<div className={className} style={{ marginLeft: marginLeft }}>
					<div>{content}</div>
				</div>
			) : (
				''
			)}
		</React.Fragment>
	);
}

Label.propTypes = {
	labelType: PropTypes.string,
	marginLeft: PropTypes.string
};

export default Label;
