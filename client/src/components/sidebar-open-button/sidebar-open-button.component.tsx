import React from 'react';
import PropTypes from 'prop-types';
import './sidebar-open-button.styles.scss';

interface ISidebarOpenButton {
	handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const SidebarOpenButton = ({ handleClick }: ISidebarOpenButton) => (
	<div className="sidebar-open-button__right" onClick={handleClick}>
		<i className="fas fa-angle-right" />
	</div>
);

SidebarOpenButton.propTypes = {
	handleClick: PropTypes.func
};

export default SidebarOpenButton;
