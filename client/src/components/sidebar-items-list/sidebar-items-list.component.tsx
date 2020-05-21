import React from 'react';
import { History } from 'history';
import SideBarItem from '../sidebar-item/sidebar-item.component';
import { connect } from 'react-redux';
import { addSidebarItemVisibiliy } from '../../store/sidebar/sidebar.actions';
import { setProjectId } from '../../store/project/project.actions';
import { withRouter } from 'react-router-dom';
import './sidebar-items-list.styles.scss';

interface ISideBarItemsList {
	items: string;
	isSidebarSubcategoryOpen: boolean;
	addSidebarItemVisibility: (itemName: string) => void;
	setProjectId: (id: string) => void;
	history: History;
	isDarkTheme: boolean;
}

const SideBarItemsList = ({
	items,
	isSidebarSubcategoryOpen,
	addSidebarItemVisibility,
	setProjectId,
	history,
	isDarkTheme
}: ISideBarItemsList) => (
	<div className={isSidebarSubcategoryOpen ? 'sidebar-items-list' : 'sidebar-items-list closed'}>
		{Array.isArray(items) &&
			items.map((item) => {
				addSidebarItemVisibility(item.name);
				return (
					<SideBarItem key={item._id} item={item.name} show>
						<ul
							className={isDarkTheme ? 'sidebar-item dark' : 'sidebar-item light'}
							onClick={() => {
								setProjectId(item._id);
								history.push('/user/issues');
							}}
						>
							<i className="fas fa-caret-right" />
							<li>Backlog</li>
						</ul>

						<ul
							className={isDarkTheme ? 'sidebar-item dark' : 'sidebar-item light'}
							onClick={() => {
								setProjectId(item._id);
								history.push('/kanban');
							}}
						>
							<i className="fas fa-caret-right" />
							<li>Board</li>
						</ul>
					</SideBarItem>
				);
			})}
	</div>
);

const mapStateToProps = (state) => {
	return {
		isDarkTheme: state.user.isDarkTheme
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addSidebarItemVisibility: (itemName) => dispatch(addSidebarItemVisibiliy(itemName)),
		setProjectId: (projectName) => dispatch(setProjectId(projectName))
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideBarItemsList));
