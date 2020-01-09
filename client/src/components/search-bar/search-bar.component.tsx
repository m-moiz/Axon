import React from 'react';
import PropTypes from 'prop-types';
import './search-bar.styles.scss';
import { connect } from 'react-redux';
import { setSearchText } from '../../redux/issue/issue.actions';

function SearchBar({ setSearchText }) {
	const handleSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<div className="search-bar">
			<form autoComplete="off" onSubmit={handleSubmit}>
				<input
					onChange={(e) => setSearchText(e.target.value)}
					name="search"
					type="text"
					placeholder="Search Issues"
				/>
			</form>
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
