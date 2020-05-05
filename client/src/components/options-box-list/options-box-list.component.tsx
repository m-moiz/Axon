import React from 'react';
import OptionsBoxListItem from '../options-box-list-item/options-box-list-item.component';
import uuidv4 from 'uuid';
import './options-box-list.styles.scss';

interface IOptionsBoxList {
	listItems: string;
	type: string;
}

function OptionsBoxList({ listItems, type }: IOptionsBoxList) {
	return (
		<div className="optionsBoxList">
			<menu>
				{Array.isArray(listItems) && listItems.length > 0 ? (
					listItems.map((listItem) => (
						<li key={uuidv4()}>
							<OptionsBoxListItem type={type} item={listItem} />
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
