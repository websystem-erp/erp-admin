import React from "react";
import CreateEventForm from "./CreateEventForm";

const EventManagement = () => {
	return (
		<>
			<div className="">
				<h2 className="font-bold text-4xl">Event Management</h2>
				<div className="my-4">
					<h4 className="font-bold text-2xl">Current Event</h4>
					<p className="text-sm my-8">No Event Available</p>
					<div className="my-4">
						<button className="px-4 py-2 border-sky-600 border-2 rounded-lg bg-white mr-4">
							View All Event
						</button>
						<button className="bg-linear-blue px-4 py-2 rounded-lg w-full md:w-fit ml-4">
							Create New Event
						</button>
					</div>
				</div>
				<div className="absolute w-full top-0 left-0 bg-gray-500 h-screen flex justify-center items-center">
					<div className="w-fit">
						<CreateEventForm />
					</div>
				</div>
			</div>
		</>
	);
};

export default EventManagement;
