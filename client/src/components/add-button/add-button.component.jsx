import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './add-button.styles.scss';

const AddButton = ({ toggleModal, isDarkTheme }) => {
	return <div className={isDarkTheme ? 'add_button dark' : 'add_button light'} onClick={toggleModal} />;
};

AddButton.propTypes = {
	toggleModal: PropTypes.func
};

const mapStateToProps = (state) => {
	return {
		isDarkTheme: state.user.isDarkTheme
	};
};

export default connect(mapStateToProps)(AddButton);
