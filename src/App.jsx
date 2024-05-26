import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./LogIn";
import Layout from "./Layout";
import "./App.css";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const timeoutRef = useRef(null);

	const logout = () => {
		setIsLoggedIn(false);
		sessionStorage.removeItem("isLoggedIn");
	};

	const resetTimeout = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = setTimeout(logout, 3600000);
	};

	useEffect(() => {
		const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
		if (storedIsLoggedIn === "true") {
			setIsLoggedIn(true);
		}
		resetTimeout();

		const handleActivity = () => {
			resetTimeout();
		};

		window.addEventListener("mousemove", handleActivity);
		window.addEventListener("keypress", handleActivity);

		return () => {
			clearTimeout(timeoutRef.current);
			window.removeEventListener("mousemove", handleActivity);
			window.removeEventListener("keypress", handleActivity);
		};
	}, []);

	return (
		<Routes>
			<Route path="/login" element={<LogIn setIsLoggedIn={setIsLoggedIn} />} />
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
