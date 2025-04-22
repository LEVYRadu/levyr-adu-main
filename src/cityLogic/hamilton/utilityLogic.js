// Utility APIs
const streetLightAPI = 'https://services.arcgis.com/rYz782eMbySr2srL/arcgis/rest/services/Street_Light/FeatureServer/3/query?outFields=*&where=1%3D1&f=geojson';
const roadEdgeAPI = 'https://services.arcgis.com/rYz782eMbySr2srL/arcgis/rest/services/Road_Edge/FeatureServer/3/query?outFields=*&where=1%3D1&f=geojson';
const sidewalkAPI = 'https://services.arcgis.com/rYz782eMbySr2srL/arcgis/rest/services/Road_Sidewalk/FeatureServer/2/query?outFields=*&where=1%3D1&f=geojson';
const streetCentrelineAPI = 'https://services.arcgis.com/rYz782eMbySr2srL/arcgis/rest/services/Street_Centreline/FeatureServer/14/query?outFields=*&where=1%3D1&f=geojson';

// Helper function to fetch GeoJSON from a URL, using a CORS proxy
async function fetchGeoJSON(url) {
  const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
  const response = await fetch(proxyUrl);
  const data = await response.json();
  return data;
}

async function calculateUtilityConfidence({ lat, lon }) {
  const streetLightData = await fetchGeoJSON(streetLightAPI);
  const roadEdgeData = await fetchGeoJSON(roadEdgeAPI);
  const sidewalkData = await fetchGeoJSON(sidewalkAPI);
  const streetCentrelineData = await fetchGeoJSON(streetCentrelineAPI);

  // Implement your proximity logic based on lat/lon
  const isNearStreetLight = streetLightData.features.some(feature => {
    // Your proximity logic here (e.g., using turf.distance)
  });

  const isNearRoadEdge = roadEdgeData.features.some(feature => {
    // Your proximity logic here
  });

  const isNearSidewalk = sidewalkData.features.some(feature => {
    // Your proximity logic here
  });

  const isNearStreetCentreline = streetCentrelineData.features.some(feature => {
    // Your proximity logic here
  });

  // Return utility confidence based on proximity
  const utilityConfidence = {
    streetLight: isNearStreetLight ? 'Highly Likely' : 'Unlikely',
    roadEdge: isNearRoadEdge ? 'Highly Likely' : 'Unlikely',
    sidewalk: isNearSidewalk ? 'Highly Likely' : 'Unlikely',
    streetCentreline: isNearStreetCentreline ? 'Highly Likely' : 'Unlikely',
  };

  return utilityConfidence;
}

export default calculateUtilityConfidence;
