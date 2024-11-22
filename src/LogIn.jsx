import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";
import { useApiEndpoints } from "./API/apiEndpoints";

function LogIn() {
	const { handleLogin } = useContext(AuthContext);
	const endpoints = useApiEndpoints();
	const navigate = useNavigate();
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});
	const [errorMessage, setErrorMessage] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCredentials((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(endpoints.ADMIN_LOGIN, credentials);

			if (response.data) {
				const { token, userData } = response.data;
				await handleLogin({ token, userData });

				if (userData.campusType === "COLLEGE") {
					navigate("/college-dashboard");
				} else if (userData.role === "finance") {
					navigate("/fees");
				} else {
					navigate("/");
				}
			}
		} catch (err) {
			setErrorMessage(err.response?.data?.message || "Login failed");
			console.error("Login error:", err);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md">
				<form
					className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
					onSubmit={handleSubmit}
				>
					<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Email
						</label>
						<input
							type="email"
							name="email"
							value={credentials.email}
							onChange={handleChange}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							required
						/>
					</div>

					<div className="mb-6">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Password
						</label>
						<input
							type="password"
							name="password"
							value={credentials.password}
							onChange={handleChange}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							required
						/>
					</div>

					<div className="flex items-center justify-center">
						<button
							type="submit"
							className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						>
							Sign In
						</button>
					</div>
				</form>

				{errorMessage && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
						{errorMessage}
					</div>
				)}
			</div>
		</div>
	);
}

export default LogIn;
