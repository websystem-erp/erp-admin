import React from "react";
import { Icon } from "@iconify/react";
import ProfileDropDown from "./ProfileDropDown";

const Navbar = ({ logout, userData }) => {
	return (
		<section className="flex items-center justify-between mt-0 mb-4 mx-0 p-2 glassmorphism w-full ">
			<div className="bg-white p-2 rounded-full block lg:hidden">
				<Icon icon="ep:menu" height={24} />
			</div>

			<div className="flex items-center w-full justify-end">
				<div className="flex border-gray-400 border-e me-2">
					<div className="rounded-full border bg-white p-2 h-10 w-10 mx-1">
						<Icon icon="zondicons:notification" height={24} />
					</div>
				</div>
				<div className="flex items-center justify-center">
					<ProfileDropDown logout={logout} userData={userData} />
				</div>
			</div>
		</section>
	);
};

export default Navbar;
