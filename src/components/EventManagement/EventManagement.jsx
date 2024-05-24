import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateEventForm from "./CreateEventForm";

const EventManagement = () => {
	const [showCreateEventForm, setShowCreateEventForm] = useState(false);
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await axios.get(
					"https://erp-system-backend.onrender.com/api/v1/event/fetchAll"
				);
				const sortedEvents = response.data.data.sort(
					(a, b) => new Date(b.created_at) - new Date(a.created_at)
				);
				setEvents(sortedEvents);
			} catch (error) {
				console.error("Error fetching events:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchEvents();
	}, []);

	const handleCreateEventClick = (event) => {
		event.preventDefault();
		setShowCreateEventForm(true);
	};

	const handleCloseForm = () => {
		setShowCreateEventForm(false);
	};

	const handleAddEvent = (newEvent) => {
		setEvents((prevEvents) => [newEvent, ...prevEvents]);
		setShowCreateEventForm(false);
	};

	const handleDeleteEvent = async (eventId) => {
		try {
			await axios.delete(
				`https://erp-system-backend.onrender.com/api/v1/event/delete-event/${eventId}`
			);
			const updatedEvents = events.filter((event) => event.id !== eventId);
			setEvents(updatedEvents);
			console.log("Event deleted successfully.");
		} catch (error) {
			console.error("Error deleting event:", error);
		}
	};

	return (
		<>
			<div>
				<h2 className="font-bold text-4xl">Event Management</h2>
				<div className="my-4">
					<div className="flex justify-between items-center pe-8">
						<h4 className="font-bold text-2xl">Current Events</h4>
						<div className="my-4">
							<button className="px-4 py-2 border-sky-600 border-2 rounded-lg bg-white mr-4">
								View All Event
							</button>
							<button
								className="bg-linear-blue px-4 py-2 rounded-lg w-full md:w-fit ml-4"
								onClick={handleCreateEventClick}
							>
								Create New Event
							</button>
						</div>
					</div>
					{loading ? (
						<p className="text-sm my-8">Loading...</p>
					) : events.length > 0 ? (
						<ul className="text-sm my-8">
							{events.map((event) => (
								<li key={event.id} className="my-2">
									<div className="px-4 py-4 bg-linear-blue w-fit rounded-lg mb-4">
										<div className="flex justify-center items-center gap-16">
											<div>
												<h5 className="font-bold">{event.title}</h5>
												<p>{event.description}</p>
												<p>{new Date(event.date).toLocaleDateString()}</p>
												<p>{new Date(event.created_at).toLocaleDateString()}</p>
											</div>
											<button
												onClick={() => handleDeleteEvent(event.id)}
												className="text-sm text-white transition duration-150 hover:bg-indigo-500 font-semibold py-2 px-4 h-fit bg-linear-red rounded"
											>
												Delete
											</button>
										</div>
									</div>
								</li>
							))}
						</ul>
					) : (
						<p className="text-sm my-8">No Event Available</p>
					)}
				</div>

				<div
					className={`absolute top-0 left-0 glassmorphism-dark  h-screen w-full ${
						showCreateEventForm ? "block" : "hidden"
					} `}
				>
					<div className="flex justify-center items-center w-full h-screen ">
						<div className="w-fit bg-linear-black p-8 rounded-xl">
							<CreateEventForm
								onClose={handleCloseForm}
								onAddEvent={handleAddEvent}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default EventManagement;
