import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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
    <div className="bg-white p-8 rounded-xl shadow-md w-1/3 mt-20">
      {/* <h2 className="text-xl font-semibold mb-4">Registration Form</h2> */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label
            htmlFor="name"
            className="block font-semibold mb-2 text-zinc-900"
          >
            NAME:
          </Label>
          <Input
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
          <Label
            htmlFor="phoneNumber"
            className="block mb-2 font-semibold text-zinc-900"
          >
            PHONE NUMBER:
          </Label>
          <Input
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
          <Label
            htmlFor="occupation"
            className="block mb-2 font-semibold text-zinc-900"
          >
            Are you:
          </Label>
          <Select>
            <SelectTrigger className="rounded-md text-black">
              <SelectValue placeholder="Select one" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="bg-white" value="iti">
                ITI Student
              </SelectItem>
              <SelectItem value="diploma">Diploma Student</SelectItem>
              <SelectItem value="btech">B.Tech / B.E. Student</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-center">
          <Button
            type="submit"
            variant="outline"
            className="bg-blue-500 font-bold px-4 py-2 rounded transition duration-300 mt-2"
          >
            REGISTER
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
