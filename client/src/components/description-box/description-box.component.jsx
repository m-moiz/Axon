import React from 'react';

import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import './description-box.styles.scss';

function DescriptionBox({ content }) {
	return (
		<React.Fragment>
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
