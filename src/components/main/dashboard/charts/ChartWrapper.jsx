import React from "react";
import { Icon } from "@iconify/react";

const ChartWrapper = ({ chartType, title, desc, icon, update }) => {
	return (
		<>
			<div className="box-shadow bg-white lg:w-[360px] w-full h-auto relative rounded-2xl mx-4 my-8">
				{chartType}
				<div className="lg:pt-[160px] md:pt-[250px] pt-[160px] text-neutral-500 text-xs">
					<div className="px-4">
						<p className="font-bold text-lg text-black ">{title}</p>
						<p>{desc}</p>
					</div>
					<hr className="custom-border" />
					<span className="flex w-full justify-end items-center px-4 pb-4">
						<span>
							<Icon icon={icon} height={18} />
						</span>
						<p className="mx-2">{update}</p>
					</span>
				</div>
			</div>
		</>
	);
};

export default ChartWrapper;
