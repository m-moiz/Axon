import React from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import './editor.styles.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class RichEditor extends React.Component {
	handleModelChange = (editorState) => {
		this.props.onChange('editorState', editorState);
	};

	render() {
		return (
			<React.Fragment>
				<Editor
					wrapperClassName="editor-wrapper"
					editorClassName="editor"
					editorState={this.props.editorState}
					onEditorStateChange={this.handleModelChange}
					placeholder="Description..."
					ref="editor"
					spellCheck={true}
				/>
			</React.Fragment>
		);
	}
}

RichEditor.propTypes = {
	description: PropTypes.string,
	handleModelChange: PropTypes.func
};

export default RichEditor;
