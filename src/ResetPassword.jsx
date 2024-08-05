import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_ENDPOINTS from "./API/apiEndpoints";

const ResetPassword = () => {
	const { token, userId } = useParams();
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const checkPasswordMatch = () => {
		return newPassword && confirmPassword && newPassword === confirmPassword;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!checkPasswordMatch()) {
			setErrorMessage("Passwords do not match");
			return;
		}
		setIsSubmitting(true);
		try {
			const response = await axios.post(API_ENDPOINTS.RESET_PASSWORD, {
				token,
				userId,
				newPassword,
			});
			if (response.data.success) {
				setSuccessMessage("Password reset successfully");
			} else {
				setErrorMessage("Failed to reset password. Please try again later.");
			}
		} catch (error) {
			setErrorMessage("An error occurred. Please try again later.");
		}
		setIsSubmitting(false);
	};

	return (
		<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-lg">
				<form
					id="resetForm"
					onSubmit={handleSubmit}
					className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
				>
					<p className="text-center text-lg font-medium">Reset Password</p>

					<div>
						<label htmlFor="newPassword" className="sr-only">
							Password
						</label>

						<div className="relative">
							<input
								id="newPassword"
								type="password"
								className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
								placeholder="New password"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								onInput={checkPasswordMatch}
							/>
							<span className="absolute inset-y-0 end-0 grid place-content-center px-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="size-4 text-gray-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									/>
								</svg>
							</span>
						</div>
					</div>
					<div>
						<label htmlFor="confirmPassword" className="sr-only">
							Confirm New Password
						</label>

						<div className="relative">
							<input
								id="confirmPassword"
								type="password"
								className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
								placeholder="Confirm password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								onInput={checkPasswordMatch}
							/>
							<span className="absolute inset-y-0 end-0 grid place-content-center px-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="size-4 text-gray-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									/>
								</svg>
							</span>
						</div>
					</div>

					{errorMessage && (
						<p id="errorMessage" className="text-red-500 text-sm">
							{errorMessage}
						</p>
					)}

					{successMessage && (
						<p id="successMessage" className="text-green-500 text-sm">
							{successMessage}
						</p>
					)}

					<button
						id="resetButton"
						type="submit"
						className="block w-full rounded-lg px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
						disabled={!checkPasswordMatch() || isSubmitting}
						style={{
							background:
								"linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))",
						}}
					>
						{isSubmitting ? "Submitting..." : "Reset Password"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default ResetPassword;
