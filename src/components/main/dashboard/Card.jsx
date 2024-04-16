import React from "react";
import { Icon } from "@iconify/react";

const Card = (props) => {
	return (
		<>
			<div className=" bg-white md:w-[200px] w-full h-auto mx-4 my-8 card-shadow">
				<div className="flex justify-end items-center relative">
					<div className="w-1/2  h-full">
						<div
							className={` h-16 w-16 flex items-center justify-center rounded-2xl absolute -top-4 left-4 ${props.iconClass} ${props.iconColor}`}
						>
							<Icon icon={props.icon} height={36} />
						</div>
					</div>
					<div className="w-1/2 p-4">
						<h4 className="card-title font-bold text-2xl text-right">
							{props.number}
						</h4>
					</div>
				</div>
				<div className="border-t-2 py-2">
					<h4 className="card-title text-sm font-bold text-[#7B809A] text-center">
						{props.title}
					</h4>
				</div>
			</div>
		</>
	);
};

export default Card;