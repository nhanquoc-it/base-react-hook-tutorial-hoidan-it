import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import logoApp from "../assets/images/logo192.png";

const Header = (props) => {
	const location = useLocation();
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("token");
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
						<Nav className="me-auto" activeKey={location.pathname}>
							<NavLink to="/" className="nav-link">
								Home
							</NavLink>
							<NavLink to="/users" className="nav-link">
								Manage Users
							</NavLink>
						</Nav>
						<Nav>
							<NavDropdown title="Settings" id="basic-nav-dropdown">
								<NavLink to="/login" className="dropdown-item">
									Login
								</NavLink>
								<NavDropdown.Item onClick={() => handleLogout()}>
									Logout
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default Header;
