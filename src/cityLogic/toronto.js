import zoningLogic from "./toronto/zoningLogic.js";
import {
  loadOntarioLayers,
  isInGreenbelt,
  getSoilType,
  getElevation,
} from "./ontarioShared.js";

export default async function toronto(address) {
  // TEMP: Example hardcoded coordinates for Toronto
  const coordinates = {
    lat: 43.651070,
    lng: -79.347015,
  };

  await loadOntarioLayers(); // Load Ontario-wide data

  const zoningResult = await zoningLogic(coordinates);
  const greenbelt = isInGreenbelt(coordinates);
  const soilType = getSoilType(coordinates);
  const elevation = getElevation(coordinates);

  return {
    zoning: zoningResult.zoneCode,
    aduAllowed: zoningResult.isADUPermitted,
    zoningNotes: zoningResult.notes,
    utilities: 'Likely Available', // Placeholder for now
    soil: soilType,
    elevation: elevation,
    greenbeltProtected: greenbelt ? "Yes" : "No",
  };
}
