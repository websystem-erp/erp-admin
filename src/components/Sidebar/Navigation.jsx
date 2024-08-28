import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import NavItems from "./NavItems";
import API_ENDPOINTS from "../../API/apiEndpoints";

const Navigation = ({ isSidebarExpanded, toggleSidebar }) => {
	const [schoolName, setSchoolName] = useState("");
	const [campusLogo, setCampusLogo] = useState("");

	useEffect(() => {
		// Fetch userData from localStorage
		const storedUserData = window.localStorage.getItem("userData");
		if (storedUserData) {
			const userData = JSON.parse(storedUserData);
			setSchoolName(userData.schoolName);

			// Fetch campus details by campusId
			const campusId = userData.campusId;
			if (campusId) {
				const url = API_ENDPOINTS.FECTH_CAMPUS_BY_ID(campusId);
				console.log("Fetching from URL:", url); // Log the URL to verify it
				fetch(url)
					.then((response) => {
						if (!response.ok) {
							throw new Error(
								`Failed to fetch campus details: ${response.statusText}`
							);
						}
						return response.json();
					})
					.then((data) => {
						console.log("Fetched Campus Data:", data);
						if (
							data &&
							data.data &&
							data.data.logo &&
							data.data.logo !== "String"
						) {
							setCampusLogo(data.data.logo);
						} else {
							console.error("Invalid logo URL:", data.data.logo);
						}
					})
					.catch((error) => {
						console.error("Error fetching campus details:", error);
					});
			}
		}

		// Save sidebar state to localStorage
		window.localStorage.setItem(
			"isSidebarExpanded",
			JSON.stringify(isSidebarExpanded)
		);
	}, [isSidebarExpanded]);

	useEffect(() => {
		// Log the current state of campusLogo
		console.log("Campus Logo URL:", campusLogo);
	}, [campusLogo]);

	return (
		<aside
			className={`fixed top-0 left-0 h-full text-gray-300 bg-linear-black transition-transform duration-200 ease-in-out overflow-hidden z-50 ${
				isSidebarExpanded
					? "translate-x-0"
					: "-translate-x-full sm:translate-x-0"
			} ${isSidebarExpanded ? "w-64" : "w-20"} w-20`}
		>
			<div className="border-b border-gray-700 p-4 font-medium">
				<div className="flex items-center h-10 px-3 text-white hover:bg-blue-600 hover:bg-opacity-25 rounded-lg transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline">
					<button
						className="flex items-center h-full w-full"
						onClick={toggleSidebar}
					>
						{isSidebarExpanded ? (
							<Icon
								icon="mdi:hamburger-open"
								className="h-6 w-6 flex-shrink-0"
							/>
						) : (
							<Icon
								icon="mdi:hamburger-close"
								className="h-6 w-6 flex-shrink-0"
							/>
						)}

						<div
							className={`ml-2 duration-100 ease-in-out flex items-center ${
								isSidebarExpanded ? "opacity-100" : "opacity-0"
							}`}
						>
							{campusLogo ? (
								<img
									src={campusLogo}
									alt="Campus Logo"
									className="h-8 w-8 mr-2 rounded-full"
									onError={(e) => {
										e.target.onerror = null;
										e.target.src = "fallback-image-url"; // Use a fallback image URL or icon
									}}
								/>
							) : (
								<Icon
									icon="mdi:school-outline"
									className="h-8 w-8 mr-2 text-gray-400"
								/>
							)}
							<span>{schoolName}</span>
						</div>
					</button>
				</div>
			</div>
			<nav className="p-4 space-y-2 font-medium h-full flex flex-col">
				<NavItems
					to="/"
					icon="ic:round-dashboard"
					title="Dashboard"
					isSidebarExpanded={isSidebarExpanded}
				/>
				<NavItems
					to="/Employees"
					icon="clarity:employee-group-solid"
					title="Employees"
					isSidebarExpanded={isSidebarExpanded}
				/>
				<NavItems
					to="/Students"
					icon="solar:square-academic-cap-bold"
					title="Students"
					isSidebarExpanded={isSidebarExpanded}
				/>
				<NavItems
					to="/Finance"
					icon="material-symbols:finance-mode-rounded"
					title="Finance"
					isSidebarExpanded={isSidebarExpanded}
				/>
				<NavItems
					to="/Department"
					icon="mingcute:department-fill"
					title="Department"
					isSidebarExpanded={isSidebarExpanded}
				/>
				<NavItems
					to="/Attendance"
					icon="fluent:task-list-square-add-24-filled"
					title="Attendance"
					isSidebarExpanded={isSidebarExpanded}
				/>
				<NavItems
					to="/Event"
					icon="material-symbols:event"
					title="Event Management"
					isSidebarExpanded={isSidebarExpanded}
				/>
				<NavItems
					to="/Support"
					icon="material-symbols:support-agent-rounded"
					title="Support"
					isSidebarExpanded={isSidebarExpanded}
				/>
			</nav>
		</aside>
	);
};

export default Navigation;
