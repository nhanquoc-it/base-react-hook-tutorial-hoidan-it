import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ModalAddNew = (props) => {
	const { handleClose, show } = props;

	const [name, setName] = useState("");
	const [job, setJob] = useState("");

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleJobChange = (event) => {
		setJob(event.target.value);
	};

	const handleSaveUser = () => {
		console.log(">>> check state:", "name = ", name, " job = ", job);
	};

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add New User</Modal.Title>
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
					<Button variant="primary" onClick={handleSaveUser}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalAddNew;
