import React from 'react';
import OptionsBoxListItem from '../options-box-list-item/options-box-list-item.component';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid';
import './options-box-list.styles.scss';

function OptionsBoxList({ listItems, type }) {
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

OptionsBoxList.propTypes = {
	listItems: PropTypes.arrayOf(PropTypes.object),
	type: PropTypes.string
};

export default OptionsBoxList;
