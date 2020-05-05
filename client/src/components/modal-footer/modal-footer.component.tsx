import React from 'react';
import './modal-footer.styles.scss';

interface ModalFooter {
	children: React.ReactNode;
}
function ModalFooter({ children }: ModalFooter) {
	return <div className="modal-footer">{children}</div>;
}

export default ModalFooter;
