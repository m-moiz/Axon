import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import CustomButton from '../../components/custom-button/custom-button.component';
import CloseButton from '../../components/close-button/close-button.component';
import PageContentContainer from '../page-content-container/page-content-container.component';
import './modal-page.styles.scss';

const ModalPage = ({
	children,
	width,
	height,
	handleSubmit,
	title,
	toggleModal,
	typeOfPage,
	closeButtonLeft,
	closeButtonBottom,
	closeButtonTop,
	closeButtonFontSize
}) => (
	<div className="modal-page-container">
		<div className="modal-page" style={{ width: width, height: height }}>
			<div className="left-box" />
			<PageContentContainer>
				<Form
					onSubmit={handleSubmit}
					style={{ paddingLeft: '1.7rem', paddingTop: '2.5rem', marginBottom: '1rem' }}
				>
					<div className="form-head">
						<h3 className="modal-page-title">{title}</h3>
						<CloseButton
							top={closeButtonTop}
							bottom={closeButtonBottom}
							left={closeButtonLeft}
							fontSize={closeButtonFontSize}
							action={toggleModal}
						/>
					</div>

					{children}

					{typeOfPage === 'create' ? (
						<CustomButton type="submit" width="25%" left="20rem">
							Create
						</CustomButton>
					) : (
						<CustomButton type="submit" width="25%" left="22rem" color="#f74b1b">
							Delete
						</CustomButton>
					)}
				</Form>
			</PageContentContainer>
		</div>
	</div>
);

ModalPage.propTypes = {
	children: PropTypes.elementType,
	width: PropTypes.string,
	height: PropTypes.string,
	handleSubmit: PropTypes.func,
	title: PropTypes.string,
	toggleModal: PropTypes.func,
	typeOfPage: PropTypes.string,
	closeButtonLeft: PropTypes.string,
	closeButtonBottom: PropTypes.string,
	closeButtonTop: PropTypes.string,
	closeButtonFontSize: PropTypes.string
};

export default ModalPage;
