import React from 'react';
import PropTypes from 'prop-types';
import './label.styles.scss';

function Label({ labelType, marginLeft, position, bottom, fontSize, boxShadow, inTableRow, inBoardTask }) {
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
	} else if (labelType === 'High') {
		content = 'High';
		className += ' high';
	} else if (labelType === 'Medium') {
		content = 'Medium';
		className += ' medium';
	} else if (labelType === 'Low') {
		content = 'Low';
		className += ' low';
	} else if (labelType === 'lowest') {
		content = 'Lowest';
		className += ' lowest';
	}

	if (inTableRow) {
		className += ' row';
	} else if (inBoardTask) {
		className += ' board-task';
	}

	return (
		<React.Fragment>
			{labelType ? (
				<div
					className={className}
					style={{
						marginLeft: marginLeft,
						position: position,
						bottom: bottom,
						fontSize: fontSize,
						boxShadow: boxShadow
					}}
				>
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
	marginLeft: PropTypes.string,
	position: PropTypes.string,
	bottom: PropTypes.string,
	fontSize: PropTypes.string,
	boxShadow: PropTypes.string
};

export default Label;
