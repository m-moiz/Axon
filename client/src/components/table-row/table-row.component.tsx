import React from 'react';
import Label from '../label/label.component';
import EditButton from '../edit-button/edit-button.component';
import { getDate } from '../../utils/date';
import { setIssueId, toggleDeleteIssueModal, toggleEditIssueModal } from '../../store/issue/issue.actions';
import { selectIsShowingDeleteButton, selectIsShowingEditButton } from '../../store/issue/issue.selectors';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './table-row.styles.scss';

interface ITableRow {
	data: string;
	style: string;
	index: number;
	history: History;
	setIssueId: (id: string) => void;
	isShowingDeleteButton: Boolean;
	isShowingEditButton: Boolean;
	toggleDeleteIssueModal: () => void;
	toggleEditIssueModal: () => void;
	isDarkTheme?: Boolean;
}

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
	isDarkTheme
}: ITableRow) => {
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
				className={isDarkTheme ? 'table__row dark' : 'table__row light'}
				onClick={() => {
					setIssueId(itemId);
					history.push('/user/issue');
				}}
			>
				<div className="table__items">
					<div className="table__item--summary">
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
						<div className="table__item">
							<Label labelType={label} inTableRow />
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

const mapStateToProps = (state) => {
	return {
		isShowingDeleteButton: selectIsShowingDeleteButton(state),
		isShowingEditButton: selectIsShowingEditButton(state),
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
