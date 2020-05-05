import React from 'react';
import SideBar from '../sidebar/sidebar.component';
import SideBarTools from '../sidebar-tools/sidebar-tools.component';
import SideBarSubCategory from '../sidebar-subcategory/sidebar-subcategory.component';
import SideBarItemsList from '../sidebar-items-list/sidebar-items-list.component';
import Tool from '../tool/tool.component';
import withOpen from '../with-open/with-open.component';
import { toggleProjectsSubcategory, toggleToolsSubcategory } from '../../store/sidebar/sidebar.actions';
import { selectToggleProjectsSubcategory, selectToggleToolsSubcategory } from '../../store/sidebar/sidebar.selectors';
import { selectProjects } from '../../store/project/project.selectors';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './shared-sidebar.styles.scss';

interface ISharedSidebar {
	showGoBack?: Boolean;
	toggleProjectsSubcategory: () => void;
	isProjectsSubcategoryOpen: Boolean;
	projects: string;
	toggleToolsSubcategory: () => void;
	isToolsSubcategoryOpen?: Boolean;
	title: string;
	goBackTo?: string;
	toggleCreate?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	toggleDelete?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	toggleEdit?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	showEditTool?: Boolean;
	showDeleteTool?: Boolean;
	showAddTool?: Boolean;
	deleteToolTipText?: string;
	editToolTipText?: string;
	addToolTipText?: string;
	isDeleting?: Boolean;
	isEditing?: Boolean;
	history: History;
}

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
}: ISharedSidebar) => (
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

export default withRouter(withOpen(connect(mapStateToProps, mapDispatchToProps)(SharedSidebar)));
