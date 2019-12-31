import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import IssueType from '../../components/issue-type/issue-type.component';
import Dropdown from 'react-bootstrap/Dropdown';
import AddButton from '../../components/add-button/add-button.component';
import CreateIssue from '../create-issue/create-issue.component';
import SharedSidebar from '../../components/sidebar-shared/shared-sidebar.component';
import Modal from '../../components/modal/modal.components';
import styled from 'styled-components';
import axios from 'axios';
import { setIssuesArray, toggleCreateIssue } from '../../redux/issue/issue.actions';
import { selectUserId } from '../../redux/user/user.selectors';
import { selectIssues, selectToggleCreateIssue } from '../../redux/issue/issue.selectors';
import { selectProjectName, selectProjectId } from '../../redux/project/project.selectors';
import { selectIsSidebarOpen } from '../../redux/sidebar/sidebar.selectors';
import { connect } from 'react-redux';

const Title = styled.h3`
	margin: 0;
	padding: 0;
	position: relative;
	left: 47%;
	top: 1.97rem;
`;

class IssuesPage extends Component {
	componentDidMount() {
		axios
			.get(`http://localhost:4001/api/issue/${this.props.userId}&${this.props.projectId}`)
			.then((resp) => {
				console.log(resp);
				this.props.setIssuesArray(resp.data.result.projects[0].issues);
			})
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<div className="issues">
				{this.props.toggleModal && (
					<Modal>
						<CreateIssue />
					</Modal>
				)}

				<SharedSidebar
					title="Issues"
					toggleCreate={this.props.toggleCreateIssue}
					addToolTipText="Create Issue"
					editToolTipText="Edit Issue"
					deleteToolTipText="Delete Issue"
					isSidebarOpen={this.props.isSidebarOpen}
				/>

				<Title> {this.props.projectName} </Title>
				<Card style={{ width: '21rem', marginLeft: '10rem', marginTop: '4rem' }}>
					<Card.Body
						style={{
							backgroundColor: 'rgb(44,44,44)',
							color: 'white',
							height: '4.4rem',
							paddingLeft: '8rem',
							letterSpacing: '.1rem',
							display: 'flex'
						}}
					>
						<Card.Title>Issues</Card.Title>
						<Dropdown
							style={{
								width: '4.4rem',
								marginLeft: '3rem',
								marginBottom: '2rem',
								marginTop: '-.35rem'
							}}
						>
							<Dropdown.Toggle variant="primary" id="dropdown-basic">
								Sort
							</Dropdown.Toggle>

							<Dropdown.Menu>
								<Dropdown.Item>All</Dropdown.Item>
								<Dropdown.Item>^Priority</Dropdown.Item>
								<Dropdown.Item>Bugs</Dropdown.Item>
								<Dropdown.Item>Improvements</Dropdown.Item>
								<Dropdown.Item>Date Created</Dropdown.Item>
								<Dropdown.Item>Due Date</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Card.Body>
					<ListGroup variant="flush" style={{ overflowY: 'scroll', maxHeight: '300px' }}>
						{this.props.issues &&
							this.props.issues.map((issue) => (
								<ListGroup.Item key={issue._id}>{issue.summary}</ListGroup.Item>
							))}
						<ListGroup.Item active>
							<p>Couldn't write c++ in javascript please help</p>
							<IssueType variant="danger" issueType="Bug" />
						</ListGroup.Item>
						<ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
						<ListGroup.Item>Vestibulum at eros</ListGroup.Item>
						<ListGroup.Item>Veselbalefn state transitions</ListGroup.Item>
						<ListGroup.Item>Veselbalefn state transitions</ListGroup.Item>
						<ListGroup.Item>Veselbalefn state transitions</ListGroup.Item>
					</ListGroup>
				</Card>

				<AddButton toggleModal={this.props.toggleCreateIssue} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		toggleModal: selectToggleCreateIssue(state),
		userId: selectUserId(state),
		projectId: selectProjectId(state),
		issues: selectIssues(state),
		projectName: selectProjectName(state),
		isSidebarOpen: selectIsSidebarOpen(state)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setIssuesArray: (issues) => dispatch(setIssuesArray(issues)),
		toggleCreateIssue: () => dispatch(toggleCreateIssue())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(IssuesPage);
