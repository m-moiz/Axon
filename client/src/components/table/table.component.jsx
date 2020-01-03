import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '../table-row/table-row.component';
import './table.styles.scss';

const Table = ({ title, items, top, left, bottom }) => (
	<div className="wrapper">
		<div className="table" style={{ top: top, left: left, bottom: bottom }}>
			{title ? (
				<div className="table__title">
					<h4>{title}</h4>
				</div>
			) : (
				''
			)}

			<div className="table__container">
				{Array.isArray(items) && items.map((item) => <TableRow key={item._id} desc={item.summary} />)}
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
