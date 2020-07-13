import React from 'react';
import MySelect from '../../components/my-select/my-select.component';
import ModalFooter from '../../components/modal-footer/modal-footer.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import FormInput from '../../components/form-input/form-input.component';
import { Field } from 'formik';

function CreateTeamForm({ handleSubmit, errors, touched, values, setFieldTouched, setFieldValue, users }) {
	return (
		<form onSubmit={handleSubmit} style={{ paddingLeft: '1.7rem', paddingTop: '2.5rem', marginBottom: '1rem' }}>
			<div className="form-head">
				<h3 className="modal-page-title">Create Team</h3>
			</div>

			<Field
				name="name"
				placeholder="Enter Team Name"
				as={FormInput}
				bottomStyle
				error={errors.name}
				touched={touched.name}
			/>

			<MySelect
				label="Select team members"
				name="usernames"
				value={values.usernames}
				onChange={setFieldValue}
				onBlur={setFieldTouched}
				error={errors.usernames}
				touched={touched.usernames}
				options={users}
				width="50%"
			/>

			<ModalFooter>
				<CustomButton type="submit" width="100%">
					Create
				</CustomButton>
			</ModalFooter>
		</form>
	);
}

export default CreateTeamForm;
