import React from 'react';
import SideBar from '../../components/sidebar/sidebar.component';
import SideBarTools from '../../components/sidebar-tools/sidebar-tools.component';
import SideBarSubCategory from '../../components/sidebar-subcategory/sidebar-subcategory.component';
import SideBarItemsList from '../../components/sidebar-items-list/sidebar-items-list.component';
import Tool from '../tool/tool.component';
import withOpen from '../with-open/with-open.component';
import { toggleProjectsSubcategory, toggleToolsSubcategory } from '../../redux/sidebar/sidebar.actions';
import { selectToggleProjectsSubcategory, selectToggleToolsSubcategory } from '../../redux/sidebar/sidebar.selectors';
import { selectProjects } from '../../redux/project/project.selectors';
import { connect } from 'react-redux';

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
	toggleTool
}) => (
	<SideBar title={title}>
		<SideBarSubCategory toggleSidebarSubcategory={toggleProjectsSubcategory} subcategoryName="projects">
			<SideBarItemsList isSidebarSubcategoryOpen={isProjectsSubcategoryOpen} items={projects} />
		</SideBarSubCategory>

		<SideBarSubCategory toggleSidebarSubcategory={toggleToolsSubcategory} subcategoryName="tools">
			<SideBarTools isSidebarSubcategoryOpen={isToolsSubcategoryOpen}>
				<Tool toggleTool={toggleTool} tooltipText={deleteToolTipText} action={toggleDelete}>
					<i className="fas fa-trash" />
				</Tool>
				<Tool tooltipText={editToolTipText} action={toggleEdit}>
					<i className="far fa-edit" />
				</Tool>
				<Tool tooltipText={addToolTipText} action={toggleCreate}>
					<i className="fas fa-plus" />
				</Tool>
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

export default withOpen(connect(mapStateToProps, mapDispatchToProps)(SharedSidebar));
