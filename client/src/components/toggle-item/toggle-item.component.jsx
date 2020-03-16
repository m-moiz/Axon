import React from 'react';
import { connect } from 'react-redux';
import './toggle-item.styles.scss';

function ToggleItem({ isOpen, handleClick, title, marginTop, isDarkTheme }) {
	let className = '';
	if (isOpen) {
		className = 'fas fa-caret-down';
	} else {
		className = 'fas fa-caret-right';
	}

	return (
		<div
			onClick={handleClick}
			className={isDarkTheme ? 'toggle-item dark' : 'toggle-item light'}
			style={{ marginTop: marginTop }}
		>
			<i className={className} style={{ marginRight: '.4rem', marginTop: '.2rem' }} />
			<span>{title}</span>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		isDarkTheme: state.user.isDarkTheme
	};
};

export default connect(mapStateToProps)(ToggleItem);
