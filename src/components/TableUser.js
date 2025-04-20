import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/userService";
import ReactPaginate from "react-paginate";

const TableUser = (props) => {
	const [listUsers, setListUsers] = useState([]);

	// State total page & user
	const [totalUser, setTotalUser] = useState(0);
	const [totalPage, setTotalPage] = useState(0);

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

	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Email</th>
						<th>First Name</th>
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
								</tr>
							);
						})}
				</tbody>
			</Table>

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
		</>
	);
};

export default TableUser;
