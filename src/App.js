import Container from "react-bootstrap/Container";
import "./App.scss";
import Header from "./components/Header";
import TableUser from "./components/TableUser";
import { ToastContainer, Bounce } from "react-toastify";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";

function App() {
	const { user, login } = useContext(UserContext);
	console.log(">>> check user: ", user);

	// Check if user is logged in and set context state
	useEffect(() => {
		if (localStorage.getItem("token")) {
			login(localStorage.getItem("email"), localStorage.getItem("token"));
		}
	}, []);

	return (
		<div className="app-container">
			<Header />
			<Container>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/users" element={<TableUser />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</Container>

			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				transition={Bounce}
			/>
		</div>
	);
}

export default App;
