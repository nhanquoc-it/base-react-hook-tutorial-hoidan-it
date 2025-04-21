import React from "react";
import { Button, Modal } from "react-bootstrap";

const ModalDelete = (props) => {
	const { show, dataUserDelete, handleClose } = props;

	const handleDelete = () => {};

	return (
		<>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Delete User</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{/* Form Add New */}
					<div className="body-add-new">
						Are you sure you want to delete this user,{" "}
						<strong>email={dataUserDelete.email}</strong>. This action can't be
						undone?
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={() => handleDelete()}>
						Yes, Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalDelete;
