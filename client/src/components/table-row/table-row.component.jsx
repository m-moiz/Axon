import React from 'react';
import './table-row.styles.scss';

const TableRow = ({ desc, endItems }) => (
	<div className="table__row">
		<div className="table__item--start">{desc} </div>
		<div className="table__item--end">
			{Array.isArray(endItems) && endItems.map((endItem) => <div key={endItem._id}>{endItem}</div>)}
		</div>
	</div>
);

export default TableRow;
