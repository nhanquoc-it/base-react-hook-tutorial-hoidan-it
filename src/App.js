import Container from "react-bootstrap/Container";
import "./App.scss";
import Header from "./components/Header";
import { ToastContainer, Bounce } from "react-toastify";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import AppRoutes from "./routes/AppRoutes";
import { useSelector } from "react-redux";

function App() {
	// Redux
	const dataUserRedux = useSelector((state) => state.user.account);
	console.log(">>> dataUserRedux: ", dataUserRedux);

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
				<AppRoutes />
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
