import React from 'react';
import ToggleItem from '../toggle-item/toggle-item.component';
import './description-box.styles.scss';

function DescriptionBox({ content }) {
	return (
		<React.Fragment>
			<ToggleItem title="Description" />
			{content ? <div className="description-header" /> : ''}
			{content ? <div className="description-box" /> : ''}
		</React.Fragment>
	);
}

export default DescriptionBox;
