import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { loginApi } from "../services/userService";
import { toast } from "react-toastify";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const isFormFilled = email.trim() !== "" && password.trim() !== "";

	const handleLogin = async (e) => {
		e.preventDefault(); // Ngừng submit form
		// Kiểm tra xem email và password đã được nhập chưa
		if (!email || !password) {
			toast.error("Email/password is required!");
			return;
		}

		try {
			// Call API login
			let res = await loginApi(email, password);
			console.log(">>> check login res: ", res);

			if (res && res.token) {
				localStorage.setItem("token", res.token);
				toast.success("Login successful!");
			} else {
				toast.error("Login failed. Please try again.");
			}
		} catch (error) {
			toast.error("An error occurred. Please try again!");
		}
	};

	const customInputStyle = {
		color: "#333",
		backgroundColor: "#f1f1f1",
		border: "none",
		outline: "none",
		boxShadow: "none",
	};

	const customDisabledButtonStyle = {
		cursor: "not-allowed",
		pointerEvents: "auto",
	};

	return (
		<>
			<Container className="d-flex justify-content-center align-items-center vh-100">
				<Row className="w-100" style={{ maxWidth: "400px" }}>
					<Col>
						<div className="text-center mb-4">
							<h3>Log in</h3>
							<p className="text-muted">
								Please enter your email and password to log in to your account.
								Manager system users list.
							</p>
						</div>

						<Form onSubmit={handleLogin}>
							<Form.Group className="mb-3" controlId="formEmail">
								<Form.Label>
									Email or Username: <b>eve.holt@reqres.in</b>
								</Form.Label>
								<Form.Control
									type="text"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter email or username"
									style={customInputStyle}
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formPassword">
								<Form.Label>Password</Form.Label>

								<InputGroup>
									<Form.Control
										type={showPassword ? "text" : "password"}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder="Enter password"
										style={customInputStyle}
									/>
									<Button
										variant="outline-secondary"
										onClick={() => setShowPassword(!showPassword)}
										style={customInputStyle}
									>
										{showPassword ? (
											<i className="fas fa-eye-slash"></i>
										) : (
											<i className="fas fa-eye"></i>
										)}
									</Button>
								</InputGroup>
							</Form.Group>

							<Button
								variant={isFormFilled ? "danger" : "secondary"}
								type="submit"
								className="w-100"
								disabled={!isFormFilled}
								style={!isFormFilled ? { ...customDisabledButtonStyle } : {}}
							>
								Log In
							</Button>

							<div
								className="text-center my-3 text-muted"
								style={{ cursor: "pointer" }}
							>
								<i className="fas fa-chevron-left mx-2"></i>
								Go Back
							</div>
						</Form>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Login;
