import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import BoardTask from '../board-task/board-task.component';

const Container = styled.div`
	margin: 8px;
	background-color: #4c4c4c;
	box-shadow: 1px 1px 4px 2px #1d1d1d;
	border-radius: 2px;
	width: 284px;
	display: flex;
	flex-direction: column;
`;

const Title = styled.h5`
	padding: 8px;
	background-color: #d70afd;
	color: white;
`;

const TaskList = styled.div`
	padding: 8px;
	transition: background-color .2s ease;
	background-color: ${(props) => (props.isDraggingOver ? 'grey' : 'inherit')};
	flex-grow: 1;
	min-height: 100px;
`;

class BoardColumn extends Component {
	render() {
		return (
			<Draggable draggableId={this.props.column.id} index={this.props.index}>
				{(provided) => (
					<Container {...provided.draggableProps} ref={provided.innerRef}>
						<Title index={this.props.index} {...provided.dragHandleProps}>
							{this.props.column.title}
						</Title>
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
