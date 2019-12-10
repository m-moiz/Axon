import React, { Component } from 'react';
import './projects.styles.scss';
import Modal from '../../components/modal/modal.components';
import CreateProject from '../create-project/create-project.component';
import DeleteProject from '../delete-project/delete-project.component';
import ProjectList from '../../components/project-list/project-list.component';
import AddButton from '../../components/add-button/add-button.component';
import SideBar from '../../components/sidebar/sidebar.component';
import Tool from '../../components/tool/tool.component';
import SideBarTools from '../../components/sidebar-tools/sidebar-tools.component';
import SideBarSubCategory from '../../components/sidebar-subcategory/sidebar-subcategory.component';
import SideBarItemsList from '../../components/sidebar-items-list/sidebar-items-list.component';
import { setProjectsArray, toggleCreateProject, toggleDeleteProject } from '../../redux/project/project.actions';
import { toggleProjectsSubcategory, toggleToolsSubcategory } from '../../redux/sidebar/sidebar.actions';
import { connect } from 'react-redux';
import axios from 'axios';

class ProjectsPage extends Component {
	componentDidMount() {
		if (this.props.isSignedIn === false) {
			window.location = '/sign-in';
		}
		axios
			.get(`http://localhost:4001/api/project/${this.props.userId}`)
			.then((resp) => {
				this.props.setProjectsArray(resp.data.result[0].projects);
			})
			.catch((err) => console.log(err));
	}

	componentDidUpdate() {}

	render() {
		return (
			<div className="project-page">
				{this.props.toggleModal && (
					<Modal>
						<CreateProject />
					</Modal>
				)}

				{this.props.toggleDeleteModal && (
					<Modal>
						<DeleteProject />
					</Modal>
				)}
				<SideBar title="Projects">
					<SideBarSubCategory
						toggleSidebarSubcategory={this.props.toggleProjectsSubcategory}
						subcategoryName="projects"
					>
						<SideBarItemsList
							isSidebarSubcategoryOpen={this.props.isProjectsSubcategoryOpen}
							items={this.props.projects}
						/>
					</SideBarSubCategory>

					<SideBarSubCategory
						toggleSidebarSubcategory={this.props.toggleToolsSubcategory}
						subcategoryName="tools"
					>
						<SideBarTools isSidebarSubcategoryOpen={this.props.isToolsSubcategoryOpen}>
							<Tool
								toggleTool={this.props.toggleDeleteProjects}
								tooltipText="Delete Projects"
								action={this.props.toggleDeleteProject}
							>
								<i className="fas fa-trash" />
							</Tool>
							<Tool tooltipText="Edit Projects">
								<i className="far fa-edit" />
							</Tool>
							<Tool tooltipText="Create Project" action={this.props.toggleCreateProject}>
								<i className="fas fa-plus" />
							</Tool>
							<Tool tooltipText="Settings">
								<i className="fas fa-cog" />
							</Tool>
						</SideBarTools>
					</SideBarSubCategory>
				</SideBar>
				<ProjectList projects={this.props.projects} />
				<AddButton toggleModal={this.props.toggleCreateProject} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.user.userId,
		isSignedIn: state.user.isSignedIn,
		projects: state.project.projects,
		toggleModal: state.project.toggleCreateProject,
		toggleDeleteModal: state.project.toggleDeleteProjectModal,
		toggleDeleteProjects: state.project.toggleDeleteProject,
		isProjectsSubcategoryOpen: state.sidebar.toggleProjectsSubcategory,
		isToolsSubcategoryOpen: state.sidebar.toggleToolsSubcategory
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setProjectsArray: (projects) => dispatch(setProjectsArray(projects)),
		toggleCreateProject: () => dispatch(toggleCreateProject()),
		toggleDeleteProject: () => dispatch(toggleDeleteProject()),
		toggleProjectsSubcategory: () => dispatch(toggleProjectsSubcategory()),
		toggleToolsSubcategory: () => dispatch(toggleToolsSubcategory())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);
