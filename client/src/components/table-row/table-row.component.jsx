import React from 'react';
import PropTypes from 'prop-types';
import Label from '../label/label.component';
import EditButton from '../edit-button/edit-button.component';
import { getDate } from '../../utils/date';
import { setIssueId, toggleDeleteIssueModal, toggleEditIssueModal } from '../../store/issue/issue.actions';
import { selectIsShowingDeleteButton, selectIsShowingEditButton } from '../../store/issue/issue.selectors';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './table-row.styles.scss';

const TableRow = ({
	data,
	style,
	index,
	history,
	setIssueId,
	isShowingDeleteButton,
	isShowingEditButton,
	toggleDeleteIssueModal,
	toggleEditIssueModal,
	roles,
	match,
	isDarkTheme
}) => {
	const issue = data[index];
	let issueId = issue._id;
	let summary = issue.summary;
	let label = issue.issueType;
	let priority = issue.priorityType;
	let createdBy = issue.createdBy;
	let date = issue.creationDate;
	let status = issue.status;
	let numOfComments = issue.numOfComments;

	let [ day, month ] = getDate(date);
	const handleClick = () => {
		setIssueId(issueId);
		toggleEditIssueModal();
	};

	let rowClass = 'table__row';

	if(status === 'Open'){
		rowClass += ' open';
	}else if(status === 'Closed'){
		rowClass += ' closed';
	}
	if(isDarkTheme){
		rowClass += ' dark';
	}else{
		rowClass += ' light';
	}


	const canEditIssue = roles.find((role) => role.resourceId === issueId && role.role === 'ISSUE_CREATOR');

	const canDeleteIssue = roles.find((role) => role.resourceId === issueId && role.role === 'ISSUE_CREATOR');

	return (
		<div style={{ ...style, display: 'flex', flexDirection: 'row' }}>
			<div
				className={rowClass}
				onClick={() => {
					setIssueId(issueId);
					history.push(`/projects/issues/${issueId}`);
				}}
			>
				<div className="table__items">
					<div >
						<div className="table__item--row">
							{isDarkTheme ? (
								<i
									className="fas fa-exclamation-circle"
									style={{ marginRight: '.6rem', marginTop: '.3rem', color: 'white' }}
								/>
							) : (
								<i
									className="fas fa-exclamation-circle"
									style={{ marginRight: '.6rem', marginTop: '.3rem', color: '#585858' }}
								/>
							)}

							<div className={label ? 'table__item--content' : 'table__item--content margin'}>
								{summary}
							</div>
						</div>

						<div className="table__item--row">
							
							<div className="table__item">
								<Label labelType={label} inTableRow />
							</div>

							<div className="table__item">
								<Label labelType={priority} inTableRow />
							</div>

						</div>

						<div className="table__item--date">
							Opened on {month} {day} by {createdBy}
						</div>
					</div>
					<div className="table__row--end">
						<span>{numOfComments}</span>
						<i className="far fa-comment" style={{ marginLeft: '.3rem' }} />
					</div>
				</div>
			</div>
			{isShowingDeleteButton && canDeleteIssue ? (
				<div className="table__row--delete">
					<i
						className="far fa-trash-alt"
						onClick={() => {
							setIssueId(issueId);
							toggleDeleteIssueModal();
						}}
					/>
				</div>
			) : (
				''
			)}

			{isShowingEditButton && canEditIssue ? (
				<div className="table__row--delete">
					<EditButton handleClick={handleClick} />
				</div>
			) : (
				''
			)}
		</div>
	);
};

TableRow.propTypes = {
	summary: PropTypes.string,
	status: PropTypes.string,
	assignee: PropTypes.string,
	label: PropTypes.string,
	createdBy: PropTypes.string
};

const mapStateToProps = (state) => {
	return {
		isShowingDeleteButton: selectIsShowingDeleteButton(state),
		isShowingEditButton: selectIsShowingEditButton(state),
		roles: state.user.roles,
		isDarkTheme: state.user.isDarkTheme
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setIssueId: (id) => dispatch(setIssueId(id)),
		toggleDeleteIssueModal: () => dispatch(toggleDeleteIssueModal()),
		toggleEditIssueModal: () => dispatch(toggleEditIssueModal())
	};
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TableRow));
