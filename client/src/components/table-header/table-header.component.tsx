import React from 'react';
import TableHeaderFilter from '../tabel-header-filter/tabel-header-filter.component';
import { toggleSortOptionsBox, toggleLabelOptionsBox, toggleStatusOptionsBox } from '../../store/issue/issue.actions';
import { connect } from 'react-redux';
import './table-header.styles.scss';

interface ITableHeader {
	count: number;
	toggleLabelOptionsBox: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	toggleSortOptionsBox: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	toggleStatusOptionsBox: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	isDarkTheme?: boolean;
}

function TableHeader({
	count,
	toggleLabelOptionsBox,
	toggleSortOptionsBox,
	toggleStatusOptionsBox,
	isDarkTheme
}: ITableHeader) {
	return (
		<div className={isDarkTheme ? 'table-header dark' : 'table-header light'}>
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

const mapStateToProps = (state) => {
	return {
		isDarkTheme: state.user.isDarkTheme
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleLabelOptionsBox: () => dispatch(toggleLabelOptionsBox()),
		toggleSortOptionsBox: () => dispatch(toggleSortOptionsBox()),
		toggleStatusOptionsBox: () => dispatch(toggleStatusOptionsBox())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TableHeader);
