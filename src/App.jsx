import React, { useState } from 'react';
import { cityRouter } from './cityLogic/cityRouter';
import { db } from './firebase';


export default function App() {
  const [address, setAddress] = useState('');
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
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
        zoning: result.zoning,
        aduAllowed: result.aduAllowed,
        utilities: result.utilities,
        zoningNotes: result.zoningNotes,
      };
      
      setReport(reportData);

      // Save report to Firebase
      await firebase.firestore().collection('reports').add(reportData);
      
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
      <button onClick={generateReport}>Generate Report</button>
      
      {error && <p className="error">{error}</p>}
      
      {report && (
        <div className="report">
          <h2>Report for: {report.address}</h2>
          <p><strong>Zoning:</strong> {report.zoning}</p>
          <p><strong>ADU Allowed:</strong> {report.aduAllowed ? 'Yes' : 'No'}</p>
          <p><strong>Utilities:</strong> {report.utilities}</p>
          <p><strong>Zoning Notes:</strong> {report.zoningNotes}</p>
        </div>
      )}
    </div>
  );
}
