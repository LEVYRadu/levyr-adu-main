// src/cityLogic/hamilton.js

export const isAddressInHamilton = (address) => {
  return address.toLowerCase().includes("hamilton");
};

export const getZoningRulesForHamilton = (zoningCode) => {
  const rules = {
    R1: { aduAllowed: true, maxSize: 65 },
    R2: { aduAllowed: true, maxSize: 65 },
    R3: { aduAllowed: true, maxSize: 65 },
    D2: { aduAllowed: true, maxSize: 65 },
    default: { aduAllowed: false, maxSize: 0 },
  };

  return rules[zoningCode] || rules.default;
};

// 🔍 Simulated data fetchers
const simulateZoningLookup = async (address) => {
  // Normally you'd fetch from an API. We'll simulate it:
  if (address.toLowerCase().includes("king william")) return "D2";
  if (address.toLowerCase().includes("main st")) return "R2";
  return "default";
};

const simulateUtilitiesLookup = async () => {
  return "Likely Available";
};

// 🧠 Main Hamilton Logic
export const runFeasibilityAnalysis = async (address) => {
  const zoningCode = await simulateZoningLookup(address);
  const rules = getZoningRulesForHamilton(zoningCode);
  const utilities = await simulateUtilitiesLookup();

  return {
    zoning: zoningCode,
    utilities,
    allowed: rules.aduAllowed,
    maxSize: rules.maxSize,
  };
};
