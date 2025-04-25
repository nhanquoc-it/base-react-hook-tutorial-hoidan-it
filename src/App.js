import Container from "react-bootstrap/Container";
import "./App.scss";
import Header from "./components/Header";
import { ToastContainer, Bounce } from "react-toastify";
import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch } from "react-redux";
import { handleRefreshRedux } from "./redux/actions/userAction";
// import { useSelector } from "react-redux";

function App() {
	// Redux
	// const dataUserRedux = useSelector((state) => state.user.account);
	// console.log(">>> dataUserRedux: ", dataUserRedux);

	const dispatch = useDispatch();

	// Check if user is logged in and set context state
	useEffect(() => {
		if (localStorage.getItem("token")) {
			dispatch(handleRefreshRedux());
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
