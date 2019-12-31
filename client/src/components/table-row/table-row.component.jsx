import React from 'react';
import './table-row.styles.scss';

const TableRow = ({ desc, endItems }) => (
	<div class="table__row">
		<div class="table__item--start">{desc} </div>
		<div class="table__item--end">{Array.isArray(endItems) && endItems.map((endItem) => <div>{endItem}</div>)}</div>
	</div>
);

export default TableRow;
