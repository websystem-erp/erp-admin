import React from "react";
// import NavItems from "./NavItems";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
	return (
		<>
			<nav className=" bg-linear-black text-white rounded-3xl p-4 h-screen fixed">
				<div className="text-white my-8 text-center">
					<h1 className="text-2xl font-extrabold">LOGO</h1>
				</div>
				<ul className="text-white">
					<li className="navlinks rounded-full ">
						<NavLink
							to={"/"}
							className="flex justify-start items-center p-4 w-full nav-links"
						>
							<Icon icon="ic:round-dashboard" height={24} />
							<p className="text-left px-4 w-full text-lg font-semibold">
								Dashboard
							</p>
						</NavLink>
					</li>
					<li className="navlinks rounded-full ">
						<NavLink
							to={"/Employees"}
							className="flex justify-start items-center p-4 w-full"
						>
							<Icon icon="clarity:employee-group-solid" height={24} />
							<p className="text-left px-4 w-full text-lg font-semibold">
								Employees
							</p>
						</NavLink>
					</li>
					<li className="navlinks rounded-full ">
						<NavLink
							to={"/Students"}
							className="flex justify-start items-center p-4 w-full"
						>
							<Icon icon="solar:square-academic-cap-bold" height={24} />
							<p className="text-left px-4 w-full text-lg font-semibold">
								Students
							</p>
						</NavLink>
					</li>
					<li className="navlinks rounded-full ">
						<NavLink
							to={"/Finance"}
							className="flex justify-start items-center p-4 w-full"
						>
							<Icon icon="material-symbols:finance-mode-rounded" height={24} />
							<p className="text-left px-4 w-full text-lg font-semibold">
								Finance
							</p>
						</NavLink>
					</li>
					<li className="navlinks rounded-full ">
						<NavLink
							to={"/Department"}
							className="flex justify-start items-center p-4 w-full"
						>
							<Icon icon="mingcute:department-fill" height={24} />
							<p className="text-left px-4 w-full text-lg font-semibold">
								Department
							</p>
						</NavLink>
					</li>
					<li className="navlinks rounded-full ">
						<NavLink
							to={"/Attendance"}
							className="flex justify-start items-center p-4 w-full"
						>
							<Icon icon="fluent:task-list-square-add-24-filled" height={24} />
							<p className="text-left px-4 w-full text-lg font-semibold">
								Attendance
							</p>
						</NavLink>
					</li>
					<li className="navlinks rounded-full ">
						<NavLink
							to={"/Event"}
							className="flex justify-start items-center p-4 w-full"
						>
							<Icon icon="material-symbols:event" height={24} />
							<p className="text-left px-4 w-full text-lg font-semibold">
								Event Management
							</p>
						</NavLink>
					</li>
				</ul>
			</nav>
		</>
	);
};

export default Navigation;
