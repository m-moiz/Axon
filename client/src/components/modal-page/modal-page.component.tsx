import React from 'react';
import PageContentContainer from '../page-content-container/page-content-container.component';
import './modal-page.styles.scss';

interface IModalPage {
	anim?: React.CSSProperties;
	style?: string;
	children: React.ReactNode;
}

const changeStyle = (style) => {
	let className = 'modal-page';
	if (style === 'full') className += ' full';
	if (style === 'large') className += ' large';
	if (style === 'medium') className += ' medium';
	if (style === 'small') className += ' small';

	return className;
};

const ModalPage = ({ anim, style, children }: IModalPage) => {
	const className = changeStyle(style);

	return (
		<div style={anim} className="modal-page-container">
			<div className={className}>
				<div className="left-box" />
				<PageContentContainer>{children}</PageContentContainer>
			</div>
		</div>
	);
};

export default ModalPage;
