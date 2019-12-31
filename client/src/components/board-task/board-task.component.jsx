import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
	border: 1px solid lightgrey;
	padding: 8px;
	padding-bottom: 24px;
	border-radius: 2px;
	box-shadow: ${(props) => (props.isDragging ? 'none' : '1px 1px 2px 1px #f0eded')};
	margin-bottom: 8px;
	background-color: ${(props) => (props.isDragging ? '#ededed' : 'white')};
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
