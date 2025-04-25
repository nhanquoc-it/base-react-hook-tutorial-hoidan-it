import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Alert } from "react-bootstrap";

const PrivateRoute = (props) => {
	console.log("PrivateRoute props: ", props);

	const { user, login } = useContext(UserContext);

	if (user && !user.auth) {
		return (
			<>
				<Alert variant="danger">
					<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
					<p>
						You don't have permission to access this page. Please login to
						continue.
					</p>
				</Alert>
			</>
		);
	}

	return <>{props.children}</>;
};

export default PrivateRoute;
