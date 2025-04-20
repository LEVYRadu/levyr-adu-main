// src/cityLogic/toronto.js

export const isAddressInToronto = (address) => {
  return (
    address.toLowerCase().includes("toronto") ||
    address.toLowerCase().includes("etobicoke") ||
    address.toLowerCase().includes("scarborough") ||
    address.toLowerCase().includes("north york") ||
    address.toLowerCase().includes("east york") ||
    address.toLowerCase().includes("york, on")
  );
};

export const getZoningRulesForToronto = (zoningCode) => {
  const rules = {
    RD: { aduAllowed: true, maxSize: 645 }, // ~645 sqft
    R: { aduAllowed: true, maxSize: 645 },
    RM: { aduAllowed: true, maxSize: 645 },
    RA: { aduAllowed: false, maxSize: 0 },
    default: { aduAllowed: false, maxSize: 0 },
  };

  return rules[zoningCode] || rules.default;
};

// 🔍 Simulated data fetchers
const simulateZoningLookup = async (address) => {
  if (address.toLowerCase().includes("dundas")) return "RD";
  if (address.toLowerCase().includes("queen st")) return "R";
  return "default";
};

const simulateUtilitiesLookup = async () => {
  return "Likely Available";
};

// 🧠 Main Toronto Logic
export const runFeasibilityAnalysis = async (address) => {
  const zoningCode = await simulateZoningLookup(address);
  const rules = getZoningRulesForToronto(zoningCode);
  const utilities = await simulateUtilitiesLookup();

  return {
    zoning: zoningCode,
    utilities,
    allowed: rules.aduAllowed,
    maxSize: rules.maxSize,
  };
};
