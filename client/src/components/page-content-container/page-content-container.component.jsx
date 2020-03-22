import React from 'react';
import './page-content-container.styles.scss';

function PageContentContainer({ children, overflowX }) {
	return (
		<main className="page-content-container" style={{ overflowX: overflowX }}>
			{children}
		</main>
	);
}

export default PageContentContainer;
