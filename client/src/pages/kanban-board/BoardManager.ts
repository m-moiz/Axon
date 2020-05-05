export class BoardManager {
	updateColumnOrder(destination, source, draggableId) {
		const newColumnOrder = Array.from(this.state.columnOrder);
		newColumnOrder.splice(source.index, 1);
		newColumnOrder.splice(destination.index, 0, draggableId);

		const newState = {
			...this.state,
			columnOrder: newColumnOrder
		};

		this.setState(newState);
	}

	updateTaskOrder(start, source, destination, draggableId) {
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
	}

	// fillBoard
	fillBoard() {
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
			boardIssues[issue._id] = {
				id: issue._id,
				content: issue.summary,
				issueType: issue.issueType,
				isWorkingOn: false
			};
		});

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

	addTaskToColumn() {
		let newTask = task.value;
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
	}

	// removeTaskFromColumn

	dropToDifferentColumn() {
		axios({
			method: 'put',
			url: `/api/issue/${this.props.teamId}&${this.props.projectId}&${draggableId}/updateBoardColumn`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: window.sessionStorage.getItem('token')
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
	}
}
