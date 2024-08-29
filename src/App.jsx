import React, { useState, useEffect, useRef, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import LogIn from "./LogIn";
import Layout from "./Layout";
import FeesDashboard from "./components/Dashboard/FeesDashboard";
import ResetPassword from "./ResetPassword";
import "./App.css";
import AuthContext from "./context/AuthContext";


// hello

function App() {
	const { isLoggedIn, setIsLoggedIn, token, setToken, userData, setUserData } =
		useContext(AuthContext);
	const timeoutRef = useRef(null);

	const logout = () => {
		setIsLoggedIn(false);
		setToken(null);
		setUserData(null);
		localStorage.removeItem("token");
		localStorage.removeItem("userData");
		localStorage.removeItem("userType");
	};

	const setLogoutTimer = (expirationTime) => {
		const currentTime = Date.now();
		const timeLeft = expirationTime * 1000 - currentTime;

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(logout, timeLeft);
	};

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		const storedUserData = localStorage.getItem("userData");
		const storedUserType = localStorage.getItem("userType");
		if (storedToken && storedUserData) {
			const decodedToken = jwtDecode(storedToken);
			if (decodedToken.exp * 1000 > Date.now()) {
				setIsLoggedIn(true);
				setToken(storedToken);
				setUserData(JSON.parse(storedUserData));
				setLogoutTimer(decodedToken.exp);
			} else {
				logout();
			}
		}

		const handleActivity = () => {
			if (token) {
				const decodedToken = jwtDecode(token);
				if (decodedToken.exp * 1000 > Date.now()) {
					setLogoutTimer(decodedToken.exp);
				} else {
					logout();
				}
			}
		};

		window.addEventListener("mousemove", handleActivity);
		window.addEventListener("keypress", handleActivity);

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			window.removeEventListener("mousemove", handleActivity);
			window.removeEventListener("keypress", handleActivity);
		};
	}, [token]);

	return (
		<Routes>
			<Route path="/login" element={<LogIn />} />
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
