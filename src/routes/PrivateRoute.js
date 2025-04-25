import React from "react";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
	console.log("PrivateRoute props: ", props);

	const user = useSelector((state) => state.user.account);

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
