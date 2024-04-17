import React from "react";
import UserImg from "../../assets/User.png";
import { Icon } from "@iconify/react";

const Navbar = () => {
	return (
		<section className="flex items-center justify-between mt-0 mb-4 mx-0 p-2 glassmorphism w-full ">
			<div className="bg-white p-2 rounded-full block lg:hidden">
				<Icon icon="ep:menu" height={24} />
			</div>

			<div className="flex items-center w-full justify-end">
				<div className="flex w-fit md:w-64 bg-white rounded-full p-2 border">
					<Icon icon="ic:round-search" height={24} />
					<span className="hidden md:block">Search</span>
				</div>
				<div className="flex border-gray-400 border-e me-2">
					<div className="rounded-full border bg-white p-2 h-10 w-10 mx-1">
						<Icon icon="fluent:mail-16-filled" height={24} />
					</div>
					<div className="rounded-full border bg-white p-2 h-10 w-10 mx-1">
						<Icon icon="zondicons:notification" height={24} />
					</div>
				</div>
				<div className="flex items-center justify-center">
					<img
						src={UserImg}
						alt="user Image"
						className="mx-1 hidden md:block"
					/>
					<div className="mx-1">
						<h6>Hello</h6>
						<h2 className="text-[#6E62E5] font-bold">Amit</h2>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Navbar;
