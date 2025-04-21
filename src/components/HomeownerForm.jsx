// src/HomeownerForm.jsx
import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import cityRouter from "./cityLogic/cityRouter";

export default function HomeownerForm() {
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const city = cityRouter(address);
      if (!city) {
        setStatus("error");
        setErrorMessage("Sorry, this city is not supported yet.");
        return;
      }

      const logic = await city(address);
      const reportData = {
        address,
        email,
        result: logic,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "homeownerReports"), reportData);
      setStatus("success");
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Get Your ADU Feasibility Report</h1>

      {status === "success" ? (
        <div className="text-green-600 font-medium">
          ✅ Report submitted successfully! Check your email shortly.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Property Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-2 px-4 bg-black text-white rounded hover:bg-gray-800"
          >
            {status === "loading" ? "Submitting..." : "Generate Report"}
          </button>

          {status === "error" && (
            <p className="text-red-600 font-medium">{errorMessage}</p>
          )}
        </form>
      )}
    </div>
  );
}
