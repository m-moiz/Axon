import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import BoardTask from '../board-task/board-task.component';

const Container = styled.div`
	margin: 8px;
	border: 1px solid lightgrey;
	background-color: white;
	border-radius: 2px;
	width: 220px;

	display: flex;
	flex-direction: column;
`;

const Title = styled.h3`padding: 8px;`;

const TaskList = styled.div`
	padding: 8px;
	transition: background-color .2s ease;
	background-color: ${(props) => (props.isDraggingOver ? 'skyblue' : 'inherit')};
	flex-grow: 1;
	min-height: 100px;
`;

class BoardColumn extends Component {
	render() {
		return (
			<Draggable draggableId={this.props.column.id} index={this.props.index}>
				{(provided) => (
					<Container {...provided.draggableProps} ref={provided.innerRef}>
						<Title {...provided.dragHandleProps}>{this.props.column.title}</Title>
						<Droppable droppableId={this.props.column.id} type="task">
							{(provided, snapshot) => (
								<TaskList
									ref={provided.innerRef}
									{...provided.droppableProps}
									isDraggingOver={snapshot.isDraggingOver}
								>
									{this.props.tasks.map((task, index) => (
										<BoardTask key={task.id} task={task} index={index} />
									))}
									{provided.placeholder}
								</TaskList>
							)}
						</Droppable>
					</Container>
				)}
			</Draggable>
		);
	}
}

export default BoardColumn;
