// src/App.jsx
import React, { useState } from "react";
import { db } from "./firebase"; // Firebase setup
import { collection, addDoc } from "firebase/firestore"; // Firestore for saving the form

const App = () => {
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address || !email) {
      setError("Please provide both address and email.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Save the homeowner's address and email to Firestore
      await addDoc(collection(db, "homeownerReports"), {
        address,
        email,
        createdAt: new Date(),
      });

      // Here, you can generate the report based on the address (we'll keep it simple for now)
      // Once the report is generated, we can email it (for now, simulate this step)
      console.log("Report generated for:", address, "Email sent to:", email);
      // After report generation, reset form fields
      setAddress("");
      setEmail("");
      alert("Report has been generated and sent to your email!");
    } catch (error) {
      setError("Failed to generate report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>ADU Feasibility Report for Homeowners</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Report"}
        </button>
      </form>
    </div>
  );
};

export default App;
