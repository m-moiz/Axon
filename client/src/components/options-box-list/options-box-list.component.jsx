import React from 'react';
import OptionsBoxListItem from '../options-box-list-item/options-box-list-item.component';
import './options-box-list.styles.scss';

function OptionsBoxList({ listItems }) {
	return (
		<div className="optionsBoxList">
			<menu>
				{Array.isArray(listItems) && listItems.length > 0 ? (
					listItems.map((listItem) => (
						<li>
							<OptionsBoxListItem item={listItem} />
						</li>
					))
				) : (
					''
				)}
			</menu>
		</div>
	);
}

export default OptionsBoxList;
