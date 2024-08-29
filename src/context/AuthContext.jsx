import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [token, setToken] = useState(null);
	const [userData, setUserData] = useState(null);

	const refreshAuthState = () => {
		const token = localStorage.getItem("token");
		const storedUserData = localStorage.getItem("userData");
		if (token && storedUserData) {
			const decodedToken = jwtDecode(token);
			if (decodedToken.exp * 1000 > Date.now()) {
				setIsLoggedIn(true);
				setToken(token);
				setUserData(JSON.parse(storedUserData));
			} else {
				localStorage.removeItem("token");
				localStorage.removeItem("userData");
			}
		}
	};

	useEffect(() => {
		refreshAuthState();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				setIsLoggedIn,
				token,
				setToken,
				userData,
				setUserData,
				refreshAuthState, // Export the refresh function
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
