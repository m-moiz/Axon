import React from 'react';
import PropTypes from 'prop-types';
import './search-bar.styles.scss';
import { connect } from 'react-redux';
import { setSearchText } from '../../redux/issue/issue.actions';

function SearchBar({ setSearchText }) {
	return (
		<div className="search-bar">
			<input
				onChange={(e) => setSearchText(e.target.value)}
				name="search"
				type="text"
				placeholder="Search Issues"
			/>
		</div>
	);
}

SearchBar.propTypes = {
	setSearchText: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
	return {
		setSearchText: (inputText) => dispatch(setSearchText(inputText))
	};
};

export default connect(null, mapDispatchToProps)(SearchBar);
