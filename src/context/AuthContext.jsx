import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [userData, setUserData] = useState(null);
	const [token, setToken] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const initializeAuth = () => {
			const storedToken = localStorage.getItem("token");
			const storedUserData = localStorage.getItem("userData");

			if (storedToken && storedUserData) {
				const parsedUserData = JSON.parse(storedUserData);
				setToken(storedToken);
				setUserData(parsedUserData);
				setIsLoggedIn(true);
				axios.defaults.headers.common[
					"Authorization"
				] = `Bearer ${storedToken}`;
			}
			setIsLoading(false);
		};

		initializeAuth();
	}, []);

	const handleLogin = ({ token, userData }) => {
		localStorage.setItem("token", token);
		localStorage.setItem("userData", JSON.stringify(userData));
		setToken(token);
		setUserData(userData);
		setIsLoggedIn(true);
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userData");
		setToken(null);
		setUserData(null);
		setIsLoggedIn(false);
		delete axios.defaults.headers.common["Authorization"];
	};

	return (
		<AuthContext.Provider
			value={{
				userData,
				token,
				isLoggedIn,
				isLoading,
				handleLogin,
				handleLogout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext as default };
