import React from 'react';
import { Field } from 'formik';
import MySelect from '../../components/my-select/my-select.component';
import CloseButton from '../../components/close-button/close-button.component';
import Form from 'react-bootstrap/Form';
import FormInput from '../../components/form-input/form-input.component';
import RichEditor from '../../components/editor/editor.component';
import ModalFooter from '../../components/modal-footer/modal-footer.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { issueTypes, statusTypes, priorityTypes } from '../../types/types';

const customStyles = {
	container: (provided, state) => ({
		width: '200px'
	}),

	menu: (provided, state) => ({
		position: 'relative',
		backgroundColor: 'white',
		width: '200px',
		minHeight: '50px',
		overflowY: 'auto',
		border: '1px solid #d6d6d6'
	})
};

function IssueForm({
	type,
	handleSubmit,
	modalAction,
	users,
	errors,
	touched,
	values,
	setFieldValue,
	setFieldTouched,
	projectMembers
}) {
	let title = '';
	let buttonText = '';
	if (type === 'create') {
		title = 'Create Issue';
		buttonText = 'Create';
	} else if (type === 'edit') {
		title = 'Edit Issue';
		buttonText = 'Edit';
	}
	return (
		<Form
			onSubmit={handleSubmit}
			style={{
				paddingLeft: '1.7rem',
				paddingTop: '2.5rem',
				marginBottom: '1rem'
			}}
		>
			<div className="form-head">
				<h3 className="modal-page-title">{title}</h3>
				<CloseButton fontSize="1.3rem" left="70%" color="grey" hoverBackground="#6b6b6b" action={modalAction} />
			</div>

			<Field
				inputName="Issue Type"
				name="issueType"
				as={FormInput}
				isSelectInput
				border
				small
				placeholder="Issue type"
				error={errors.issueType}
				touched={touched.issueType}
			>
				{issueTypes.map((item, index) => <option key={index}>{item}</option>)}
			</Field>

			<MySelect
				label="Reporter"
				name="reporter"
				value={values.reporter}
				onChange={setFieldValue}
				onBlur={setFieldTouched}
				error={errors.reporter}
				touched={touched.reporter}
				options={users.map((user, index) => ({ value: user._id, label: user.username }))}
				styles={customStyles}
				width="50%"
			/>

			<MySelect
				label="Assign to"
				name="assignee"
				value={values.assignee}
				onChange={setFieldValue}
				onBlur={setFieldTouched}
				error={errors.assignee}
				touched={touched.assignee}
				options={users.map((user, index) => ({ value: user._id , label: user.username }))}
				styles={customStyles}
				width="50%"
			/>

			<Field
				inputName="Status"
				name="status"
				as={FormInput}
				small
				isSelectInput
				border
				error={errors.status}
				touched={touched.status}
			>
				{statusTypes.map((item, index) => <option key={index}>{item}</option>)}
			</Field>

			<Field
				inputName="Summary"
				name="summary"
				as={FormInput}
				placeholder="Enter summary"
				error={errors.summary}
				touched={touched.summary}
			/>

			<label>Description</label>

			<RichEditor editorState={values.editorState} onChange={setFieldValue} />

			<Field
				inputName="Priority"
				name="priorityType"
				as={FormInput}
				small
				isSelectInput
				border
				error={errors.priorityType}
				touched={touched.priorityType}
			>
				{priorityTypes.map((item, index) => <option key={index}>{item}</option>)}
			</Field>

			<div className="due-date">
				<label>Due Date</label>
				<DatePicker
					selected={values.startDate}
					dateFormat="MMMM d, yyyy"
					name="startDate"
					onChange={(date) => setFieldValue('startDate', date)}
				/>
			</div>

			<Field
				inputName="Environment"
				name="environment"
				small
				placeholder="Enter environment"
				as={FormInput}
				error={errors.enivironment}
				touched={touched.enivironment}
			/>

			<Field
				inputName="Version"
				name="version"
				small
				placeholder="Enter version"
				as={FormInput}
				error={errors.version}
				touched={touched.version}
			/>

			<ModalFooter>
				<CustomButton isSecondary width="100%">
					Cancel
				</CustomButton>

				<CustomButton type="submit" width="100%">
					{buttonText}
				</CustomButton>
			</ModalFooter>
		</Form>
	);
}

export default IssueForm;
