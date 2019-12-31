import React from 'react';
import TableRow from '../table-row/table-row.component';
import './table.styles.scss';

const Table = ({ title, items }) => (
	<div class="table">
		<div class="table__title">
			<h4>{title}</h4>
		</div>
		<div class="table__container">
			{Array.isArray(items) && items.map((item) => <TableRow desc={item.summary} />)}
		</div>
	</div>
);

export default Table;
