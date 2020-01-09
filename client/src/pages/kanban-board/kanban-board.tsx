import React, { Component } from 'react';
import initialData from './initial-data';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import PageContainer from '../../components/page-container/page-container.component';
import PageContentContainer from '../../components/page-content-container/page-content-container.component';
import BoardColumn from '../../components/board-column/board-column.component';
import SharedSidebar from '../../components/sidebar-shared/shared-sidebar.component';
import styled from 'styled-components';
import { selectIsSidebarOpen } from '../../redux/sidebar/sidebar.selectors';
import { connect } from 'react-redux';

const Container = styled.div`display: flex;`;

class KanbanBoardPage extends Component {
	constructor(props) {
		super(props);
		this.state = initialData;
	}

	onDragUpdate = (update) => {
		const { destination } = update;
	};

	onDragEnd = (result) => {
		const { destination, source, draggableId, type } = result;

		if (!destination) {
			return;
		}

		//if user drops the item in the same place do nothing
		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}

		if (type === 'column') {
			const newColumnOrder = Array.from(this.state.columnOrder);
			newColumnOrder.splice(source.index, 1);
			newColumnOrder.splice(destination.index, 0, draggableId);

			const newState = {
				...this.state,
				columnOrder: newColumnOrder
			};

			this.setState(newState);
			return;
		}

		const start = this.state.columns[source.droppableId];
		const finish = this.state.columns[destination.droppableId];

		if (start === finish) {
			const newTaskIds = Array.from(start.taskIds);
			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);

			const newColumn = {
				...start,
				taskIds: newTaskIds
			};

			const newState = {
				...this.state,
				columns: {
					...this.state.columns,
					[newColumn.id]: newColumn
				}
			};

			this.setState(newState);
			return;
		}

		const startTaskIds = Array.from(start.taskIds);
		startTaskIds.splice(source.index, 1);
		const newStart = {
			...start,
			taskIds: startTaskIds
		};

		const finishTaskIds = Array.from(finish.taskIds);
		finishTaskIds.splice(destination.index, 0, draggableId);
		const newFinish = {
			...finish,
			taskIds: finishTaskIds
		};

		const newState = {
			...this.state,
			columns: {
				...this.state.columns,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish
			}
		};

		this.setState(newState);
	};

	render() {
		return (
			<PageContainer>
				<SharedSidebar
					title="Board"
					addToolTipText="Create Issue"
					editToolTipText="Edit Issue"
					deleteToolTipText="Delete Issues"
					isSidebarOpen={this.props.isSidebarOpen}
				/>
				<PageContentContainer>
					<DragDropContext onDragEnd={this.onDragEnd} onDragUpdate={this.onDragUpdate}>
						<Droppable droppableId="all-columns" direction="horizontal" type="column">
							{(provided) => (
								<Container {...provided.droppableProps} ref={provided.innerRef}>
									{this.state.columnOrder.map((columnId, index) => {
										const column = this.state.columns[columnId];
										const tasks = column.taskIds.map((taskId) => this.state.tasks[taskId]);

										return (
											<BoardColumn key={column.id} column={column} tasks={tasks} index={index} />
										);
									})}
									{provided.placeholder}
								</Container>
							)}
						</Droppable>
					</DragDropContext>
				</PageContentContainer>
			</PageContainer>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isSidebarOpen: selectIsSidebarOpen(state)
	};
};

export default connect(mapStateToProps)(KanbanBoardPage);
