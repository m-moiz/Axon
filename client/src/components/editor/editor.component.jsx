import React from 'react';
import PropTypes from 'prop-types';
import FroalaEditor from 'react-froala-wysiwyg';
import '../../../node_modules/froala-editor/js/froala_editor.pkgd.min.js';
import '../../../node_modules/froala-editor/js/plugins.pkgd.min.js';
import '../../../node_modules/froala-editor/js/third_party/embedly.min.js';
import '../../../node_modules/froala-editor/css/froala_style.min.css';
import '../../../node_modules/froala-editor/css/froala_editor.pkgd.min.css';
import '../../../node_modules/froala-editor/css/third_party/embedly.min.css';

class Editor extends React.Component {
	handleModelChange = (value) => {
		this.props.handleModelChange('description', value);
	};

	render() {
		return (
			<React.Fragment>
				<FroalaEditor
					model={this.props.description}
					onModelChange={this.handleModelChange}
					config={{
						attribution: false,
						placeholder: 'Start typing...',
						toolbarButtons: {
							moreText: {
								buttons: [
									'bold',
									'italic',
									'underline',
									'strikeThrough',
									'subscript',
									'superscript',
									'fontFamily',
									'fontSize',
									'textColor',
									'backgroundColor',
									'inlineClass',
									'inlineStyle',
									'clearFormatting'
								]
							},
							moreParagraph: {
								buttons: [
									'alignLeft',
									'alignCenter',
									'formatOLSimple',
									'alignRight',
									'alignJustify',
									'formatOL',
									'formatUL',
									'paragraphFormat',
									'paragraphStyle',
									'lineHeight',
									'outdent',
									'indent',
									'quote'
								]
							},
							moreMisc: {
								buttons: [
									'undo',
									'redo',
									'fullscreen',
									'print',
									'getPDF',
									'spellChecker',
									'selectAll',
									'html',
									'help'
								],
								align: 'right',
								buttonsVisible: 2
							}
						},
						pluginsEnabled: [
							'spell',
							'quote',
							'save',
							'paragraphFormat',
							'paragraphStyle',
							'help',
							'draggable',
							'align',
							'link',
							'lists',
							'image',
							'emoticons',
							'url',
							'colors',
							'entities',
							'inlineClass',
							'inlineStyle',
							'codeBeautif ',
							'spellChecker'
						]
					}}
				/>
			</React.Fragment>
		);
	}
}

Editor.propTypes = {
	description: PropTypes.string,
	handleModelChange: PropTypes.func
};

export default Editor;
