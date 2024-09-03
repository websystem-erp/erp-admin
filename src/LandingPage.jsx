import React from "react";
import { Link } from "react-router-dom";

const LandingPage = ({ onStartOnboarding }) => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h1 className="text-2xl font-bold mb-6 text-center">
					Welcome to Our Platform
				</h1>
				<div className="space-y-4">
					<Link
						to="/login"
						className="block w-full py-2 px-4 bg-sky-600 text-white font-semibold rounded-lg text-center hover:bg-sky-700 transition duration-300"
					>
						Login
					</Link>
					<button
						onClick={onStartOnboarding}
						className="block w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg text-center hover:bg-green-700 transition duration-300"
					>
						Register
					</button>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
