import React from 'react';
import * as CSS from 'csstype';
import './label.styles.scss';

interface ILabel {
	labelType: 'Bug' | 'Improvement' | 'Feature' | 'Epic' | 'Task' | 'Review';
	marginLeft?: string;
	position?: CSS.PositionProperty;
	bottom?: string;
	fontSize?: string;
	boxShadow?: string;
	inTableRow?: boolean;
	inBoardTask?: boolean;
}

function Label({ labelType, marginLeft, position, bottom, fontSize, boxShadow, inTableRow, inBoardTask }: ILabel) {
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

export default Label;
