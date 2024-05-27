import React, { useState } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../API/apiEndpoints";

const CreateEventForm = ({ onClose, onAddEvent }) => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		date: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.title || !formData.description || !formData.date) {
			alert("Please fill out all fields.");
			return;
		}

		const formattedDate = new Date(formData.date).toISOString();

		try {
			const response = await axios.post(API_ENDPOINTS.CREATE_EVENT, {
				title: formData.title,
				description: formData.description,
				date: formattedDate,
			});
			const newEvent = response.data.data; // Assuming the API response contains the new event data
			onAddEvent(newEvent);
			console.log("Event created successfully:", response.data);
		} catch (error) {
			console.error("Error creating event:", error);
			if (error.response) {
				console.error("Error response data:", error.response.data);
				console.error("Error response status:", error.response.status);
				console.error("Error response headers:", error.response.headers);
			} else if (error.request) {
				console.error("Error request data:", error.request);
			} else {
				console.error("Error message:", error.message);
			}
		}
	};

	return (
		<div className="w-full h-full">
			<form onSubmit={handleSubmit} className="text-black">
				<div className="flex flex-col my-2">
					<label className="text-white">Event Name</label>
					<input
						name="title"
						className="my-2 rounded-lg p-4"
						type="text"
						placeholder="e.g., Annual function, football match"
						value={formData.title}
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col my-2">
					<label className="text-white">Event Date</label>
					<input
						name="date"
						className="my-2 rounded-lg p-4 "
						type="date"
						value={formData.date}
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col my-2">
					<label className="text-white">Event Details</label>
					<textarea
						name="description"
						className="my-2 rounded-lg p-4"
						rows="4"
						cols="50"
						placeholder="Let everyone know why you're collecting money, and what you'll do with it. This is your chance to tell your story."
						value={formData.description}
						onChange={handleChange}
					/>
				</div>
				<div className="flex justify-end items-center">
					<button
						className="px-4 py-2 me-4 text-white border-red-500 border-2 rounded-lg"
						type="button"
						onClick={onClose}
					>
						Cancel
					</button>
					<button
						className="px-4 py-2 ms-4 text-white bg-linear-blue rounded-lg"
						type="submit"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateEventForm;
