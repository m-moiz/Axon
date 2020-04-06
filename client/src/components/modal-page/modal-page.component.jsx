import React from 'react';
import PropTypes from 'prop-types';
import PageContentContainer from '../page-content-container/page-content-container.component';
import './modal-page.styles.scss';

const changeStyle = (style) => {
	let className = 'modal-page';
	if (style === 'full') {
		className += ' full';
	} else if (style === 'large') {
		className += ' large';
	} else if (style === 'medium') {
		className += ' medium';
	} else if (style === 'small') {
		className += ' small';
	}

	return className;
};

const ModalPage = ({ newStyle, typeOfPage, style, children }) => {
	const className = changeStyle(style);

	return (
		<div style={newStyle} className="modal-page-container">
			<div className={className}>
				<div className="left-box" />
				<PageContentContainer>{children}</PageContentContainer>
			</div>
		</div>
	);
};

ModalPage.propTypes = {
	style: PropTypes.string,
	children: PropTypes.elementType
};

export default ModalPage;
