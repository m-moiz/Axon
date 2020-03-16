import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Label from '../label/label.component';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
	padding: 8px;
	padding-bottom: 24px;
	border-radius: 2px;
	margin-bottom: 8px;
	box-shadow: ${(props) => (props.isDragging ? '' : '1px 1px 2px 1px #292929')};
	color: black;
	background-color: ${(props) => (props.isDragging ? 'white' : 'white')};
	width: 100%;
	display: inline-block;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;

	${(props) => props.isDragging && css`border-left: 2px solid blue;`};
`;

class BoardTask extends Component {
	render() {
		return (
			<Draggable draggableId={this.props.task.id} index={this.props.index}>
				{(provided, snapshot) => (
					<Container
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
						isDragging={snapshot.isDragging}
					>
						{this.props.task.content}
						<Label labelType={this.props.task.issueType} inBoardTask />
					</Container>
				)}
			</Draggable>
		);
	}
}

export default BoardTask;
