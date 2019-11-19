import React from 'react';
import { connect } from 'react-redux';
import { toggleCreateIssue } from '../../redux/issue/issue.actions';
import './add-button.styles.scss';

const AddButton = ({ toggleCreateIssue }) => (
	<div className="add_button" onClick={toggleCreateIssue}>
		<div className="plus">&#x0002B;</div>
	</div>
);

const mapDispatchToProps = (dispatch) => {
	return {
		toggleCreateIssue: () => dispatch(toggleCreateIssue())
	};
};

export default connect(null, mapDispatchToProps)(AddButton);
