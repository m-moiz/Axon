import React from 'react';
import './search-bar.styles.scss';
import FormInput from '../form-input/form-input.component';

function SearchBar() {
	return (
		<div className="search-bar">
			<FormInput type="text" placeholder="Search Issues" isFieldValid={true} />
		</div>
	);
}

export default SearchBar;
