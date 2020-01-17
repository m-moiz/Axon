import React from 'react';
import ToggleItem from '../toggle-item/toggle-item.component';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import './description-box.styles.scss';

function DescriptionBox({ content }) {
	return (
		<React.Fragment>
			<ToggleItem title="Description" />

			{content ? (
				<div className="description-box">
					<FroalaEditorView model={content} />
				</div>
			) : (
				''
			)}
		</React.Fragment>
	);
}

export default DescriptionBox;
