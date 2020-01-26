import React from 'react';
import TableHeaderFilter from '../tabel-header-filter/tabel-header-filter.component';
import { toggleSortOptionsBox, toggleLabelOptionsBox, toggleStatusOptionsBox } from '../../redux/issue/issue.actions';
import { connect } from 'react-redux';
import './table-header.styles.scss';

function TableHeader({ count, toggleLabelOptionsBox, toggleSortOptionsBox, toggleStatusOptionsBox }) {
	return (
		<div className="table-header">
			<p className="table-header__item--start">{count} Open</p>
			<div className="table-header__end">
				<div className="table-header__item">
					<TableHeaderFilter handleClick={toggleSortOptionsBox}>Sort</TableHeaderFilter>
				</div>
				<div className="table-header__item">
					<TableHeaderFilter handleClick={toggleStatusOptionsBox}>Status</TableHeaderFilter>
				</div>
				<div className="table-header__item">
					<TableHeaderFilter handleClick={toggleLabelOptionsBox}>Label</TableHeaderFilter>
				</div>
			</div>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		toggleLabelOptionsBox: () => dispatch(toggleLabelOptionsBox()),
		toggleSortOptionsBox: () => dispatch(toggleSortOptionsBox()),
		toggleStatusOptionsBox: () => dispatch(toggleStatusOptionsBox())
	};
};

export default connect(null, mapDispatchToProps)(TableHeader);
