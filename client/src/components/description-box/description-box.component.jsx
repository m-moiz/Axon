import React from 'react';
import ToggleItem from '../toggle-item/toggle-item.component';
import draftToHtml from 'draftjs-to-html';
import './description-box.styles.scss';

function DescriptionBox({ isDescriptionVisible, toggleDescription, content }) {
	return (
		<React.Fragment>
			<ToggleItem isOpen={isDescriptionVisible} handleClick={toggleDescription} title="Description" />
			{isDescriptionVisible && content ? <div className="description-header" /> : ''}
			{isDescriptionVisible && content ? (
				<div className="description-box" dangerouslySetInnerHTML={{ __html: draftToHtml(content) }} />
			) : (
				''
			)}
		</React.Fragment>
	);
}

export default DescriptionBox;
