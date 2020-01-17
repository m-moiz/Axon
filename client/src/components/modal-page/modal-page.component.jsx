import React from 'react';
import PropTypes from 'prop-types';
import PageContentContainer from '../page-content-container/page-content-container.component';
import './modal-page.styles.scss';

const ModalPage = ({ children, width, height }) => (
	<div className="modal-page-container">
		<div className="modal-page" style={{ width: width, height: height }}>
			<div className="left-box" />
			<PageContentContainer>{children}</PageContentContainer>
		</div>
	</div>
);

ModalPage.propTypes = {
	children: PropTypes.elementType,
	width: PropTypes.string,
	height: PropTypes.string
};

export default ModalPage;
