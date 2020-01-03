import React from 'react';
import PropTypes from 'prop-types';
import SideBarItem from '../sidebar-item/sidebar-item.component';
import { connect } from 'react-redux';
import { addSidebarItemVisibiliy } from '../../redux/sidebar/sidebar.actions';
import { setProjectId } from '../../redux/project/project.actions';
import { withRouter } from 'react-router-dom';
import './sidebar-items-list.styles.scss';

const SideBarItemsList = ({ items, isSidebarSubcategoryOpen, addSidebarItemVisibility, setProjectId, history }) => (
	<div className={isSidebarSubcategoryOpen ? 'sidebar-items-list' : 'sidebar-items-list closed'}>
		{Array.isArray(items) &&
			items.map((item) => {
				addSidebarItemVisibility(item.name);
				return (
					<SideBarItem key={item._id} item={item.name} show>
						<div
							className="sidebar-item"
							onClick={() => {
								setProjectId(item.name);
								history.push('/user/issues');
							}}
						>
							<i className="fas fa-caret-right" />
							<li>Issues</li>
						</div>

						<div
							className="sidebar-item"
							onClick={() => {
								setProjectId(item.name);
								history.push('/kanban');
							}}
						>
							<i className="fas fa-caret-right" />
							<li>Board</li>
						</div>

						{/* TODO: Implement Backlog Page
						<div
							className="sidebar-item"
							onClick={() => {
								setProjectId(item.name);
								history.push('/backlog');
							}}
						>
							<i className="fas fa-caret-right" />
							<li>Backlog</li>
						</div>

						*/}
					</SideBarItem>
				);
			})}
	</div>
);

const mapDispatchToProps = (dispatch) => {
	return {
		addSidebarItemVisibility: (itemName) => dispatch(addSidebarItemVisibiliy(itemName)),
		setProjectId: (projectName) => dispatch(setProjectId(projectName))
	};
};

SideBarItem.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object),
	isSidebarSubcategoryOpen: PropTypes.bool,
	addSidebarItemVisibility: PropTypes.func,
	setProjectId: PropTypes.func
};

export default withRouter(connect(null, mapDispatchToProps)(SideBarItemsList));
