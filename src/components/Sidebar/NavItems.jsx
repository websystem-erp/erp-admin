import React from "react";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

const NavItems = ({ navIcon, navTitle }) => {
	return (
		<li className="navlinks rounded-full ">
			<NavLink
				to={navTitle}
				className="flex justify-start items-center p-4 w-full"
			>
				<Icon icon={navIcon} height={24} />
				<p className="text-left px-4 w-full text-lg font-semibold">
					{navTitle}
				</p>
			</NavLink>
		</li>
	);
};

export default NavItems;
