import React from 'react';
import PropTypes from 'prop-types';
import './item-list.styles.scss';
import Project from '../project/project.component';

const ItemList = ({ items, itemName }) => (
	<div className="item-list">
		<div className="item-list-container">
			{Array.isArray(items) && items.length === 0 ? (
				<div>You don't have any {itemName}. Create one by clicking the add button</div>
			) : (
				items.map((item) => (
					<Project key={item._id} projectId={item._id} projectDesc={item.description}>
						{item.name}
					</Project>
				))
			)}
		</div>
	</div>
);

ItemList.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object),
	itemName: PropTypes.string
};

export default ItemList;
