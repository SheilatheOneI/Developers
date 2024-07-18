import axios from "axios";

const axiosFunc = axios.create({
	baseURL: import.meta.env.VITE_SERVER_API_URL,
});
axiosFunc.interceptors.response.use(
	(response) => response,
	(error) =>
		Promise.reject(
			error?.response?.data?.content ||
				error?.response?.data?.message ||
				error?.message ||
				"Something went wrong"
		)
);

export default axiosFunc;
