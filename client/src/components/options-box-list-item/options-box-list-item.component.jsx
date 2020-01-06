import React from 'react';
import PropTypes from 'prop-types';
import './options-box-list-item.styles.scss';

function OptionsBoxListItem({ isActive = false, item }) {
	return (
		<button className={isActive ? 'optionsBoxListItem active' : 'optionsBoxListItem'}>
			<i
				className="fas fa-check"
				style={{
					marginRight: '.4rem',
					marginTop: '.35rem'
				}}
			/>
			<p>{item}</p>
		</button>
	);
}

OptionsBoxListItem.propTypes = {
	isActive: PropTypes.bool,
	item: PropTypes.string.isRequired
};

OptionsBoxListItem.defaultProps = {
	isActive: false
};

export default OptionsBoxListItem;
