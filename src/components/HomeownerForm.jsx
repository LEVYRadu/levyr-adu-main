import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const HomeownerForm = () => {
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const checkIfSupportedCity = (address) => {
    return address.toLowerCase().includes('hamilton');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!checkIfSupportedCity(address)) {
      setError('Sorry! We’re not available in that city yet.');
      return;
    }

    try {
      await addDoc(collection(db, 'submissions'), {
        email,
        address,
        createdAt: Timestamp.now(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Error saving to Firestore:', err);
      setError('There was an error. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">Thanks! 🎉</h2>
        <p>You’ll receive your ADU report by email shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto space-y-4 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold text-center">Get Your ADU Report</h2>

      <div>
        <label className="block font-medium">Email Address</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Property Address</label>
        <input
          type="text"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="123 Main St, Hamilton"
          className="w-full p-2 border rounded"
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        Get My ADU Report
      </button>
    </form>
  );
};

export default HomeownerForm;
