import React from "react";
import UserImg from "../../assets/User.png";
import { Icon } from "@iconify/react";

const Navbar = () => {
	return (
		<section className="flex items-center justify-between mt-0 mb-4 mx-4 p-4 glassmorphism ">
			<div className="flex w-1/2 bg-white rounded-full px-4 py-3 border">
				<Icon icon="ic:round-search" height={24} />
				Search{" "}
			</div>
			<div className="flex items-center">
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
