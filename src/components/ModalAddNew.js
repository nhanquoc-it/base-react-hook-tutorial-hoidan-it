import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { postCreateUser } from "../services/userService";
import { toast } from "react-toastify";

const ModalAddNew = (props) => {
	const { show, handleClose, handleCreateNewUser } = props;

	const [name, setName] = useState("");
	const [job, setJob] = useState("");

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleJobChange = (event) => {
		setJob(event.target.value);
	};

	const handleSaveUser = async () => {
		// console.log(">>> check state:", "name = ", name, " job = ", job);
		let res = await postCreateUser(name, job);
		console.log(">>> check res: ", res);
		if (res && res.id) {
			// success
			handleClose();
			setName("");
			setJob("");
			toast.success("Create new user succeed!");
			handleCreateNewUser({ first_name: name, id: res.id });
		} else {
			// error
			toast.error("Create new user error!");
		}
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
