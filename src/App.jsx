import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { getCityLogic } from "./cityLogic/cityRouter";


const App = () => {
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reportData, setReportData] = useState(null); // New state to store report data

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
      // Determine which city to run logic on
      const city = cityRouter(address);
      if (!city) {
        setError("Sorry, this city is not supported yet.");
        return;
      }

      // Fetch logic for the address (this will be specific to the city)
      const logic = await city(address);
      const report = {
        address,
        email,
        zoning: logic.zoning || "default", // Assuming result from city logic
        utilities: logic.utilities || "Likely Available", // Assuming result from city logic
        aduAllowed: logic.aduAllowed || false, // Assuming result from city logic
        createdAt: new Date(),
      };

      // Save to Firestore
      await addDoc(collection(db, "homeownerReports"), report);

      // Save report data to state for rendering
      setReportData(report);

      // Reset form fields
      setAddress("");
      setEmail("");
    } catch (error) {
      setError("Failed to generate report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>LEVYR ADU Feasibility Report for Homeowners</h1>
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

      {reportData && (
        <div className="mt-6 border p-4 rounded bg-gray-100">
          <h2 className="text-xl font-semibold mb-2">Feasibility Summary</h2>
          <p><strong>Address:</strong> {reportData.address}</p>
          <p><strong>Zoning:</strong> {reportData.zoning}</p>
          <p><strong>Utilities:</strong> {reportData.utilities}</p>
          <p><strong>ADU Allowed:</strong> {reportData.aduAllowed ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
};

export default App;
