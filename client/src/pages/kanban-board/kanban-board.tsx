import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { BoardManager } from './BoardManager';
import PageContainer from '../../components/page-container/page-container.component';
import PageContentContainer from '../../components/page-content-container/page-content-container.component';
import BoardColumn from '../../components/board-column/board-column.component';
import SharedSidebar from '../../components/sidebar-shared/shared-sidebar.component';
import styled from 'styled-components';
import CreateTaskForm from '../../components/create-task-form/create-task-form.component';
import v4 from 'uuid';
import { selectIsSidebarOpen } from '../../store/sidebar/sidebar.selectors';
import { setIssuesArray } from '../../store/issue/issue.actions';
import axios from 'axios';
import { connect } from 'react-redux';

const Container = styled.div`display: flex;`;

const ColumnContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

class KanbanBoardPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: {},

			columns: {
				'column-1': {
					id: 'column-1',
					title: 'To Do',
					taskIds: []
				},
				'column-2': {
					id: 'column-2',
					title: 'In Progress',
					taskIds: []
				},
				'column-3': {
					id: 'column-3',
					title: 'Done',
					taskIds: []
				}
			},

			columnOrder: [ 'column-1', 'column-2', 'column-3' ],
			options: this.props.issues
		};
	}

	fetchAndUpdateState() {
		axios({
			method: 'get',
			url: `/api/issue/${this.props.teamId}&${this.props.projectId}`,
			headers: {
				Authorization: window.sessionStorage.getItem('token')
			}
		})
			.then((resp) => {
				this.fillBoard();
			})
			.catch((err) => console.log(err));
	}

	setWorkingOn = (id) => {};

	componentDidMount() {
		this.fetchAndUpdateState();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.projectId !== this.props.projectId) {
			this.fetchAndUpdateState();
		}
	}

	reduceOptionsOnSubmit = (task) => {
		let options = Array.from(this.state.options);
		options = options.filter((item) => item._id !== task.id);
		return options;
	};

	handleSubmit = (e, columnId, task) => {
		e.preventDefault();
		let newTaskId = task.id;
		columnId = columnId.id;
		//request issue column update
		axios({
			method: 'put',
			url: `/api/issue/${this.props.teamId}&${this.props.projectId}&${newTaskId}/updateBoardColumn`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: window.sessionStorage.getItem('token')
			},
			data: {
				column: columnId
			}
		}).catch((err) => console.log(err));

		let options = this.reduceOptionsOnSubmit(task);
		this.addTaskToColumn();
	};

	onDragEnd = (result) => {
		const { destination, source, draggableId, type } = result;
		const droppedInSamePosition =
			destination.droppableId === source.droppableId && destination.index === source.index;

		if (!destination && droppedInSamePosition) {
			return;
		}
		const columnWasDragged = type === 'column';
		if (columnWasDragged) {
			this.updateColumnOrder(destination, source, draggableId);
			return;
		}

		const start = this.state.columns[source.droppableId];
		const finish = this.state.columns[destination.droppableId];
		const droppedInSameColumn = start === finish;

		if (droppedInSameColumn) {
			this.updateTaskOrder(start, source, destination, draggableId);
			return;
		}

		this.dropToDifferentColumn();
	};

	render() {
		return (
			<PageContainer>
				<SharedSidebar
					showGoBack
					goBackTo="/user/issues"
					title="Board"
					addToolTipText="Create Issue"
					editToolTipText="Edit Issue"
					deleteToolTipText="Delete Issues"
					isSidebarOpen={this.props.isSidebarOpen}
				/>
				<PageContentContainer overflowX="auto">
					<DragDropContext onDragEnd={this.onDragEnd} onDragUpdate={this.onDragUpdate}>
						<Droppable droppableId="all-columns" direction="horizontal" type="column">
							{(provided, snapshot) => (
								<Container {...provided.droppableProps} ref={provided.innerRef}>
									{this.state.columnOrder.map((columnId, index) => {
										const column = this.state.columns[columnId];
										const tasks = column.taskIds.map((taskId) => this.state.tasks[taskId]);
										return (
											<ColumnContainer>
												<BoardColumn
													setWorkingOn={this.setWorkingOn}
													key={column.id}
													column={column}
													tasks={tasks}
													index={index}
												/>
												<CreateTaskForm
													key={v4()}
													newTask={this.state.newTask}
													column={column}
													handleSubmit={this.handleSubmit}
													handleChange={this.handleChange}
													options={this.state.options}
													isDragging={snapshot.isDraggingOver}
												/>
											</ColumnContainer>
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
		isSidebarOpen: selectIsSidebarOpen(state),
		teamId: state.team.teamId,
		projectId: state.project.projectId,
		issues: state.issue.issues
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setIssuesArray: (array) => dispatch(setIssuesArray(array))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(KanbanBoardPage);
