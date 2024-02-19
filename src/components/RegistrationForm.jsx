import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    occupation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to server
    console.log(formData);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md max-w-md mx-auto mt-20">
      {/* <h2 className="text-xl font-semibold mb-4">Registration Form</h2> */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block font-semibold mb-2 text-zinc-900"
          >
            NAME:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block mb-2 font-semibold text-zinc-900"
          >
            PHONE NUMBER:
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="occupation"
            className="block mb-2 font-semibold text-zinc-900"
          >
            WHAT ARE YOU ?
          </label>
          <select
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          >
            <option value="">Select One</option>
            <option value="student">Student</option>
            <option value="professional">Working Professional</option>
          </select>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#f8c35c] text-white font-bold px-4 py-2 rounded hover:bg-yellow-600 transition duration-300 mt-2"
          >
            REGISTER
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
