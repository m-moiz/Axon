import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import BoardTask from '../board-task/board-task.component';

const Container = styled.div`
	margin: 8px;
	background-color: white;
	border-radius: 2px;
	width: 280px;
	display: flex;
	flex-direction: column;
`;

const Title = styled.h3`padding: 8px;`;

const TaskList = styled.div`
	padding: 8px;
	transition: background-color .2s ease;
	background-color: ${(props: any) => (props.isDraggingOver ? '#f7f7f7' : 'inherit')};
	flex-grow: 1;
	min-height: 100px;
`;

class BoardColumn extends Component {
	render() {
		const props: any = this.props;
		return (
			<Draggable draggableId={props.column.id} index={props.index}>
				{(provided) => (
					<Container {...provided.draggableProps} ref={provided.innerRef}>
						<Title {...provided.dragHandleProps}>{props.column.title}</Title>
						<Droppable droppableId={props.column.id} type="task">
							{(provided, snapshot) => (
								<TaskList
									ref={provided.innerRef}
									{...provided.droppableProps}
									isDraggingOver={snapshot.isDraggingOver}
								>
									{props.tasks.map((task, index) => (
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
