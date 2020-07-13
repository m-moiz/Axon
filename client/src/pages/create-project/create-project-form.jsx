import React from 'react';
import { Field } from 'formik';
import ModalFooter from '../../components/modal-footer/modal-footer.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import CloseButton from '../../components/close-button/close-button.component';
import Form from 'react-bootstrap/Form';
import FormInput from '../../components/form-input/form-input.component';

function CreateProjectForm({ handleSubmit, errors, touched, toggleCreateProjectModal }) {
	return (
		<Form onSubmit={handleSubmit} style={{ paddingLeft: '1.7rem', paddingTop: '2.5rem', marginBottom: '1rem' }}>
			<CloseButton
				fontSize="1rem"
				top="1rem"
				color="grey"
				hoverBackground="black"
				action={toggleCreateProjectModal}
			/>
			<div className="form-head">
				<h3 className="modal-page-title">Create Project</h3>
			</div>

			<Field
				name="name"
				placeholder="Enter Project Name"
				as={FormInput}
				error={errors.name}
				touched={touched.name}
				bottomStyle
			/>
			<Field
				name="description"
				placeholder="Enter a brief summary"
				as={FormInput}
				error={errors.description}
				touched={touched.description}
				bottomStyle
			/>

			<ModalFooter>
				<CustomButton isSecondary width="100%" handleClick={toggleCreateProjectModal}>
					Cancel
				</CustomButton>

				<CustomButton type="submit" width="100%">
					Create
				</CustomButton>
			</ModalFooter>
		</Form>
	);
}

export default CreateProjectForm;
