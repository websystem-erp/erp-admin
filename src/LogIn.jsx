import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LogIn = ({ onLogin }) => {
	const navigate = useNavigate();

	const [credentials, setCredentials] = useState({
		username: "",
		password: "",
	});
	const [errorMessage, setErrorMessage] = useState("");

	const dummyCredentials = { username: "test@test.com", password: "qwerty" };

	const handleSubmit = (event) => {
		event.preventDefault();
		if (
			credentials.username === dummyCredentials.username &&
			credentials.password === dummyCredentials.password
		) {
			onLogin();
			navigate("/");
		} else {
			setErrorMessage("Invalid username or password");
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setCredentials({ ...credentials, [name]: value });
	};

	return (
		<div className="flex items-center h-screen w-full">
			<div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
				<span className="block w-full text-xl uppercase font-bold mb-4">
					Login
				</span>
				<form className="mb-4" onSubmit={handleSubmit}>
					<div className="mb-4 md:w-full">
						<label htmlFor="username" className="block text-xs mb-1">
							Username or Email
						</label>
						<input
							className="w-full border rounded p-2 outline-none focus:shadow-outline"
							type="text"
							name="username"
							id="username"
							placeholder="Username or Email"
							value={credentials.username}
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
				<Link className="text-blue-700 text-center text-sm" to="/">
					Forgot password?
				</Link>
			</div>
		</div>
	);
};

export default LogIn;
