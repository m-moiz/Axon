import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
	padding: 8px;
	padding-bottom: 24px;
	border-radius: 2px;
	margin-bottom: 8px;
	box-shadow: ${(props) => (props.isDragging ? '' : '1px 1px 2px 1px #292929')};
	color: #88ffad;
	background-color: ${(props) => (props.isDragging ? '#484545' : '#3e3a3a')};
	display: flex;
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
					</Container>
				)}
			</Draggable>
		);
	}
}

export default BoardTask;
