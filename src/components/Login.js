import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const isFormFilled = email.trim() !== "" && password.trim() !== "";

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

						<Form>
							<Form.Group className="mb-3" controlId="formEmail">
								<Form.Label>Email or Username</Form.Label>
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
