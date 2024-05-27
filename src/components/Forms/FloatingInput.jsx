const FloatingInput = ({
	type,
	id,
	formTitle,
	value,
	handleChange,
	formName,
	xtraClass,
}) => {
	return (
		<div>
			<div className={`relative mt-2 w-full ${xtraClass}`}>
				<input
					type={type}
					id={id}
					name={formName}
					value={value}
					onChange={handleChange}
					className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
					placeholder=" "
				/>
				<label
					htmlFor={id}
					className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
				>
					{formTitle}
				</label>
			</div>
		</div>
	);
};

export default FloatingInput;
