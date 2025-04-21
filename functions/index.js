const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const formData = require('form-data');
const Mailgun = require('mailgun.js');

admin.initializeApp();

// Initialize Mailgun
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: 'YOUR_MAILGUN_API_KEY', // 🔐 Replace with your actual Mailgun API key
});

// Firebase function to send email report
exports.sendEmailReport = functions.https.onCall(async (data, context) => {
  const { to, subject, html } = data;

  try {
    const result = await mg.messages.create('YOUR_DOMAIN_NAME', {
      from: 'LEVYR <hello@YOUR_DOMAIN_NAME>',
      to,
      subject,
      html,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new functions.https.HttpsError('internal', 'Email failed to send');
  }
});

// Firebase function to fetch building data from OSM using Overpass API
exports.fetchBuildingData = functions.https.onCall(async (data, context) => {
  const { lat, lng } = data;  // Coordinates for the building search

  const query = `
    [out:json];
    (
      way["building"](around:1000, ${lat}, ${lng}); // Get buildings within 1km radius
      node["building"](around:1000, ${lat}, ${lng});
    );
    out body;
  `;

  try {
    // Query Overpass API for building data
    const response = await axios.post('https://overpass-api.de/api/interpreter', query);
    const buildingData = response.data;

    // Return the building data
    return { buildings: buildingData.elements };
  } catch (error) {
    console.error('Error fetching data from Overpass API:', error);
    throw new functions.https.HttpsError('internal', 'Error fetching building data');
  }
});
