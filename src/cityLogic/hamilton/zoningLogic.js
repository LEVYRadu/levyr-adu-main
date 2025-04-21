// Hardcoded zoning rules for testing
const zoningRules = {
  "C": { aduPermitted: true, notes: ["Commercial zone, ADU permitted above or behind existing structure."] },
  "D": { aduPermitted: true, notes: ["Downtown zone, ADU permitted under SDU by-law."] },
  "E": { aduPermitted: true, notes: ["Residential low density, ADU permitted per 22-133."] },
  "ER": { aduPermitted: true, notes: ["Residential estate, ADU conditionally permitted."] },
  "F": { aduPermitted: true, notes: ["Institutional, ADU permitted for caretaker or residential units."] },
  "G": { aduPermitted: false, notes: ["Open space zone, ADU not permitted."] },
  "H": { aduPermitted: false, notes: ["Industrial, ADU not permitted."] },
  "P": { aduPermitted: false, notes: ["Planned development, case-by-case."] },
  "M": { aduPermitted: true, notes: ["Mixed-use zone, ADU permitted above commercial."] },
};

// Function to interpret the zone code and determine if ADU is permitted
function interpretZoningCode(code) {
  if (!code) return { isADUPermitted: false, notes: ["No zoning data available."] };

  const baseCode = code.split("-")[0].trim(); // Handle variants like "E-3" or "D/S-36"
  return zoningRules[baseCode] || { isADUPermitted: false, notes: [`Unknown zone code: ${code}`] };
}

// Replace the API call with hardcoded zone code (for testing)
export default async function zoningLogic(coordinates) {
  // For testing, we use a hardcoded zone code like "C"
  const simulatedZoneCode = "C"; // Example, use any zone code for testing

  // Get zoning details based on the simulated zone code
  const rule = interpretZoningCode(simulatedZoneCode);

  return {
    isADUPermitted: rule.aduPermitted,
    zoneCode: simulatedZoneCode,
    notes: rule.notes,
  };
}
