import React from 'react';
import Tab from '../tab/tab.component';
import './tab-bar.styles.scss';

interface Items {
	_id: string;
	name: string;
}

interface ItemsArray {
	[index: number]: Items;
}

interface ITabBar {
	items: ItemsArray;
}

function TabBar({ items }: ITabBar) {
	return (
		<div className="tab-bar">
			{Array.isArray(items) &&
				items.length > 0 &&
				items.map((item) => <Tab key={item._id} id={item._id} title={item.name} />)}
		</div>
	);
}

export default TabBar;
