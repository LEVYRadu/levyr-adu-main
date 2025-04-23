// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

// 🔐 Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDxz1TvNfnbj6Q02Dos9lU9-pIPdcR3zy4",
  authDomain: "levyr-e699f.firebaseapp.com",
  projectId: "levyr-e699f",
  storageBucket: "levyr-e699f.appspot.com",
  messagingSenderId: "40694340915",
  appId: "1:40694340915:web:eff11c44fc9b8cf4b37246",
  measurementId: "G-XH9561DF5E"
};

// ✅ Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✨ Export Firestore instance
export { db };

// Updated zoning data with correct Hamilton zones
const zoningData = {
  R1: {
    aduPermitted: true,
    type: 'detached',
    maxGrossFloorAreaSqm: 75,
    maxHeightMeters: 6,
    minSetbackRearMeters: 1.2,
    minSetbackSideMeters: 1.2,
    minSetbackFromMainBuildingMeters: 7.5,
    maxLotCoveragePercent: 40,
    location: 'rear or interior side yard only',
    notes: 'Detached ADUs permitted, must meet setback and height requirements.'
  },
  R1a: {
    aduPermitted: true,
    type: 'detached',
    maxGrossFloorAreaSqm: 85,
    maxHeightMeters: 6.5,
    minSetbackRearMeters: 1.2,
    minSetbackSideMeters: 1.5,
    minSetbackFromMainBuildingMeters: 7.5,
    maxLotCoveragePercent: 45,
    location: 'rear or interior side yard only',
    notes: 'Similar to R1 but allows higher density and smaller lot sizes.'
  },
  R2: {
    aduPermitted: true,
    type: 'detached',
    maxGrossFloorAreaSqm: 80,
    maxHeightMeters: 7,
    minSetbackRearMeters: 1.2,
    minSetbackSideMeters: 1.2,
    minSetbackFromMainBuildingMeters: 7.5,
    maxLotCoveragePercent: 45,
    location: 'rear or interior side yard only',
    notes: 'Semi-detached or duplex structures; ADUs must meet specific setback rules.'
  },
  R3: {
    aduPermitted: true,
    type: 'detached',
    maxGrossFloorAreaSqm: 85,
    maxHeightMeters: 7,
    minSetbackRearMeters: 1.5,
    minSetbackSideMeters: 1.5,
    minSetbackFromMainBuildingMeters: 8,
    maxLotCoveragePercent: 50,
    location: 'rear or interior side yard only',
    notes: 'Multi-unit properties with stricter limits for ADUs.'
  },
  R4: {
    aduPermitted: true,
    type: 'detached',
    maxGrossFloorAreaSqm: 100,
    maxHeightMeters: 8,
    minSetbackRearMeters: 2,
    minSetbackSideMeters: 2,
    minSetbackFromMainBuildingMeters: 8,
    maxLotCoveragePercent: 55,
    location: 'rear or interior side yard only',
    notes: 'Medium-density residential areas, ADUs are larger with flexible rules.'
  },
  RM1: {
    aduPermitted: true,
    type: 'detached',
    maxGrossFloorAreaSqm: 100,
    maxHeightMeters: 9,
    minSetbackRearMeters: 2,
    minSetbackSideMeters: 2,
    minSetbackFromMainBuildingMeters: 8,
    maxLotCoveragePercent: 60,
    location: 'rear or interior side yard only',
    notes: 'Multiple residential, medium density. Suitable for row houses, townhouses, and smaller apartment buildings.'
  },
  RM2: {
    aduPermitted: true,
    type: 'detached',
    maxGrossFloorAreaSqm: 120,
    maxHeightMeters: 10,
    minSetbackRearMeters: 2,
    minSetbackSideMeters: 2,
    minSetbackFromMainBuildingMeters: 8,
    maxLotCoveragePercent: 65,
    location: 'rear or interior side yard only',
    notes: 'High-density residential areas; larger ADUs with fewer restrictions.'
  },
  // Add more zones as needed
};

// Function to upload zoning data to Firestore
const uploadZoningData = async () => {
  try {
    // Reference to the "zoningRules" collection and "hamilton" document
    const zoningRef = doc(collection(db, "zoningRules"), "hamilton");

    // Upload the zoning data
    await setDoc(zoningRef, zoningData);

    console.log("Zoning data uploaded successfully!");
  } catch (error) {
    console.error("Error uploading zoning data:", error);
  }
};

// Call the function to upload zoning data
uploadZoningData();
