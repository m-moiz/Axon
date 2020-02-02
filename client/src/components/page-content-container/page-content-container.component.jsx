import React from 'react';
import './page-content-container.styles.scss';

function PageContentContainer({ children, overflowX }) {
	return (
		<div className="page-content-container" style={{ overflowX: overflowX }}>
			{children}
		</div>
	);
}

export default PageContentContainer;
