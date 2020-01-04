import React from 'react';
import './page-container.styles.scss';

function PageContainer({ children }) {
	return <div className="page-container">{children}</div>;
}

export default PageContainer;
