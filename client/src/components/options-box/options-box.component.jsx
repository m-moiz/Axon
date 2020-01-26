import React from 'react';
import PropTypes from 'prop-types';
import OptionsBoxHeader from '../options-box-header/options-box-header.component';
import OptionsBoxList from '../options-box-list/options-box-list.component';
import './options-box.styles.scss';

function OptionsBox({ right, bottom, headerTitle, listItems, type }) {
	return (
		<div className="options-box" style={{ right: right, bottom: bottom }}>
			<OptionsBoxHeader title={headerTitle} />
			<OptionsBoxList listItems={listItems} type={type} />
		</div>
	);
}

OptionsBoxHeader.propTypes = {
	right: PropTypes.string,
	bottom: PropTypes.string,
	headerTitle: PropTypes.string.isRequired,
	listItems: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default OptionsBox;
