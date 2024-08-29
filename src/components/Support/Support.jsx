import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_ENDPOINTS from "../../API/apiEndpoints";

// Define the function to get user ID from localStorage
const getUserIdFromLocalStorage = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return userData && userData.id ? userData.id : null;
};

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    option: "Feedback",
    message: "",
    errorPage: "", // New field for error page selection
  });
  const [photo, setPhoto] = useState(null); // State for the photo file
  const [responseMessage, setResponseMessage] = useState("");
  const [complaintNo, setComplaintNo] = useState("");
  const userId = getUserIdFromLocalStorage();
  const fileInputRef = useRef(null);

  // Fetch user details and autofill form
  useEffect(() => {
    if (userId) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(
            API_ENDPOINTS.FETCH_ADMIN_BY_ID(userId)
          );
          const { name, email } = response.data.data;
          setFormData((prevData) => ({
            ...prevData,
            name: name || "",
            email: email || "",
            phone: "",
          }));
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };
      fetchUserDetails();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = JSON.parse(localStorage.getItem("userData"));

    // Handle the photo upload
    let photoUrl = "";
    if (photo) {
      const formData = new FormData();
      formData.append("file", photo);
      formData.append("cloud_name", "dcpvd9tay"); // Replace with actual Cloudinary info
      formData.append("upload_preset", "pdf_preset");

      try {
        const cloudResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dcpvd9tay/auto/upload",
          formData
        );
        photoUrl = cloudResponse.data.url;
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    }

    const queryData = {
      name: userData.name,
      email: userData.email,
      contactNo: "00000000000",
      type: "admin",
      query: formData.message,
      campusName: userData.school,
      errorpage: formData.errorPage, // Include error page in the payload
      photo: photoUrl, // Include uploaded photo URL
    };

    console.log("Submitting query data:", queryData);

    try {
      const response = await axios.post(
        API_ENDPOINTS.CREATE_SUPPORT,
        queryData
      );
      setResponseMessage(response.data.message);
      setComplaintNo(response.data.queryData?.complaintNo || "N/A");
    } catch (error) {
      console.error("Error sending query:", error);
      setResponseMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="lg:col-span-2 lg:py-12">
		  <h6 className="text-black font-bold text-4xl">Need Assistance?</h6>
						<h6 className="text-black font-bold text-2xl">
							We're Here to Help!
						</h6>
						<p className="max-w-xl text-md my-8">
							If you need assistance with any aspect of our School ERP system,
							we're here to help. Whether you have questions about navigating
							the platform, troubleshooting issues, or providing feedback, our
							support team is ready to assist you.
						</p>
						<p>For immediate assistance, feel free to contact us at:</p>
						<div>
							<Link
								to="tel:7030983208"
								className="text-2xl font-bold text-[#ec407a]"
							>
								+91-7030983208
							</Link>

							<div>
								<Link
									to="mailto:websystemshelpcenter@gmail.com"
									className="mt-2 text-lg text-[#ec407a] font-semibold"
								>
									websystemshelpcenter@gmail.com
								</Link>
							</div>
						</div>
						<p className="max-w-xl text-md mt-8">
							Alternatively, you can use the form on the right to send us your
							queries, feedback, or complaints. Our team will get back to you as
							soon as possible.
						</p>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form className="space-y-4" onSubmit={handleSubmit}>
              

              {/* Error Page Dropdown */}
              <div>
                <label className="block mb-2">Select Error Page</label>
                <select
                  name="errorPage"
                  value={formData.errorPage}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                >
                  <option value="">Select page</option>
				  <option value="dashboard">Dashboard</option>
                  <option value="employees">Employees</option>
                  <option value="students">Students</option>
                  <option value="finance">Finance</option>
                  <option value="department">Department</option>
                  <option value="attendance">Attendance</option>
				  <option value="event-management">Event management</option>
                </select>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block mb-2">Upload Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  ref={fileInputRef}
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                />
              </div>
			  <div>
                <label className="sr-only" htmlFor="message">
                  Message
                </label>
                <textarea
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Message"
                  rows="8"
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                >
                  Send Enquiry
                </button>
              </div>
            </form>
            {responseMessage && (
              <div className="mt-4 text-center">
                <p className="text-green-500">{responseMessage}</p>
                {complaintNo && (
                  <p className="text-green-500">
                    Your {formData.option} number is: {complaintNo}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;
