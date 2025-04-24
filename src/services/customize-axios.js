import axios from "axios";

const instance = axios.create({
	baseURL: "https://reqres.in",
	// timeout: 1000,
	// headers: {
	// 	"Content-Type": "application/json",
	// },
});

// Add a response interceptor
instance.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		console.log(">>> check response axios: ", response);
		return response.data ? response.data : { statusCode: response.status };
	},
	function (error) {
		let res = {};
		if (error.response) {
			// Requestt made and server responded
			res.data = error.response.data;
			res.status = error.response.status;
			res.headers = error.response.headers;
		} else if (error.request) {
			// The request was made but no response was received
			console.log(error.request);
		} else {
			// Something happened in setting up the request that triggered an Error
			console.log("Error", error.message);
		}
		return res;
	}
);

export default instance;
