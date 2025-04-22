// Ontario-wide shared logic
import { point, distance, area } from '@turf/turf'; // replace with needed functions

// Fetch and cache the datasets once
let greenbeltFeatures = null;
let soilFeatures = null;
let elevationFeatures = null;

async function fetchAndCacheGeoJSON(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data.features;
}

export async function loadOntarioLayers() {
  if (!greenbeltFeatures) {
    greenbeltFeatures = await fetchAndCacheGeoJSON("https://ws.lioservices.lrc.gov.on.ca/arcgis2/rest/services/LIO_OPEN_DATA/LIO_Open01/MapServer/29/query?outFields=*&where=1%3D1&f=geojson");
  }
  if (!soilFeatures) {
    soilFeatures = await fetchAndCacheGeoJSON("https://ws.lioservices.lrc.gov.on.ca/arcgis2/rest/services/LIO_OPEN_DATA/LIO_Open06/MapServer/15/query?outFields=*&where=1%3D1&f=geojson");
  }
  if (!elevationFeatures) {
    elevationFeatures = await fetchAndCacheGeoJSON("https://ws.lioservices.lrc.gov.on.ca/arcgis2/rest/services/LIO_OPEN_DATA/LIO_Open05/MapServer/9/query?outFields=*&where=1%3D1&f=geojson");
  }
}

export function isInGreenbelt(coordinates) {
  const point = turf.point([coordinates.lng, coordinates.lat]);
  return greenbeltFeatures?.some(feature => turf.booleanPointInPolygon(point, feature));
}

export function getSoilType(coordinates) {
  const point = turf.point([coordinates.lng, coordinates.lat]);
  const match = soilFeatures?.find(feature => turf.booleanPointInPolygon(point, feature));
  return match?.properties?.SOIL_NAME || "Unknown";
}

export function getElevation(coordinates) {
  const point = turf.point([coordinates.lng, coordinates.lat]);
  const match = elevationFeatures?.find(feature => turf.booleanPointInPolygon(point, feature));
  return match?.properties?.ELEVATION || "Unknown";
}
