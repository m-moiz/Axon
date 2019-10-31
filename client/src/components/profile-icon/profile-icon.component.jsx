import React from 'react';
import './profile-icon.styles.scss';

const ProfileIcon = ({ firstLetterOfName }) => (
	<div className="profile-icon">
		<i className="far fa-circle" />
		<div className="letter">{firstLetterOfName}</div>
	</div>
);

export default ProfileIcon;
