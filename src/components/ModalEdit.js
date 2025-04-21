import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ModalEdit = (props) => {
	const { show, handleClose, dataUserEdit } = props;

	const [name, setName] = useState("");
	const [job, setJob] = useState("");

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleJobChange = (event) => {
		setJob(event.target.value);
	};

	const handleEditUser = () => {};

	// Get data user edit form parent component (TableUser)
	// console.log(">>> check dataUserEdit: ", dataUserEdit);
	useEffect(() => {
		if (show) {
			setName(dataUserEdit.first_name);
		}
	}, [dataUserEdit]);

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit New User</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{/* Form Add New */}
					<div className="body-add-new">
						<div className="mb-3">
							<label className="form-label">Name</label>
							<input
								type="text"
								className="form-control"
								value={name}
								onChange={handleNameChange}
							/>
						</div>
						<div className="mb-3">
							<label className="form-label">Job</label>
							<input
								type="text"
								className="form-control"
								value={job}
								onChange={handleJobChange}
							/>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleEditUser}>
						Update
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalEdit;
