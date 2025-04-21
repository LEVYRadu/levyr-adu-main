// cityLogic/hamilton/zoningLogic.js

import axios from "axios";

// Map zoning codes to simplified ADU logic based on parsed PDFs
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
  // Add more as needed based on PDFs
};

function interpretZoningCode(code) {
  if (!code) return { isADUPermitted: false, notes: ["No zoning data available."] };

  const baseCode = code.split("-")[0].trim(); // Handle variants like "E-3" or "D/S-36"
  return zoningRules[baseCode] || { isADUPermitted: false, notes: [`Unknown zone code: ${code}`] };
}

export default async function zoningLogic(coordinates) {
  try {
    const { lat, lon } = coordinates;
    const url = `https://services.arcgis.com/rYz782eMbySr2srL/arcgis/rest/services/Zoning_By_law_Boundary/FeatureServer/1/query?geometry=${lon},${lat}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=ZONE_CODE&returnGeometry=false&f=json`;

    const response = await axios.get(url);
    const features = response.data.features;

    if (!features.length) {
      return { isADUPermitted: false, zoneCode: null, notes: ["Property not in known zoning map."] };
    }

    const zoneCode = features[0].attributes.ZONE_CODE;
    const rule = interpretZoningCode(zoneCode);

    return {
      isADUPermitted: rule.aduPermitted,
      zoneCode,
      notes: rule.notes,
    };
  } catch (error) {
    console.error("Zoning fetch error:", error);
    return {
      isADUPermitted: false,
      zoneCode: null,
      notes: ["Error retrieving zoning info."],
    };
  }
}
