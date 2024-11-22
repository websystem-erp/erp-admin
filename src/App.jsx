import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import LogIn from "./LogIn"; // Make sure this path matches your file structure
import Layout from "./Layout";
import FeesDashboard from "./components/Dashboard/FeesDashboard";
import CollegeDashboard from "./components/Dashboard/CollegeDashboard";

function App() {
	const { isLoggedIn, userData, isLoading, handleLogout } =
		useContext(AuthContext);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				Loading...
			</div>
		);
	}

	const isCollege = userData?.campusType === "COLLEGE";
	const isFinance = userData?.role === "finance";

	return (
		<Routes>
			<Route
				path="/login"
				element={
					!isLoggedIn ? (
						<LogIn />
					) : (
						<Navigate to={isCollege ? "/college-dashboard" : "/"} />
					)
				}
			/>

			<Route
				path="/college-dashboard"
				element={
					isLoggedIn && isCollege ? (
						<CollegeDashboard userData={userData} logout={handleLogout} />
					) : (
						<Navigate to="/login" />
					)
				}
			/>

			<Route
				path="/fees"
				element={
					isLoggedIn && isFinance ? (
						<FeesDashboard userData={userData} logout={handleLogout} />
					) : (
						<Navigate to="/login" />
					)
				}
			/>

			<Route
				path="/"
				element={
					isLoggedIn ? (
						isCollege ? (
							<Navigate to="/college-dashboard" />
						) : isFinance ? (
							<Navigate to="/fees" />
						) : (
							<Layout logout={handleLogout} userData={userData} />
						)
					) : (
						<Navigate to="/login" />
					)
				}
			/>

			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
}

export default App;
