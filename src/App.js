import Container from "react-bootstrap/Container";
import "./App.scss";
import Header from "./components/Header";
import TableUser from "./components/TableUser";
import { ToastContainer, Bounce } from 'react-toastify';

function App() {
	return (
		<div className="app-container">
			<Header />
			<Container>
				<TableUser />
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
