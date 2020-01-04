import React from 'react';
import PropTypes from 'prop-types';
import Label from '../label/label.component';
import { getDate } from '../../utils/date';
import { setIssueId } from '../../redux/issue/issue.actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './table-row.styles.scss';

const TableRow = ({ summary, status, assignee, label, history, itemId, setIssueId, date }) => {
	let [ day, month ] = getDate(date);
	return (
		<div
			className="table__row"
			onClick={() => {
				setIssueId(itemId);
				history.push('/user/issue');
			}}
		>
			<div className="table__border" />
			<div className="table__item--summary">
				<div className="table__item--row">
					<i
						className="fas fa-exclamation-circle"
						style={{ marginRight: '.5rem', marginTop: '.3rem', color: 'grey' }}
					/>
					<div className="table__item--content">{summary}</div>
				</div>
				<div className="table__item">
					<Label labelType={label} />
				</div>

				<div className="table__item--date">
					Opened on {month} {day} by mmo
				</div>
			</div>
		</div>
	);
};

TableRow.propTypes = {
	summary: PropTypes.string,
	status: PropTypes.string,
	assignee: PropTypes.string,
	label: PropTypes.string
};

const mapDispatchToProps = (dispatch) => {
	return {
		setIssueId: (id) => dispatch(setIssueId(id))
	};
};

export default withRouter(connect(null, mapDispatchToProps)(TableRow));
