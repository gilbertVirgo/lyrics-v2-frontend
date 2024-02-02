import { Button, Modal } from "react-bootstrap";

import React from "react";

export default () => {
	const [showModal, setShowModal] = React.useState(true);
	const handleModalClose = () => setShowModal(false);
	const handleScreenOpen = () => {
		window.open("/local-screen", "_blank", "popup=1");

		handleModalClose();
	};

	return (
		<Modal show={showModal} onClose={handleModalClose}>
			<Modal.Body>Would you like to open the screen as well?</Modal.Body>
			<Modal.Footer>
				<Button onClick={handleScreenOpen}>Yes</Button>
				<Button onClick={handleModalClose} variant="secondary">
					No
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
