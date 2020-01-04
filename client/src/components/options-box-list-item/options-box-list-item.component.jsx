import React from 'react';
import PropTypes from 'prop-types';
import './options-box-list-item.styles.scss';

function OptionsBoxListItem({ isActive }) {
	return (
		<button className={isActive ? 'optionsBoxListItem active' : 'optionsBoxListItem'}>
			<i className="fas fa-check" style={{ marginRight: '1.4rem' }} />
			<p>Newest</p>
		</button>
	);
}

OptionsBoxListItem.propTypes = {
	isActive: PropTypes.bool
};

export default OptionsBoxListItem;
