import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => (
	<div
		style={{
			position: 'fixed',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)'
		}}
	>
		<Spinner animation="grow" variant="success" />
	</div>
);

export default Loading;
