import React, { useState } from 'react';
import { cityRouter } from './cityLogic/cityRouter';
import { db } from './firebase';
import { addDoc, collection } from 'firebase/firestore'; // ✅ Correct import

export default function App() {
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState(''); // ✅ New email state
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const generateReport = async () => {
    try {
      setError('');
      const cityHandler = cityRouter(address);

      if (!cityHandler) {
        setError('City not supported.');
        return;
      }

      const result = await cityHandler(address);
      const reportData = {
        address,
        email, // ✅ Save email to Firestore
        zoning: result.zoning,
        aduAllowed: result.aduAllowed,
        utilities: result.utilities,
        zoningNotes: result.zoningNotes,
        timestamp: new Date().toISOString(),
      };

      setReport(reportData);

      // ✅ Save to Firestore using modular SDK
      await addDoc(collection(db, 'reports'), reportData);

      console.log('Report saved to Firebase');
    } catch (err) {
      console.error('Error generating report:', err);
      setError('Failed to generate report');
    }
  };

  return (
    <div className="App">
      <h1>LEVYR ADU Report Generator</h1>
      
      <input
        type="text"
        value={address}
        onChange={handleAddressChange}
        placeholder="Enter property address"
      />
      <br />
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter your email"
      />
      <br />
      <button onClick={generateReport}>Generate Report</button>

      {error && <p className="error">{error}</p>}

      {report && (
        <div className="report">
          <h2>Report for: {report.address}</h2>
          <p><strong>Email:</strong> {report.email}</p>
          <p><strong>Zoning:</strong> {report.zoning}</p>
          <p><strong>ADU Allowed:</strong> {report.aduAllowed ? 'Yes' : 'No'}</p>
          <p><strong>Utilities:</strong> {report.utilities}</p>
          <p><strong>Zoning Notes:</strong> {report.zoningNotes}</p>
        </div>
      )}
    </div>
  );
}
