import React from 'react';
import PropTypes from 'prop-types';
import './search-bar.styles.scss';
import { connect } from 'react-redux';
import { setSearchText } from '../../store/issue/issue.actions';

function SearchBar({ setSearchText, isDarkTheme }) {
	const handleSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<div className={isDarkTheme ? 'search-bar dark' : 'search-bar light'}>
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

const mapStateToProps = (state) => {
	return {
		isDarkTheme: state.user.isDarkTheme
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setSearchText: (inputText) => dispatch(setSearchText(inputText))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
