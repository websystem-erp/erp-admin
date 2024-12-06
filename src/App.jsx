import React, { useContext, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./LogIn";
import Layout from "./Layout";
import FeesDashboard from "./components/Dashboard/FeesDashboard";
import ResetPassword from "./ResetPassword";
import LandingPage from "./LandingPage";
import OnboardingForm from "./onboarding/OnboardingForm";
import "./App.css";
import AuthContext from "./context/AuthContext";

function App() {
	const { isLoggedIn, userData, isLoading, refreshAuthState } =
		useContext(AuthContext);
	const [showOnboarding, setShowOnboarding] = useState(false);

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userData");
		localStorage.removeItem("userType");
		refreshAuthState();
	};

	const handleStartOnboarding = () => {
		setShowOnboarding(true);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	const userType = localStorage.getItem("userType");

	return (
		<>
			<Routes>
				<Route
					path="/login"
					element={
						!isLoggedIn ? (
							<LogIn onStartOnboarding={handleStartOnboarding} />
						) : (
							<Navigate to="/" />
						)
					}
				/>
				<Route
					path="/fees"
					element={
						isLoggedIn && userType === "finance" ? (
							<FeesDashboard userData={userData} logout={logout} />
						) : (
							<Navigate to="/" />
						)
					}
				/>
				<Route
					path="/reset-password/:token/:userId"
					element={<ResetPassword />}
				/>
				<Route
					path="/"
					element={
						isLoggedIn ? (
							userType === "finance" ? (
								<Navigate to="/fees" />
							) : (
								<Layout logout={logout} userData={userData} />
							)
						) : (
							<LandingPage onStartOnboarding={handleStartOnboarding} />
						)
					}
				/>
				<Route
					path="/*"
					element={
						isLoggedIn ? (
							userType === "finance" ? (
								<Navigate to="/fees" />
							) : (
								<Layout logout={logout} userData={userData} />
							)
						) : (
							<Navigate to="/" />
						)
					}
				/>
			</Routes>
			{showOnboarding && (
				<OnboardingForm onClose={() => setShowOnboarding(false)} />
			)}
		</>
	);
}

export default App;
