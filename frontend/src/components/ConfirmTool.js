//Confirm Tool Component

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Popup from "./Popup"; 
import Spinner from "./Spinner"; 

const ConfirmTool = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData } = location.state || {};
  const [email, setEmail] = useState("");
  const [popup, setPopup] = useState({
    isVisible: false,
    message: "",
    isError: false,
  });
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  if (!formData) {
    return <div>No data to confirm. Please go back and fill the form.</div>;
  }

  // Validate email format
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return regex.test(email);
  };

  // Handle form submission to add the software to the database
  const handleAddTool = async () => {

    setEmailError("");

    // Validate email
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return; 
    }

    try {
      setIsLoading(true); // Start loading spinner

      // Send the software data along with the email
      await axios.post("http://localhost:5000/tools/tool-add", {
        ...formData,
        userEmail: email,
      });

      // success popup
      setPopup({
        isVisible: true,
        message: "AI Planning Software added successfully!",
        isError: false,
      });
    } catch (error) {
      // error popup
      setPopup({
        isVisible: true,
        message: "Failed to add AI Planning Software. Please try again.",
        isError: true,
      });
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  const handleClosePopup = () => {
    setPopup({ isVisible: false, message: "", isError: false });
    navigate("/"); // Redirect to the home page on close
  };

  return (
    <div className="p-6" style={{ minHeight: "80vh" }}>
      <h2 className="text-2xl font-bold mb-4">Confirm AI Planning Software Details</h2>

      {/* Software Details Table */}
      <table className="min-w-full border-collapse border border-gray-300 mb-4">
        <tbody>
          {Object.keys(formData).map((key, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td
                className="p-2 font-semibold bg-gray-100"
                style={{ width: "20%" }}
              >
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                :
              </td>
              <td className="p-2" style={{ width: "80%" }}>
                {formData[key] || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Email Input Field */}
      <div className="mb-4">
        <label htmlFor="email" className="block mb-1">
          Your Contact Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={`w-full border rounded px-3 py-2 ${
            emailError ? "border-red-500" : "border-gray-300"
          }`}
        />
        {emailError && <div className="text-red-500 text-sm">{emailError}</div>}
      </div>

      {/* Edit and Submit Button */}
      <div className="flex">
        <button
          onClick={() => navigate("/add-tool", { state: { formData: formData || {} } })}
          className="px-4 py-2 btn-primary rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={handleAddTool}
          className="px-4 py-2 btn-primary rounded"
          disabled={isLoading} // Disable submit button while loading
        >
          Submit
        </button>
      </div>

      { }
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <Spinner />
        </div>
      )}

      {popup.isVisible && (
        <Popup
          message={popup.message}
          isError={popup.isError}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default ConfirmTool;
