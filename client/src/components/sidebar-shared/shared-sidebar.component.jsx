import React from 'react';
import PropTypes from 'prop-types';
import SideBar from '../../components/sidebar/sidebar.component';
import SideBarTools from '../../components/sidebar-tools/sidebar-tools.component';
import SideBarSubCategory from '../../components/sidebar-subcategory/sidebar-subcategory.component';
import SideBarItemsList from '../../components/sidebar-items-list/sidebar-items-list.component';
import Tool from '../tool/tool.component';
import withOpen from '../with-open/with-open.component';
import { toggleProjectsSubcategory, toggleToolsSubcategory } from '../../store/sidebar/sidebar.actions';
import { selectToggleProjectsSubcategory, selectToggleToolsSubcategory } from '../../store/sidebar/sidebar.selectors';
import { selectProjects } from '../../store/project/project.selectors';
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
	goBackTo,
	history
}) => (
	<SideBar title={title}>
		{showGoBack ? (
			<div
				onClick={() => {
					history.push(goBackTo);
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
				<Tool tooltipText="Settings" action={() => history.push('/user/settings')}>
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

SharedSidebar.propTypes = {
	showGoBack: PropTypes.bool,
	toggleProjectsSubcategory: PropTypes.func.isRequired,
	isProjectsSubcategoryOpen: PropTypes.bool.isRequired,
	projects: PropTypes.arrayOf(PropTypes.object).isRequired,
	toggleToolsSubcategory: PropTypes.func,
	isToolsSubcategoryOpen: PropTypes.bool,
	title: PropTypes.string.isRequired,
	goBackTo: PropTypes.string,
	toggleCreate: PropTypes.func,
	toggleDelete: PropTypes.func,
	toggleEdit: PropTypes.func,
	showEditTool: PropTypes.bool,
	showDeleteTool: PropTypes.bool,
	showAddTool: PropTypes.bool,
	deleteToolTipText: PropTypes.string,
	editToolTipText: PropTypes.string,
	addToolTipText: PropTypes.string,
	isDeleting: PropTypes.bool,
	isEditing: PropTypes.bool
};

export default withRouter(withOpen(connect(mapStateToProps, mapDispatchToProps)(SharedSidebar)));
