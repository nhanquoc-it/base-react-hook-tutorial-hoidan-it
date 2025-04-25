import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

import logoApp from "../assets/images/logo192.png";

const Header = (props) => {
	const { user, logout } = useContext(UserContext);

	const location = useLocation();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
		toast.success("Logout successful!");
	};

	return (
		<>
			<Navbar expand="lg" className="bg-body-tertiary">
				<Container>
					<Navbar.Brand href="/">
						<img
							src={logoApp}
							alt="Logo"
							width="30"
							height="30"
							className="d-inline-block align-top me-2"
						/>
						<span>NhanQuocDev</span>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						{((user && user.auth) || window.location.pathname === "/") && (
							<>
								<Nav className="me-auto" activeKey={location.pathname}>
									<NavLink to="/" className="nav-link">
										Home
									</NavLink>
									<NavLink to="/users" className="nav-link">
										Manage Users
									</NavLink>
								</Nav>
								<Nav>
									{user && user.email && (
										<span className="nav-link">Welcome, {user.email}</span>
									)}

									<NavDropdown title="Settings">
										{user && user.auth === true ? (
											<NavDropdown.Item onClick={() => handleLogout()}>
												Logout
											</NavDropdown.Item>
										) : (
											<NavLink to="/login" className="dropdown-item">
												Login
											</NavLink>
										)}
									</NavDropdown>
								</Nav>
							</>
						)}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default Header;
