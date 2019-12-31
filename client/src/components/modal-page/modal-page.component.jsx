import React from 'react';
import Form from 'react-bootstrap/Form';
import CustomButton from '../../components/custom-button/custom-button.component';
import CloseButton from '../../components/close-button/close-button.component';
import './modal-page.styles.scss';

const ModalPage = ({ children, width, height, handleSubmit, title, toggleModal, typeOfPage }) => (
	<div className="modal-page-container">
		<div className="modal-page" style={{ width: width, height: height }}>
			<div className="left-box" />
			<Form onSubmit={handleSubmit}>
				<div className="form-head">
					<h3 className="modal-page-title">{title}</h3>
					<CloseButton action={toggleModal} />
				</div>

				{children}

				{typeOfPage === 'create' ? (
					<CustomButton type="submit" width="25%" left="22rem" top="2rem">
						Create
					</CustomButton>
				) : (
					<CustomButton type="submit" width="25%" left="22rem" color="#f74b1b">
						Delete
					</CustomButton>
				)}
			</Form>
		</div>
	</div>
);

export default ModalPage;
