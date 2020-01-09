import React, { ReactEventHandler, ReactNodeArray } from 'react';
import SideBar from '../sidebar/sidebar.component';
import SideBarTools from '../sidebar-tools/sidebar-tools.component';
import SideBarSubCategory from '../sidebar-subcategory/sidebar-subcategory.component';
import SideBarItemsList from '../sidebar-items-list/sidebar-items-list.component';
import Tool from '../tool/tool.component';
import withOpen from '../with-open/with-open.component';
import { toggleProjectsSubcategory, toggleToolsSubcategory } from '../../redux/sidebar/sidebar.actions';
import { selectToggleProjectsSubcategory, selectToggleToolsSubcategory } from '../../redux/sidebar/sidebar.selectors';
import { selectProjects } from '../../redux/project/project.selectors';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './shared-sidebar.styles.scss';

const SharedSidebar = ({
	toggleProjectsSubcategory,
	isProjectsSubcategoryOpen,
	projects,
	toggleToolsSubcategory,
	isToolsSubcategoryOpen,
	title,
	toggleCreate,
	toggleDelete,
	toggleEdit,
	deleteToolTipText,
	editToolTipText,
	addToolTipText,
	showEditTool,
	showDeleteTool,
	showAddTool,
	isDeleting,
	isEditing,
	showGoBack,
	history
}: SharedSidebar) => (
	<SideBar title={title}>
		{showGoBack ? (
			<div
				onClick={() => {
					history.goBack();
				}}
				className="sidebar__go-back"
			>
				<p>Go back</p>
				<i className="fas fa-angle-left" />
			</div>
		) : (
			''
		)}
		<SideBarSubCategory toggleSidebarSubcategory={toggleProjectsSubcategory} subcategoryName="projects">
			<SideBarItemsList isSidebarSubcategoryOpen={isProjectsSubcategoryOpen} items={projects} />
		</SideBarSubCategory>

		<SideBarSubCategory toggleSidebarSubcategory={toggleToolsSubcategory} subcategoryName="tools">
			<SideBarTools isSidebarSubcategoryOpen={isToolsSubcategoryOpen}>
				{showDeleteTool ? (
					<Tool isToolOpen={isDeleting} tooltipText={deleteToolTipText} action={toggleDelete}>
						<i className="fas fa-trash" />
					</Tool>
				) : (
					''
				)}
				{showEditTool ? (
					<Tool isToolOpen={isEditing} tooltipText={editToolTipText} action={toggleEdit}>
						<i className="far fa-edit" />
					</Tool>
				) : (
					''
				)}
				{showAddTool ? (
					<Tool tooltipText={addToolTipText} action={toggleCreate}>
						<i className="fas fa-plus" />
					</Tool>
				) : (
					''
				)}
				<Tool tooltipText="Settings">
					<i className="fas fa-cog" />
				</Tool>
			</SideBarTools>
		</SideBarSubCategory>
	</SideBar>
);

const mapStateToProps = (state) => {
	return {
		isProjectsSubcategoryOpen: selectToggleProjectsSubcategory(state),
		isToolsSubcategoryOpen: selectToggleToolsSubcategory(state),
		projects: selectProjects(state)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleProjectsSubcategory: () => dispatch(toggleProjectsSubcategory()),
		toggleToolsSubcategory: () => dispatch(toggleToolsSubcategory())
	};
};

type SharedSidebar = {
	showGoBack: boolean;
	toggleProjectsSubcategory: ReactEventHandler;
	isProjectsSubcategoryOpen: boolean;
	projects: ReactNodeArray;
	toggleToolsSubcategory: ReactEventHandler;
	isToolsSubcategoryOpen: boolean;
	title: string;
	toggleCreate: ReactEventHandler;
	toggleDelete: ReactEventHandler;
	toggleEdit: ReactEventHandler;
	showEditTool: boolean;
	showDeleteTool: boolean;
	showAddTool: boolean;
	deleteToolTipText: string;
	editToolTipText: string;
	addToolTipText: string;
	isDeleting: boolean;
	isEditing: boolean;
	history: History;
};

export default withRouter(withOpen(connect(mapStateToProps, mapDispatchToProps)(SharedSidebar)));
