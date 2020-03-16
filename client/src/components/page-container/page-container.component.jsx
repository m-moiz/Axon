import React from 'react';
import './page-container.styles.scss';
import { connect } from 'react-redux';

function PageContainer({ children, isDarkTheme }) {
	return <div className={isDarkTheme ? 'page-container dark' : 'page-container light'}>{children}</div>;
}

const mapStateToProps = (state) => {
	return {
		isDarkTheme: state.user.isDarkTheme
	};
};

export default connect(mapStateToProps)(PageContainer);
