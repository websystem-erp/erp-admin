import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LogIn = ({ setIsLoggedIn }) => {
	const [credentials, setCredentials] = useState({ email: "", password: "" });
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		// Check if user is already logged in when the component mounts
		const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
		if (storedIsLoggedIn === "true") {
			setIsLoggedIn(true);
			navigate("/");
		}
	}, [setIsLoggedIn, navigate]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCredentials({ ...credentials, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"https://erp-system-backend.onrender.com/api/v1/admin/login",
				credentials
			);
			if (response.status === 202) {
				setIsLoggedIn(true);
				sessionStorage.setItem("isLoggedIn", "true");
				navigate("/");
			}
		} catch (error) {
			if (error.response && error.response.status === 401) {
				setErrorMessage("Credentials input incorrect, please try again");
			} else {
				setErrorMessage("An error occurred. Please try again later.");
			}
		}
	};

	return (
		<div className="flex items-center h-screen w-full">
			<div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
				<span className="block w-full text-xl uppercase font-bold mb-4">
					Login
				</span>
				<form className="mb-4" onSubmit={handleSubmit}>
					<div className="mb-4 md:w-full">
						<label htmlFor="email" className="block text-xs mb-1">
							Username or Email
						</label>
						<input
							className="w-full border rounded p-2 outline-none focus:shadow-outline"
							type="text"
							name="email"
							id="email"
							placeholder="Username or Email"
							value={credentials.email}
							onChange={handleChange}
						/>
					</div>
					<div className="mb-6 md:w-full">
						<label htmlFor="password" className="block text-xs mb-1">
							Password
						</label>
						<input
							className="w-full border rounded p-2 outline-none focus:shadow-outline"
							type="password"
							name="password"
							id="password"
							placeholder="Password"
							value={credentials.password}
							onChange={handleChange}
						/>
					</div>
					<button
						type="submit"
						className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded"
					>
						Login
					</button>
					{errorMessage && (
						<p className="text-red-500 text-xs mt-2">{errorMessage}</p>
					)}
				</form>
			</div>
		</div>
	);
};

export default LogIn;
