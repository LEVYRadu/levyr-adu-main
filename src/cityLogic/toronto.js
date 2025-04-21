import zoningLogic from "./toronto/zoningLogic.js";

// Toronto specific ADU feasibility logic
export default async function toronto(address) {
  // TEMP: Hardcoded coordinates for 100 Queen St W, Toronto
  const coordinates = {
    lat: 43.6532,
    lng: -79.3832,
  };

  const zoningResult = await zoningLogic(coordinates);

  return {
    zoning: zoningResult.zoneCode,
    aduAllowed: zoningResult.isADUPermitted,
    utilities: 'Likely Available', // Temporary placeholder
    zoningNotes: zoningResult.notes,
  };
}
