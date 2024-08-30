import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./LogIn";
import Layout from "./Layout";
import FeesDashboard from "./components/Dashboard/FeesDashboard";
import ResetPassword from "./ResetPassword";
import "./App.css";
import AuthContext from "./context/AuthContext";

function App() {
	const { isLoggedIn, userData, isLoading, refreshAuthState } =
		useContext(AuthContext);

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userData");
		localStorage.removeItem("userType");
		refreshAuthState();
	};

	if (isLoading) {
		return <div>Loading...</div>; // You can replace this with a more sophisticated loading component
	}

	return (
		<Routes>
			<Route
				path="/login"
				element={!isLoggedIn ? <LogIn /> : <Navigate to="/" />}
			/>
			<Route
				path="/fees"
				element={
					isLoggedIn ? (
						<FeesDashboard userData={userData} logout={logout} />
					) : (
						<Navigate to="/login" />
					)
				}
			/>
			<Route
				path="/reset-password/:token/:userId"
				element={<ResetPassword />}
			/>
			<Route
				path="/*"
				element={
					isLoggedIn ? (
						<Layout logout={logout} userData={userData} />
					) : (
						<Navigate to="/login" />
					)
				}
			/>
		</Routes>
	);
}

export default App;
