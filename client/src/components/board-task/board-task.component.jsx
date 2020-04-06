import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Label from '../label/label.component';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
	padding-bottom: 24px;
	border-radius: 2px;
	margin-bottom: 8px;
	box-shadow: ${(props) => (props.isDragging ? '' : '1px 1px 2px 1px #292929')};
	color: white;
	background-color: ${(props) => (props.isDragging ? '#525252' : '#3b3b3b')};
	width: 100%;
	display: inline-block;
	overflow: hidden;

	${(props) => props.isDragging && css`border-left: 2px solid blue;`};
`;

const Border = styled.div`
	width: 130%;
	height: 5px;
	background-color: #08ffb9;
	animation: g 1.5s infinite ease-in-out alternate;

	@keyframes g {
		0% {
			transform: translateX(-350px);
		}

		100% {
			transform: translateX(-60px);
		}
	}
`;

const Wrapper = styled.div`
	padding: 8px;
	padding-bottom: 12px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`;

class BoardTask extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isWorkingOn: false
		};
	}

	toggleWorkingOn = (e) => {
		this.setState({ isWorkingOn: !this.state.isWorkingOn });
	};

	render() {
		return (
			<Draggable draggableId={this.props.task.id} index={this.props.index}>
				{(provided, snapshot) => (
					<Container
						onDoubleClick={this.toggleWorkingOn}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
						isDragging={snapshot.isDragging}
					>
						{this.state.isWorkingOn ? <Border /> : ''}
						<Wrapper>
							{this.props.task.content}
							<Label labelType={this.props.task.issueType} inBoardTask />
						</Wrapper>
					</Container>
				)}
			</Draggable>
		);
	}
}

export default BoardTask;
