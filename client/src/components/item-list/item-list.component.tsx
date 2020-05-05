import React from 'react';
import './item-list.styles.scss';
import Project from '../project/project.component';
import { connect } from 'react-redux';

interface ProjectArray {
	map(arg0: (item: Project) => JSX.Element): React.ReactNode;
	[index: number]: Project;
}

interface IItemList {
	items: ProjectArray;
	itemName: string;
	isDarkTheme?: Boolean;
}

interface Project {
	_id: string;
	name: string;
	description: string;
}

const ItemList = ({ items, itemName, isDarkTheme }: IItemList) => (
	<div className={isDarkTheme ? 'item-list dark' : 'item-list light'}>
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

const mapStateToProps = (state) => {
	return {
		isDarkTheme: state.user.isDarkTheme
	};
};

export default connect(mapStateToProps)(ItemList);
