import React from 'react';
import ToggleItem from '../toggle-item/toggle-item.component';
import draftToHtml from 'draftjs-to-html';
import { connect } from 'react-redux';
import './description-box.styles.scss';

function DescriptionBox({ isDescriptionVisible, toggleDescription, content, isDarkTheme }) {
	let hasContent = content.blocks[0].text;
	return (
		<React.Fragment>
			<ToggleItem isOpen={isDescriptionVisible} handleClick={toggleDescription} title="Description" />
			{isDescriptionVisible && hasContent ? <div className="description-header" /> : ''}
			{isDescriptionVisible && hasContent ? (
				<div
					className={isDarkTheme ? 'description-box dark' : 'description-box light'}
					dangerouslySetInnerHTML={{ __html: draftToHtml(content) }}
				/>
			) : (
				''
			)}
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		isDarkTheme: state.user.isDarkTheme
	};
};

export default connect(mapStateToProps)(DescriptionBox);
