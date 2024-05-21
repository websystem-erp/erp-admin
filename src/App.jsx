import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./LogIn";
import Layout from "./Layout";
import "./App.css";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		// Check if user is logged in when the component mounts
		const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
		if (storedIsLoggedIn === "true") {
			setIsLoggedIn(true);
		}
	}, []);

	return (
		<Routes>
			<Route path="/login" element={<LogIn setIsLoggedIn={setIsLoggedIn} />} />
			<Route
				path="/*"
				element={isLoggedIn ? <Layout /> : <Navigate to="/login" />}
			/>
		</Routes>
	);
}

export default App;
