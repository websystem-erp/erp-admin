import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import NavItems from "./NavItems";

const Navigation = ({ isSidebarExpanded, toggleSidebar }) => {
	useEffect(() => {
		window.localStorage.setItem(
			"isSidebarExpanded",
			JSON.stringify(isSidebarExpanded)
		);
	}, [isSidebarExpanded]);

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

						<span
							className={`ml-2 duration-100 ease-in-out ${
								isSidebarExpanded ? "opacity-100" : "opacity-0"
							}`}
						>
							LOGO
						</span>
					</button>
				</div>
			</div>
			<nav className="p-4 space-y-2 font-medium">
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
				<div className="mt-auto ">
					<NavItems
						to="/Support"
						icon="material-symbols:support-agent-rounded"
						title="Support"
						isSidebarExpanded={isSidebarExpanded}
					/>
				</div>
			</nav>
		</aside>
	);
};

export default Navigation;
