import zoningLogic from "./hamilton/zoningLogic.js";
import {
  loadOntarioLayers,
  isInGreenbelt,
  getSoilType,
  getElevation,
} from "./ontarioShared.js";

export default async function hamilton(address) {
  // TEMP: Hardcoded coordinates for 71 Main St W, Hamilton
  const coordinates = {
    lat: 43.2565,
    lng: -79.8729,
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
