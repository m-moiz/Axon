import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import PageContainer from '../../components/page-container/page-container.component';
import PageContentContainer from '../../components/page-content-container/page-content-container.component';
import BoardColumn from '../../components/board-column/board-column.component';
import SharedSidebar from '../../components/sidebar-shared/shared-sidebar.component';
import styled from 'styled-components';
import CreateTaskForm from '../../components/create-task-form/create-task-form.component';
import v4 from 'uuid';
import { selectIsSidebarOpen } from '../../redux/sidebar/sidebar.selectors';
import { setIssuesArray } from '../../redux/issue/issue.actions';
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

	updateState(column1TaskIds, column2TaskIds, column3TaskIds, boardIssues, issues) {
		this.props.setIssuesArray(issues);
		let options = this.props.issues;
		options = options.filter((item) => !(item._id in boardIssues));
		this.setState({
			...this.state,
			columns: {
				'column-1': {
					...this.state.columns['column-1'],
					taskIds: column1TaskIds
				},
				'column-2': {
					...this.state.columns['column-2'],
					taskIds: column2TaskIds
				},
				'column-3': {
					...this.state.columns['column-3'],
					taskIds: column3TaskIds
				}
			},
			tasks: boardIssues,
			options: options
		});
	}

	fetchAndUpdateState() {
		axios
			.get(`/api/issue/${this.props.teamId}&${this.props.projectId}`)
			.then((resp) => {
				let issues = resp.data.result.projects[0].issues;
				let issuesWithBoardColumnField = issues.filter((issue) => issue.boardColumn);

				let column1TaskIds = issuesWithBoardColumnField
					.filter((issue) => issue.boardColumn === 'column-1')
					.map((issue) => issue._id);

				let column2TaskIds = issuesWithBoardColumnField
					.filter((issue) => issue.boardColumn === 'column-2')
					.map((issue) => issue._id);

				let column3TaskIds = issuesWithBoardColumnField
					.filter((issue) => issue.boardColumn === 'column-3')
					.map((issue) => issue._id);

				var boardIssues = {};
				issuesWithBoardColumnField.forEach((issue) => {
					boardIssues[issue._id] = { id: issue._id, content: issue.summary };
				});

				this.updateState(column1TaskIds, column2TaskIds, column3TaskIds, boardIssues, issues);
			})
			.catch((err) => console.log(err));
	}

	componentDidMount() {
		this.fetchAndUpdateState();
	}

	componentDidUpdate(prevProps) {
		console.log(prevProps.projectId, this.props.projectId);
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
		let options = this.reduceOptionsOnSubmit(task);
		let newTask = task.value;
		let newTaskId = task.id;
		columnId = columnId.id;

		axios({
			method: 'put',
			url: `/api/issue/${this.props.teamId}&${this.props.projectId}&${newTaskId}/updateBoardColumn`,
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				column: columnId
			}
		}).catch((err) => console.log(err));

		let column = this.state.columns[columnId];

		let newColumn = {
			...column,
			taskIds: column.taskIds.concat(newTaskId)
		};

		this.setState({
			...this.state,
			columns: {
				...this.state.columns,
				[columnId]: newColumn
			},
			tasks: {
				...this.state.tasks,
				[newTaskId]: { id: newTaskId, content: newTask }
			},
			options: options
		});
	};

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

		axios({
			method: 'put',
			url: `/api/issue/${this.props.teamId}&${this.props.projectId}&${draggableId}/updateBoardColumn`,
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				column: destination.droppableId
			}
		})
			.then()
			.catch((err) => console.log(err));

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
					showGoBack
					goBackTo="/user/issues"
					title="Board"
					addToolTipText="Create Issue"
					editToolTipText="Edit Issue"
					deleteToolTipText="Delete Issues"
					isSidebarOpen={this.props.isSidebarOpen}
				/>
				<PageContentContainer>
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
