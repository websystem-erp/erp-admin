import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import LogIn from "./LogIn";
import Layout from "./Layout";
import "./App.css";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [token, setToken] = useState(null);
	const timeoutRef = useRef(null);

	const logout = () => {
		setIsLoggedIn(false);
		setToken(null);
		localStorage.removeItem("token");
	};

	const setLogoutTimer = (expirationTime) => {
		const currentTime = Date.now();
		const timeLeft = expirationTime * 1000 - currentTime; // Convert expiration time to milliseconds

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(logout, timeLeft);
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const decodedToken = jwtDecode(token);
			if (decodedToken.exp * 1000 > Date.now()) {
				setIsLoggedIn(true);
				setToken(token);
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
			clearTimeout(timeoutRef.current);
			window.removeEventListener("mousemove", handleActivity);
			window.removeEventListener("keypress", handleActivity);
		};
	}, [token]);

	return (
		<Routes>
			<Route
				path="/login"
				element={<LogIn setIsLoggedIn={setIsLoggedIn} setToken={setToken} />}
			/>
			<Route
				path="/*"
				element={
					isLoggedIn ? <Layout logout={logout} /> : <Navigate to="/login" />
				}
			/>
		</Routes>
	);
}

export default App;
