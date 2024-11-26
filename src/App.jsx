import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import LogIn from "./LogIn";
import Dashboard from "./components/Dashboard/Dashboard";
import CollegeDashboard from "./components/Dashboard/CollegeDashboard";
import FeesDashboard from "./components/Dashboard/FeesDashboard";
import LandingPage from "./LandingPage";

const App = () => {
	const { isLoggedIn, userData, isLoading, handleLogout } =
		useContext(AuthContext);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				Loading...
			</div>
		);
	}

	const AuthRoute = () => {
		if (!isLoggedIn) return <Navigate to="/landing" />;

		switch (true) {
			case userData?.role === "finance":
				return <FeesDashboard userData={userData} logout={handleLogout} />;
			case userData?.campusType === "COLLEGE":
				return <CollegeDashboard userData={userData} logout={handleLogout} />;
			case userData?.campusType === "SCHOOL":
				return <Navigate to="/school-dashboard" />;
			default:
				return <Navigate to="/landing" />;
		}
	};

	return (
		<Routes>
			<Route
				path="/landing"
				element={!isLoggedIn ? <LandingPage /> : <Navigate to="/" />}
			/>
			<Route
				path="/login"
				element={!isLoggedIn ? <LogIn /> : <Navigate to="/" />}
			/>
			<Route
				path="/school-dashboard"
				element={
					isLoggedIn && userData?.campusType === "SCHOOL" ? (
						<Dashboard userData={userData} logout={handleLogout} />
					) : (
						<Navigate to="/landing" />
					)
				}
			/>
			<Route path="/" element={<AuthRoute />} />
			<Route path="*" element={<Navigate to="/landing" />} />
		</Routes>
	);
};

export default App;
