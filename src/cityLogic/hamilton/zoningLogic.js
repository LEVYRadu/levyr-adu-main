// src/cityLogic/hamilton/zoningLogic.js

// Real zoning rules for ADU logic
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

// Interpret zoning code like "E-3" → "E"
function interpretZoningCode(code) {
  if (!code) return { isADUPermitted: false, notes: ["No zoning data available."] };
  const baseCode = code.split("-")[0].trim();
  return zoningRules[baseCode] || { isADUPermitted: false, notes: [`Unknown zone code: ${code}`] };
}

// Query Hamilton GIS zoning layer
async function fetchZoningFromHamilton(coordinates) {
  const { lat, lng } = coordinates;
  const url = `https://map.hamilton.ca/arcgis/rest/services/OpenData/Zoning/MapServer/0/query?f=json&geometry=${lng},${lat}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=ZONE`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const zoneCode = data.features?.[0]?.attributes?.ZONE || null;
    return zoneCode;
  } catch (error) {
    console.error("Failed to fetch zoning from Hamilton GIS:", error);
    return null;
  }
}

// Main function to export
export default async function zoningLogic(coordinates) {
  const zoneCode = await fetchZoningFromHamilton(coordinates);
  const rule = interpretZoningCode(zoneCode);

  return {
    isADUPermitted: rule.aduPermitted,
    zoneCode: zoneCode || "Unknown",
    notes: rule.notes,
  };
}
