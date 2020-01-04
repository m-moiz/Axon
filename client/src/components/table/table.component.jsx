import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from '../table-header/table-header.component';
import TableRow from '../table-row/table-row.component';
import './table.styles.scss';

const Table = ({ title, items, top, left, bottom }) => (
	<div className="wrapper">
		<TableHeader />
		<div className="table-wrapper">
			<div className="table" style={{ top: top, left: left, bottom: bottom }}>
				{title ? (
					<div className="table__title">
						<h4>{title}</h4>
					</div>
				) : (
					''
				)}

				<div className="table__container">
					{Array.isArray(items) && items.length > 0 ? (
						items.map((item) => (
							<TableRow
								key={item._id}
								itemId={item._id}
								summary={item.summary}
								date={item.creationDate}
								status={item.status}
								assignee={item.assignee}
								label={item.issueType}
							/>
						))
					) : (
						<div>You don't have any issues. Create by clicking the add icon</div>
					)}
				</div>
			</div>
		</div>
	</div>
);

Table.propTypes = {
	title: PropTypes.string,
	items: PropTypes.arrayOf(PropTypes.object),
	left: PropTypes.string,
	top: PropTypes.string,
	bottom: PropTypes.string
};

export default Table;
