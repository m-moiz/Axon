import React from 'react';
import './search-bar.styles.scss';
import { connect } from 'react-redux';
import { setSearchText } from '../../store/issue/issue.actions';

interface ISearchBar {
	setSearchText: (text: string) => void;
	isDarkTheme?: boolean;
}

function SearchBar({ setSearchText, isDarkTheme }: ISearchBar) {
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
