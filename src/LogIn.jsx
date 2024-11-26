import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";
import { useApiEndpoints } from "./API/apiEndpoints";
import OnboardingForm from "./onboarding/OnboardingForm";

const Login = () => {
	const navigate = useNavigate();
	const { handleLogin } = useContext(AuthContext);
	const endpoints = useApiEndpoints();
	const [mode, setMode] = useState("login");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});

	const handleInputChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			const response = await axios.post(endpoints.ADMIN_LOGIN, credentials);

			if (response.data) {
				const { token, userData } = response.data;
				await handleLogin({ token, userData });

				switch (true) {
					case userData.role === "finance":
						navigate("/fees-dashboard");
						break;
					case userData.campusType === "COLLEGE":
						navigate("/college-dashboard");
						break;
					case userData.campusType === "SCHOOL":
						navigate("/school-dashboard");
						break;
					default:
						navigate("/landing");
				}
			}
		} catch (err) {
			setError(err.response?.data?.message || "Invalid credentials");
			console.error("Login error:", err);
		} finally {
			setIsLoading(false);
		}
	};

	const handleForgotPassword = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			const response = await axios.post(endpoints.ADMIN_FORGOT_PASSWORD, {
				email: credentials.email,
			});

			if (response.data?.success) {
				alert("Password reset instructions sent to your email");
				setMode("login");
			}
		} catch (err) {
			setError(err.response?.data?.message || "Failed to process request");
		} finally {
			setIsLoading(false);
		}
	};

	const renderLoginForm = () => (
		<>
			<h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700"
					>
						Email
					</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						value={credentials.email}
						onChange={handleInputChange}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
					/>
				</div>

				<div>
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-700"
					>
						Password
					</label>
					<input
						id="password"
						name="password"
						type="password"
						required
						value={credentials.password}
						onChange={handleInputChange}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
					/>
				</div>

				{error && (
					<div className="p-2 text-sm text-red-600 bg-red-50 rounded">
						{error}
					</div>
				)}

				<button
					type="submit"
					disabled={isLoading}
					className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 ${
						isLoading ? "opacity-50 cursor-not-allowed" : ""
					}`}
				>
					{isLoading ? "Signing in..." : "Sign In"}
				</button>
			</form>

			<div className="mt-4 flex justify-between text-sm">
				<button
					onClick={() => setMode("forgot")}
					className="text-sky-600 hover:text-sky-500"
				>
					Forgot password?
				</button>
				<button
					onClick={() => setMode("register")}
					className="font-medium text-sky-600 hover:text-sky-500"
				>
					Register New Institution
				</button>
			</div>
		</>
	);

	const renderForgotPassword = () => (
		<>
			<h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
			<form onSubmit={handleForgotPassword} className="space-y-4">
				<div>
					<label
						htmlFor="reset-email"
						className="block text-sm font-medium text-gray-700"
					>
						Email Address
					</label>
					<input
						id="reset-email"
						name="email"
						type="email"
						required
						value={credentials.email}
						onChange={handleInputChange}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
					/>
				</div>

				{error && (
					<div className="p-2 text-sm text-red-600 bg-red-50 rounded">
						{error}
					</div>
				)}

				<button
					type="submit"
					disabled={isLoading}
					className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
				>
					{isLoading ? "Sending..." : "Send Reset Link"}
				</button>

				<button
					type="button"
					onClick={() => setMode("login")}
					className="w-full text-center text-sm text-sky-600 hover:text-sky-500"
				>
					Back to Login
				</button>
			</form>
		</>
	);

	return (
		<div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h1 className="text-center text-3xl font-extrabold text-gray-900">
					School ERP System
				</h1>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					{mode === "login" && renderLoginForm()}
					{mode === "forgot" && renderForgotPassword()}
					{mode === "register" && (
						<OnboardingForm onClose={() => setMode("login")} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Login;
