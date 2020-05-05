import React from 'react';
import OptionsBoxHeader from '../options-box-header/options-box-header.component';
import OptionsBoxList from '../options-box-list/options-box-list.component';
import './options-box.styles.scss';

interface IOptionsBox {
	right?: string;
	bottom?: string;
	headerTitle: string;
	listItems: string;
	type: string;
}

function OptionsBox({ right, bottom, headerTitle, listItems, type }: IOptionsBox) {
	return (
		<div className="options-box" style={{ right: right, bottom: bottom }}>
			<OptionsBoxHeader title={headerTitle} />
			<OptionsBoxList listItems={listItems} type={type} />
		</div>
	);
}

export default OptionsBox;
