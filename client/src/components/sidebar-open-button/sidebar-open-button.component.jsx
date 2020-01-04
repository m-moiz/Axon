import React from 'react';
import PropTypes from 'prop-types';
import './sidebar-open-button.styles.scss';

const SidebarOpenButton = ({ handleClick }) => (
	<div className="sidebar-open-button__right" onClick={handleClick}>
		<i className="fas fa-angle-right" />
	</div>
);

SidebarOpenButton.propTypes = {
	handleClick: PropTypes.func
};

export default SidebarOpenButton;
