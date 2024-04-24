import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./LogIn";
import Layout from "./Layout";
import "./App.css";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
	};

	return (
		<Routes>
			<Route path="/login" element={<LogIn onLogin={handleLogin} />} />
			<Route
				path="/*"
				element={
					isLoggedIn ? (
						<Layout onLogout={handleLogout} />
					) : (
						<Navigate to="/login" />
					)
				}
			/>
		</Routes>
	);
}

export default App;
