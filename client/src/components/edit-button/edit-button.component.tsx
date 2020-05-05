import React from 'react';
import './edit-button.styles.scss';

interface IEditButton {
	handleClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

function EditButton({ handleClick }: IEditButton) {
	return (
		<div className="edit-button">
			<i className="fas fa-edit" onClick={handleClick} />
		</div>
	);
}

export default EditButton;
