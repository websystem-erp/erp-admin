import React, { createContext, useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [token, setToken] = useState(null);
	const [userData, setUserData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const refreshAuthState = useCallback(() => {
		const storedToken = localStorage.getItem("token");
		const storedUserData = localStorage.getItem("userData");

		if (storedToken && storedUserData) {
			const decodedToken = jwtDecode(storedToken);
			if (decodedToken.exp * 1000 > Date.now()) {
				setIsLoggedIn(true);
				setToken(storedToken);
				setUserData(JSON.parse(storedUserData));
			} else {
				// Token expired, clear everything
				localStorage.removeItem("token");
				localStorage.removeItem("userData");
				setIsLoggedIn(false);
				setToken(null);
				setUserData(null);
			}
		} else {
			setIsLoggedIn(false);
			setToken(null);
			setUserData(null);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		refreshAuthState();
	}, [refreshAuthState]);

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				setIsLoggedIn,
				token,
				setToken,
				userData,
				setUserData,
				refreshAuthState,
				isLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
