// src/cityLogic/hamilton.js

import zoningLogic from "./hamilton/zoningLogic.js";

export default async function hamilton(address) {
  // TEMP: Hardcoded coordinates for 71 Main St W, Hamilton
  const coordinates = {
    lat: 43.2565,
    lng: -79.8729,
  };

  const zoningResult = await zoningLogic(coordinates);

  return {
    zoning: zoningResult.zoneCode,
    aduAllowed: zoningResult.isADUPermitted,
    utilities: "Likely Available", // Temporary placeholder
    zoningNotes: zoningResult.notes,
  };
}
