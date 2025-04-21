// src/cityLogic/hamilton.js

const hamiltonLogic = (address) => {
  const lowerAddress = address.toLowerCase();

  // Starter hardcoded zoning logic for testing
  if (lowerAddress.includes("garside")) {
    return {
      city: "Hamilton",
      zoning: "Low Density Residential (R1)",
      utilities: "Likely Available",
      aduAllowed: true,
      notes: "Zoned R1—Permits one Additional Dwelling Unit (ADU) in a detached form with site plan approval.",
    };
  }

  if (lowerAddress.includes("king st e")) {
    return {
      city: "Hamilton",
      zoning: "Mixed Use Medium Density (C5)",
      utilities: "Likely Available",
      aduAllowed: true,
      notes: "Zoned C5—Mixed use designation allows additional residential units. Subject to building code and parking constraints.",
    };
  }

  if (lowerAddress.includes("upper james")) {
    return {
      city: "Hamilton",
      zoning: "Commercial (C6)",
      utilities: "Likely Available",
      aduAllowed: false,
      notes: "Zoned C6—Primary use is commercial. Residential uses may require rezoning or special permissions.",
    };
  }

  // Default response if address not matched
  return {
    city: "Hamilton",
    zoning: "Unknown",
    utilities: "Likely Available",
    aduAllowed: false,
    notes: "Zoning not recognized. Manual review required.",
  };
};

export default hamiltonLogic;
