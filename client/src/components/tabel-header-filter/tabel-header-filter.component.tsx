import React from 'react';
import './tabel-header-filter.styles.scss';

function TabelHeaderFilter({ children, handleClick }) {
	return (
		<div onClick={handleClick} className="tabel-header-filter" style={{ marginRight: '2.3rem' }}>
			<i className="fas fa-angle-down" style={{ marginRight: '.3rem' }} />
			{children}
		</div>
	);
}

export default TabelHeaderFilter;
