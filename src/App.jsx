import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { getCityLogic } from "./cityLogic/cityRouter";

const App = () => {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState(null);

  const handleRunReport = async () => {
    const logic = getCityLogic(address);
    if (!logic) {
      alert("❌ This address is not yet supported.");
      return;
    }

    try {
      const data = await logic.runFeasibilityAnalysis(address);
      setResult(data);
      await addDoc(collection(db, "reports"), {
        address,
        timestamp: new Date().toISOString(),
        ...data,
      });
      alert("✅ Report submitted to Firestore!");
    } catch (error) {
      console.error("Error generating report:", error);
      alert("❌ Failed to generate report.");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>LEVYR ADU Feasibility</h1>
      <input
        type="text"
        placeholder="Enter address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ padding: "0.5rem", width: "100%", marginBottom: "1rem" }}
      />
      <button onClick={handleRunReport} style={{ padding: "0.5rem 1rem" }}>
        Run Report
      </button>

      {result && (
        <div style={{ marginTop: "2rem", background: "#f9f9f9", padding: "1rem" }}>
          <h2>Feasibility Summary</h2>
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Zoning:</strong> {result.zoning}</p>
          <p><strong>Utilities:</strong> {result.utilities}</p>
          <p><strong>ADU Allowed:</strong> {result.allowed ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
};

export default App;
