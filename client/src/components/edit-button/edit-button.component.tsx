import React from 'react';
import PropTypes from 'prop-types';
import './edit-button.styles.scss';

function EditButton({ handleClick }) {
	return (
		<div className="edit-button">
			<i className="fas fa-edit" onClick={handleClick} />
		</div>
	);
}

EditButton.propTypes = {
	handleClick: PropTypes.func
};

export default EditButton;
