import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import IssueType from '../../components/issue-type/issue-type.component';
import Dropdown from 'react-bootstrap/Dropdown';
import AddButton from '../../components/add-button/add-button.component';
import CreateIssue from '../create-issue/create-issue.component';
import Modal from '../../components/modal/modal.components';
import styled from 'styled-components';
import axios from 'axios';
import { connect } from 'react-redux';

const Title = styled.h3`
	margin: 0;
	padding: 0;
	position: relative;
	left: 47%;
	top: 1.97rem;
`;
class Issues extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		return (
			<div className="issues">
				{this.props.toggleModal && (
					<Modal>
						<CreateIssue />
					</Modal>
				)}
				<Title> Project 0 </Title>
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

				<AddButton />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		toggleModal: state.issue.toggleCreateIssue
	};
};

export default connect(mapStateToProps)(Issues);
