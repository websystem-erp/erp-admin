import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import API_ENDPOINTS from "./API/apiEndpoints";
import AuthContext from "./context/AuthContext";

const LogIn = () => {
	const { setIsLoggedIn, setToken, setUserData, refreshAuthState } =
		useContext(AuthContext);
	const [credentials, setCredentials] = useState({ email: "", password: "" });
	const [userType, setUserType] = useState("admin");
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		const storedUserData = localStorage.getItem("userData");
		const storedUserType = localStorage.getItem("userType");
		if (token && storedUserData) {
			const decodedToken = jwtDecode(token);
			if (decodedToken.exp * 1000 > Date.now()) {
				setIsLoggedIn(true);
				setToken(token);
				setUserData(JSON.parse(storedUserData));
				navigate(storedUserType === "finance" ? "/fees" : "/");
			} else {
				localStorage.clear();
			}
		}
	}, [setIsLoggedIn, setToken, setUserData, navigate]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCredentials({ ...credentials, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(API_ENDPOINTS.ADMIN_LOGIN, credentials);
			if (response.data.success) {
				const userRole = response.data.data.role;
				const selectedUserType = userType.toLowerCase();
				if (
					userRole.toLowerCase() === "admin" ||
					(userRole.toLowerCase() === "finance" &&
						selectedUserType === "finance")
				) {
					setIsLoggedIn(true);
					setToken(response.data.token);
					localStorage.setItem("token", response.data.token);
					localStorage.setItem("userData", JSON.stringify(response.data.data));
					localStorage.setItem("userType", selectedUserType);
					setUserData(response.data.data);
					refreshAuthState(); // Refresh authentication state after login
					navigate(selectedUserType === "finance" ? "/fees" : "/");
				} else {
					setErrorMessage(
						`Unauthorized role: ${userRole}. Please log in with the appropriate role.`
					);
				}
			}
		} catch (error) {
			setErrorMessage(
				error.response?.status === 401
					? "Incorrect credentials, please try again"
					: "An error occurred. Please try again later."
			);
		}
	};

	return (
		<div className="flex items-center h-screen w-full">
			<div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
				<h2 className="block w-full text-xl uppercase font-bold mb-4">Login</h2>
				<form className="mb-4" onSubmit={handleSubmit}>
					<div className="mb-4 md:w/full">
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
					<div className="mb-6 md:w/full">
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
					<div className="mb-4 md:w/full">
						<label htmlFor="userType" className="block text-xs mb-1">
							Select User Type
						</label>
						<select
							className="w-full border rounded p-2 outline-none focus:shadow-outline"
							name="userType"
							id="userType"
							value={userType}
							onChange={(e) => setUserType(e.target.value)}
						>
							<option value="admin">Admin</option>
							<option value="finance">Finance</option>
						</select>
					</div>
					<div className="flex flex-col gap-4">
						<button
							type="submit"
							className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded"
						>
							Login
						</button>
					</div>
					{errorMessage && (
						<p className="text-red-500 text-xs mt-2">{errorMessage}</p>
					)}
				</form>
			</div>
		</div>
	);
};

export default LogIn;
