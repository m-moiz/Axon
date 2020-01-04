import React from 'react';
import PropTypes from 'prop-types';
import OptionBoxHeader from '../options-box-header/options-box-header.component';
import './options-box.styles.scss';

function OptionsBox({ right, bottom, headerTitle }) {
	return (
		<div className="options-box" style={{ right: right, bottom: bottom }}>
			<OptionBoxHeader title={headerTitle} />
		</div>
	);
}

OptionBoxHeader.propTypes = {
	right: PropTypes.string,
	bottom: PropTypes.string,
	headerTitle: PropTypes.string.isRequired
};

export default OptionsBox;
