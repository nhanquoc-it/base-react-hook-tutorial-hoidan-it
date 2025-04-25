import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/userService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEdit from "./ModalEdit";
import Papa from "papaparse";
import _ from "lodash";
import ModalDelete from "./ModalDelete";
import { toast } from "react-toastify";

const TableUser = (props) => {
	// State list users
	const [listUsers, setListUsers] = useState([]);
	// State total page & user
	const [totalUser, setTotalUser] = useState(0);
	const [totalPage, setTotalPage] = useState(0);
	// State show modal add new user
	const [modalOpen, setModalOpen] = useState(false);
	// State show modal edit
	const [modalEdit, setModalEdit] = useState(false);
	const [dataUserEdit, setDataUserEdit] = useState({});
	// State show modal delete
	const [modalDelete, setModalDelete] = useState(false);
	const [dataUserDelete, setDataUserDelete] = useState({});
	// State sort by
	const [sortBy, setSortBy] = useState("asc");
	const [sortField, setSortField] = useState("id");
	//Search user by email
	const [keyword, setKeyword] = useState("");
	// State data export
	const [dataExport, setDataExport] = useState([]);

	useEffect(() => {
		getUsers(1);
	}, []);

	const getUsers = async (page) => {
		let res = await fetchAllUser(page);
		// console.log(">>> check res: ", res);
		if (res && res.data) {
			setListUsers(res.data);
			setTotalUser(res.total);
			setTotalPage(res.total_pages);
			// console.log(">>> check totalUser: ", res.total);
			// console.log(">>> check totalPage: ", res.total_pages);
		}
	};

	// Check state "listUsers"
	// console.log(">>> check listUsers: ", listUsers);

	// Change page paginate
	const handlePageClick = (event) => {
		// console.log(">>> check event lib react paginate: ", event);
		getUsers(+event.selected + 1); // Convert selected to number
		// console.log(">>> check page: ", +event.selected + 1);
	};

	// Open Modal
	const openModal = () => {
		setModalOpen(true);
	};

	// Close modal
	const closeModal = () => {
		setModalOpen(false);
		setModalEdit(false);
		setModalDelete(false);
	};

	// Create new user
	const handleCreateNewUser = (user) => {
		setListUsers([user, ...listUsers]);
	};

	// Edit user
	const handleEditUser = (user) => {
		console.log(">>> check user: ", user);
		setDataUserEdit(user);
		setModalEdit(true);
	};

	// Update user from modal edit
	const handleEditUserFromModal = (user) => {
		let listUsersClone = _.cloneDeep(listUsers); // Clone array
		let index = listUsers.findIndex((item) => item.id === user.id); // Find index of user in listUsers
		listUsersClone[index].first_name = user.first_name; // Update name of user in listUsersClone
		setListUsers(listUsersClone); // Update state listUsers

		console.log(">>> check user from modal: ", user);
		console.log(listUsers, listUsersClone);
		console.log(">>> check index: ", index);
	};

	// Delete user
	const handleDeleteUser = (user) => {
		console.log(">>> check user: ", user);
		setDataUserDelete(user); // Set data user delete
		setModalDelete(true); // Open modal delete
	};

	// Delete user from modal delete
	const handleDeleteUserFromModal = (user) => {
		let listUsersClone = _.cloneDeep(listUsers); // Clone array
		listUsersClone = listUsersClone.filter((item) => item.id !== user.id);
		setListUsers(listUsersClone); // Update state listUsers
		console.log(">>> check user from modal delete: ", user);
	};

	// Handle sort
	const handleSort = (sortBy, sortField) => {
		setSortBy(sortBy);
		setSortField(sortField);

		let listUsersClone = _.cloneDeep(listUsers); // Clone array
		listUsersClone = _.orderBy(listUsersClone, [sortField], [sortBy]); // Sort array
		setListUsers(listUsersClone); // Update state listUsers
		console.log(">>> check listUsersClone: ", listUsersClone);
	};

	// Check sort
	console.log(">>> check sort: ", sortBy, sortField);

	// Handle search user by email
	const handleSearch = (event) => {
		console.log(">>> check event: ", event.target.value);
		setKeyword(event.target.value); // Set keyword
		let term = event.target.value;
		if (term) {
			console.log(">>> run search term....");
			let listUsersClone = _.cloneDeep(listUsers); // Clone array
			listUsersClone = listUsersClone.filter((item) =>
				item.email.includes(term)
			); // Filter array
			setListUsers(listUsersClone); // Update state listUsers
		} else {
			getUsers(1);
		}
	};

	// Export data to CSV
	const getUserExport = (event, done) => {
		let result = [];
		if (listUsers && listUsers.length > 0) {
			// Create header
			result.push(["ID", "Email", "First Name", "Last Name"]);
			// Create body
			listUsers.map((item, index) => {
				let arr = [];
				arr[0] = item.id;
				arr[1] = item.email;
				arr[2] = item.first_name;
				arr[3] = item.last_name;
				result.push(arr);
			});
			setDataExport(result); // Set data export
			done(); // Call done to finish export
		}
	};

	// Import data from CSV
	const handleImportCSV = (event) => {
		if (event.target && event.target.files && event.target.files[0]) {
			let file = event.target.files[0];
			// console.log(">>> check file upload: ", file);
			if (file.type !== "text/csv") {
				toast.error("Please upload a CSV file!");
				event.target.value = ""; // Reset input file
				return;
			}

			// Parse CSV file
			Papa.parse(file, {
				// header: true,
				complete: function (results) {
					let rawCSV = results.data;
					if (rawCSV.length > 0) {
						if (rawCSV[0] && rawCSV[0].length === 3) {
							if (
								rawCSV[0][0] !== "email" ||
								rawCSV[0][1] !== "first_name" ||
								rawCSV[0][2] !== "last_name"
							) {
								toast.error("Wrong format header CSV field!");
							} else {
								// console.log(rawCSV);

								let result = [];
								rawCSV.map((item, index) => {
									if (index > 0 && item.length === 3) {
										let obj = {};
										obj.email = item[0];
										obj.first_name = item[1];
										obj.last_name = item[2];
										result.push(obj);
									}
								});
								setListUsers(result); // Set list users
								console.log(">>> check result: ", result);
							}
						} else {
							toast.error("Wrong format of CSV file!");
						}
					} else {
						toast.error("Not found data on CSV file!");
					}
					console.log(">>> check results: ", results.data);
				},
			});
		}
	};

	return (
		<>
			<div className="my-3 d-sm-flex justify-content-between">
				<span>
					<strong className="col-12">List Users:</strong>
				</span>
				<div>
					<label className="btn btn-warning" htmlFor="import">
						<i className="fa-solid fa-file-import"></i>
						Import
					</label>
					<input
						type="file"
						id="import"
						onChange={(event) => handleImportCSV(event)}
						className="mx-3"
						hidden
					/>

					<CSVLink
						filename="user.csv"
						className="btn btn-primary mx-3"
						data={dataExport}
						asyncOnClick={true}
						onClick={getUserExport}
					>
						<i className="fa-solid fa-file-arrow-down"></i>
						Export
					</CSVLink>
					<button onClick={openModal} className="btn btn-success">
						<i className="fa-solid fa-circle-plus"></i>
						Add User
					</button>
				</div>
			</div>

			<div className="col-12 col-sm-6 my-3">
				<input
					className="form-control"
					placeholder="Search user by email....."
					type="text"
					value={keyword}
					onChange={(event) => handleSearch(event)}
				/>
			</div>

			<div className="overflow-auto">
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>
								<div className="d-flex justify-content-between">
									<span>ID</span>
									<span>
										<i
											onClick={() => handleSort("desc", "id")}
											className="fa-solid fa-arrow-down-long"
										></i>
										<i
											onClick={() => handleSort("asc", "id")}
											className="fa-solid fa-arrow-up-long"
										></i>
									</span>
								</div>
							</th>
							<th>Email</th>
							<th>
								<div className="d-flex justify-content-between">
									<span>First Name</span>
									<span>
										<i
											onClick={() => handleSort("desc", "first_name")}
											className="fa-solid fa-arrow-down-long"
										></i>
										<i
											onClick={() => handleSort("asc", "first_name")}
											className="fa-solid fa-arrow-up-long"
										></i>
									</span>
								</div>
							</th>
							<th>Last Name</th>
						</tr>
					</thead>
					<tbody>
						{listUsers &&
							listUsers.length > 0 &&
							listUsers.map((item, index) => {
								return (
									<tr key={`user-${index}`}>
										<td>{item.id}</td>
										<td>{item.email}</td>
										<td>{item.first_name}</td>
										<td>{item.last_name}</td>
										<td>
											<button
												className="btn btn-warning mx-3"
												onClick={() => handleEditUser(item)}
											>
												Edit
											</button>
											<button
												onClick={() => handleDeleteUser(item)}
												className="btn btn-danger"
											>
												Delete
											</button>
										</td>
									</tr>
								);
							})}
					</tbody>
				</Table>
			</div>
			{/* Paginate */}
			<ReactPaginate
				nextLabel="next >"
				onPageChange={handlePageClick}
				pageRangeDisplayed={totalUser}
				pageCount={totalPage}
				previousLabel="< previous"
				renderOnZeroPageCount={null}
				breakLabel="..."
				containerClassName={"pagination"}
				pageClassName={"page-item"}
				pageLinkClassName={"page-link"}
				previousClassName={"page-item"}
				previousLinkClassName={"page-link"}
				nextClassName={"page-item"}
				nextLinkClassName={"page-link"}
				breakClassName={"page-item"}
				breakLinkClassName={"page-link"}
				activeClassName={"active"}
			/>

			{/* Modal Dialog */}
			<ModalAddNew
				show={modalOpen}
				handleClose={closeModal}
				handleCreateNewUser={handleCreateNewUser}
			/>
			<ModalEdit
				show={modalEdit}
				dataUserEdit={dataUserEdit}
				handleClose={closeModal}
				handleEditUserFromModal={handleEditUserFromModal}
			/>
			<ModalDelete
				show={modalDelete}
				handleClose={closeModal}
				dataUserDelete={dataUserDelete}
				handleDeleteUserFromModal={handleDeleteUserFromModal}
			/>
		</>
	);
};

export default TableUser;
