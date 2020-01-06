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
	summary,
	status,
	assignee,
	label,
	history,
	itemId,
	setIssueId,
	date,
	isShowingDeleteButton,
	isShowingEditButton,
	toggleDeleteIssueModal,
	toggleEditIssueModal
}) => {
	let [ day, month ] = getDate(date);
	const handleClick = () => {
		setIssueId(itemId);
		toggleEditIssueModal();
	};
	return (
		<div style={{ display: 'flex', flexDirection: 'row' }}>
			<div
				className="table__row"
				onClick={() => {
					setIssueId(itemId);
					history.push('/user/issue');
				}}
			>
				<div className="table__border" />
				<div className="table__items">
					<div className="table__item--summary">
						<div className="table__item--row">
							<i
								className="fas fa-exclamation-circle"
								style={{ marginRight: '.5rem', marginTop: '.3rem', color: '#ababab' }}
							/>
							<div className={label ? 'table__item--content' : 'table__item--content margin'}>
								{summary}
							</div>
						</div>
						<div className="table__item">
							<Label labelType={label} />
						</div>

						<div className="table__item--date">
							Opened on {month} {day} by mmo
						</div>
					</div>
					<div className="table__row--end">
						<span>0</span>
						<i className="far fa-comment" style={{ marginLeft: '.2rem' }} />
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
	label: PropTypes.string
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
