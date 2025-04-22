import React, { useState } from 'react';
import cityRouter from './cityLogic/cityRouter';
import { db } from './firebase';
import { addDoc, collection } from 'firebase/firestore'; // ✅ Correct import

export default function App() {
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState(''); // ✅ New email state
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);  // New state for success
  const [isError, setIsError] = useState(false);  // New state for error

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const generateReport = async () => {
    try {
      setError('');
      setIsSuccess(false);
      setIsError(false);

      // Determine city based on the address (or pass city manually)
      const city = 'Hamilton';  // Replace with dynamic city detection if needed

      // Log the city and address before calling cityRouter
      console.log('City:', city);
      console.log('Address:', address);

      const result = await cityRouter(city, address); // Pass both city and address

      // Log the result from cityRouter to check the output
      console.log('Result from cityRouter:', result);

      if (result.error) {
        setIsError(true); // City is unsupported or there was an error
        setError(result.error);
        return;
      }

      const reportData = {
        address,
        email, // ✅ Save email to Firestore
        zoning: result.zoning,
        aduAllowed: result.aduAllowed,
        utilities: result.utilities,
        zoningNotes: result.zoningNotes,
        timestamp: new Date().toISOString(),
      };

      // Log the report data to verify its structure
      console.log('Generated report data:', reportData);

      setReport(reportData);
      setIsSuccess(true);  // Set success to true when report is generated

      // ✅ Save to Firestore using modular SDK
      await addDoc(collection(db, 'reports'), reportData);

      console.log('Report saved to Firebase');  // Log confirmation that data is saved

    } catch (err) {
      console.error('Error generating report:', err);
      setIsError(true); // Failed to generate report
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

      {error && isError && (
        <p className="error" style={{ color: 'red' }}>
          ❌ {error}
        </p>
      )}

      {isSuccess && !isError && (
        <p className="success" style={{ color: 'green' }}>
          ✅ Your report is being prepared! Check your email shortly.
        </p>
      )}

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
