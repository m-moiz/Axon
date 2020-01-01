import React from 'react';
import PropTypes from 'prop-types';
import './add-button.styles.scss';

const AddButton = ({ toggleModal }) => <div className="add_button" onClick={toggleModal} />;

AddButton.propTypes = {
	toggleModal: PropTypes.func
};

export default AddButton;
