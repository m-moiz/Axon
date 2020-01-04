import React from 'react';
import './page-content-container.styles.scss';

function PageContentContainer({ children }) {
	return <div className="page-content-container">{children}</div>;
}

export default PageContentContainer;
