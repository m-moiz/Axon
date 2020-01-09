import React, { ReactChild, ReactEventHandler } from 'react';
import Form from 'react-bootstrap/Form';
import CustomButton from '../custom-button/custom-button.component';
import CloseButton from '../close-button/close-button.component';
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
}: ModalPage) => (
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

type ModalPage = {
	children: ReactChild;
	width: string;
	height: string;
	handleSubmit: ReactEventHandler;
	title: string;
	toggleModal: ReactEventHandler;
	typeOfPage: string;
	closeButtonLeft: string;
	closeButtonBottom: string;
	closeButtonTop: string;
	closeButtonFontSize: string;
};

export default ModalPage;
