import React, { useEffect, useRef } from "react";

const Modal = ({ modalOpen, setModalOpen, children }) => {
	const modalRef = useRef(null);

	// Close on click outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				setModalOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [setModalOpen]);

	// Close if the esc key is pressed
	useEffect(() => {
		const handleEscKey = (event) => {
			if (event.keyCode === 27) {
				setModalOpen(false);
			}
		};

		document.addEventListener("keydown", handleEscKey);
		return () => document.removeEventListener("keydown", handleEscKey);
	}, [setModalOpen]);

	if (!modalOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center glassmorphism-dark z-10">
			<div
				ref={modalRef}
				className="w-full max-w-[570px] rounded-[20px] bg-white px-8 py-12 text-center dark:bg-dark-2 md:px-[70px] md:py-[60px]"
			>
				{children}
				<div className="flex justify-end mt-4">
					<button
						onClick={() => setModalOpen(false)}
						className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-700"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
