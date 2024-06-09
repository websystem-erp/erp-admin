import React, { useState, useRef, useEffect } from "react";
import API_ENDPOINTS from "../../API/apiEndpoints";
import { Icon } from "@iconify/react";
import ProfileDropDown from "./ProfileDropDown";
import FloatingInput from "../Forms/FloatingInput";
import axios from "axios";

const Navbar = ({ logout, userData }) => {
	const [formData, setFormData] = useState({
		name: "",
		role: "",
		email: "",
		password: "",
		schoolName: "",
	});

	const [isFormVisible, setIsFormVisible] = useState(false);
	const [hasPendingRequests, setHasPendingRequests] = useState(false);
	const [pendingRequests, setPendingRequests] = useState([]);
	const [teacherPhotos, setTeacherPhotos] = useState({});
	const [isNotificationOpen, setIsNotificationOpen] = useState(false);
	const formRef = useRef(null);
	const notificationRef = useRef(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(API_ENDPOINTS.CREATE_ADMIN, formData);
			console.log(response.data);
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	};

	const toggleFormVisibility = () => {
		setIsFormVisible(!isFormVisible);
		if (!isFormVisible) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	};

	const handleClickOutside = (event) => {
		if (
			formRef.current &&
			!formRef.current.contains(event.target) &&
			notificationRef.current &&
			!notificationRef.current.contains(event.target)
		) {
			setIsFormVisible(false);
			setIsNotificationOpen(false);
			document.body.style.overflow = "auto";
		} else if (
			notificationRef.current &&
			!notificationRef.current.contains(event.target)
		) {
			setIsNotificationOpen(false);
		}
	};

	const fetchTeacherPhoto = async (teacherId) => {
		try {
			const response = await axios.get(API_ENDPOINTS.FETCH_TEACHERS(teacherId));
			return response.data.data.photo;
		} catch (error) {
			console.error("Error fetching teacher photo:", error);
			return null;
		}
	};

	const fetchPendingRequests = async () => {
		try {
			const response = await axios.get(API_ENDPOINTS.FETCH_ALL_PENDING_LEAVES);
			const pendingRequests = response.data.leaves || [];

			const teacherPhotosPromises = pendingRequests.map((request) =>
				fetchTeacherPhoto(request.teacherId)
			);

			const photos = await Promise.all(teacherPhotosPromises);
			const teacherPhotosMap = {};
			pendingRequests.forEach((request, index) => {
				teacherPhotosMap[request.teacherId] = photos[index];
			});

			setPendingRequests(pendingRequests);
			setTeacherPhotos(teacherPhotosMap);
			setHasPendingRequests(pendingRequests.length > 0);
		} catch (error) {
			console.error("Error fetching pending requests:", error);
		}
	};

	const toggleNotificationDropdown = () => {
		setIsNotificationOpen(!isNotificationOpen);
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		fetchPendingRequests();
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		if (isFormVisible) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [isFormVisible]);

	return (
		<section className="flex items-center justify-between mt-0 mb-4 mx-0 p-2 glassmorphism w-full relative z-[9999]">
			<div className="bg-white p-2 rounded-full block lg:hidden">
				<Icon icon="ep:menu" height={24} />
			</div>

			<div className="flex items-center w-full justify-end">
				<div className="flex border-gray-400 border-e me-2">
					<button
						ref={notificationRef}
						className="relative rounded-full border bg-white p-2 h-10 w-10 mx-1 cursor-pointer"
						onClick={toggleNotificationDropdown}
					>
						<Icon icon="zondicons:notification" height={24} />
						{hasPendingRequests && (
							<span className="absolute top-0 right-0 inline-block w-2.5 h-2.5 bg-red-600 rounded-full"></span>
						)}
					</button>
					{isNotificationOpen && (
						<div className="absolute right-8 top-12 w-80 cursor-pointer mt-2 bg-white rounded-md shadow-lg z-50">
							<ul className="py-1">
								{pendingRequests.length > 0 ? (
									pendingRequests.map((request, index) => (
										<li
											key={index}
											className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											<div className="flex items-center ">
												{teacherPhotos[request.teacherId] ? (
													<img
														src={teacherPhotos[request.teacherId]}
														alt={request.name}
														className="w-8 h-8 rounded-full mr-2"
													/>
												) : (
													<div className="w-fit rounded-full mr-2 ">
														<img
															src="https://res.cloudinary.com/duyau9qkl/image/upload/v1717910208/images/w7y88n61dxedxzewwzpn.png"
															alt={request.name}
															className="w-8 h-8"
														/>
													</div>
												)}
												<span>
													<h5 className="font-semibold">{request.name}</h5>
													<p>{request.reason}</p>
												</span>
											</div>
										</li>
									))
								) : (
									<li className="px-4 py-2 text-sm text-gray-700">
										No pending requests
									</li>
								)}
							</ul>
						</div>
					)}
				</div>
				<div className="flex items-center justify-center">
					<ProfileDropDown
						logout={logout}
						userData={userData}
						toggleForm={toggleFormVisibility}
					/>
				</div>
			</div>
			{isFormVisible && (
				<div className="absolute glassmorphism-dark w-screen h-screen top-0 right-0 z-[999999999] flex justify-center items-center">
					<div ref={formRef} className="w-fit bg-white p-8 rounded-xl">
						<h3 className="text-center text-4xl mb-12 font-semibold">
							Create user form:
						</h3>
						<form onSubmit={handleSubmit}>
							<FloatingInput
								type="text"
								id="name"
								formTitle="Name"
								value={formData.name}
								handleChange={handleChange}
								formName="name"
								xtraClass="w-fit"
							/>
							<FloatingInput
								type="text"
								id="role"
								formTitle="Role"
								value={formData.role}
								handleChange={handleChange}
								formName="role"
								xtraClass="w-fit"
							/>
							<FloatingInput
								type="email"
								id="email"
								formTitle="Email"
								value={formData.email}
								handleChange={handleChange}
								formName="email"
								xtraClass="w-fit"
							/>
							<FloatingInput
								type="password"
								id="password"
								formTitle="Password"
								value={formData.password}
								handleChange={handleChange}
								formName="password"
								xtraClass="w-fit"
							/>
							<FloatingInput
								type="text"
								id="schoolName"
								formTitle="School Name"
								value={formData.schoolName}
								handleChange={handleChange}
								formName="schoolName"
								xtraClass="w-fit"
							/>
							<button
								type="submit"
								className="mt-4 p-2 bg-blue-500 text-white rounded-lg bg-linear-blue w-full"
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			)}
		</section>
	);
};

export default Navbar;
