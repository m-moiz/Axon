import React from 'react';
import { connect } from 'react-redux';
import './add-button.styles.scss';

interface AddButton {
	toggleModal: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	isDarkTheme?: Boolean;
}

const AddButton = ({ toggleModal, isDarkTheme }: AddButton) => {
	return <div className={isDarkTheme ? 'add_button dark' : 'add_button light'} onClick={toggleModal} />;
};

const mapStateToProps = (state) => {
	return {
		isDarkTheme: state.user.isDarkTheme
	};
};

export default connect(mapStateToProps)(AddButton);
