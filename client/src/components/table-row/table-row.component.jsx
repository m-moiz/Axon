import React from 'react';
import PropTypes from 'prop-types';
import Label from '../label/label.component';
import EditButton from '../edit-button/edit-button.component';
import { getDate } from '../../utils/date';
import { setIssueId, toggleDeleteIssueModal, toggleEditIssueModal } from '../../redux/issue/issue.actions';
import { selectIsShowingDeleteButton, selectIsShowingEditButton } from '../../redux/issue/issue.selectors';
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
	toggleEditIssueModal
}) => {
	const issue = data[index];
	let itemId = issue._id;
	let summary = issue.summary;
	let label = issue.issueType;
	let createdBy = issue.createdBy;
	let date = issue.creationDate;
	let numOfComments = issue.numOfComments;

	let [ day, month ] = getDate(date);
	const handleClick = () => {
		setIssueId(itemId);
		toggleEditIssueModal();
	};
	return (
		<div style={{ ...style, display: 'flex', flexDirection: 'row' }}>
			<div
				className="table__row"
				onClick={() => {
					setIssueId(itemId);
					history.push('/user/issue');
				}}
			>
				<div className="table__items">
					<div className="table__item--summary">
						<div className="table__item--row">
							<i
								className="fas fa-exclamation-circle"
								style={{ marginRight: '.6rem', marginTop: '.3rem', color: 'white' }}
							/>
							<div className={label ? 'table__item--content' : 'table__item--content margin'}>
								{summary}
							</div>
						</div>
						<div className="table__item">
							<Label labelType={label} />
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
			{isShowingDeleteButton ? (
				<div className="table__row--delete">
					<i
						className="far fa-trash-alt"
						onClick={() => {
							setIssueId(itemId);
							toggleDeleteIssueModal();
						}}
					/>
				</div>
			) : (
				''
			)}

			{isShowingEditButton ? (
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
		isShowingEditButton: selectIsShowingEditButton(state)
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
