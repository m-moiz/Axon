import React, { ReactChildren } from 'react';
import './page-content-container.styles.scss';

interface PageContentContainer {
	children: React.ReactNode;
	overflowX?: 'auto' | 'hidden' | 'scroll' | 'visible';
}

function PageContentContainer({ children, overflowX }: PageContentContainer) {
	return (
		<main className="page-content-container" style={{ overflowX: overflowX }}>
			{children}
		</main>
	);
}

export default PageContentContainer;
