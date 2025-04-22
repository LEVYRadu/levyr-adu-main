// Utility APIs
const streetLightAPI = 'https://services.arcgis.com/rYz782eMbySr2srL/arcgis/rest/services/Street_Light/FeatureServer/3/query?outFields=*&where=1%3D1&f=geojson';
const roadEdgeAPI = 'https://services.arcgis.com/rYz782eMbySr2srL/arcgis/rest/services/Road_Edge/FeatureServer/3/query?outFields=*&where=1%3D1&f=geojson';
const sidewalkAPI = 'https://services.arcgis.com/rYz782eMbySr2srL/arcgis/rest/services/Road_Sidewalk/FeatureServer/2/query?outFields=*&where=1%3D1&f=geojson';
const streetCentrelineAPI = 'https://services.arcgis.com/rYz782eMbySr2srL/arcgis/rest/services/Street_Centreline/FeatureServer/14/query?outFields=*&where=1%3D1&f=geojson';
const sewerAPI = 'https://services.arcgis.com/rYz782eMbySr2srL/arcgis/rest/services/Sanitation_Sewer_Wastewater_Catchment_Areas/FeatureServer/15/query?outFields=*&where=1%3D1&f=geojson';
const overflowAPI = 'https://services.arcgis.com/rYz782eMbySr2srL/arcgis/rest/services/Combined_Overflow_Wastewater_Catchment_Areas/FeatureServer/1/query?outFields=*&where=1%3D1&f=geojson';

// Helper function to fetch GeoJSON from a URL, using a CORS proxy
async function fetchGeoJSON(url) {
  const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
  const response = await fetch(proxyUrl);
  const data = await response.json();
  return data;
}

// Helper function to calculate proximity
function calculateProximity(lat, lon, features) {
  // You could use Turf.js or a simple distance calculation to check proximity
  // For simplicity, assuming a very basic proximity check
  return features.some(feature => {
    const featureLat = feature.geometry.coordinates[1]; // Assuming GeoJSON format [lon, lat]
    const featureLon = feature.geometry.coordinates[0];
    
    // Using a basic Euclidean distance for now (this can be improved with a library like Turf.js)
    const distance = Math.sqrt(Math.pow(lat - featureLat, 2) + Math.pow(lon - featureLon, 2));
    return distance < 0.0005; // Example threshold (about 50 meters)
  });
}

async function calculateUtilityConfidence({ lat, lon }) {
  // Fetch all utility data
  const streetLightData = await fetchGeoJSON(streetLightAPI);
  const roadEdgeData = await fetchGeoJSON(roadEdgeAPI);
  const sidewalkData = await fetchGeoJSON(sidewalkAPI);
  const streetCentrelineData = await fetchGeoJSON(streetCentrelineAPI);
  const sewerData = await fetchGeoJSON(sewerAPI);
  const overflowData = await fetchGeoJSON(overflowAPI);

  // Implement proximity logic based on lat/lon
  const isNearStreetLight = calculateProximity(lat, lon, streetLightData.features);
  const isNearRoadEdge = calculateProximity(lat, lon, roadEdgeData.features);
  const isNearSidewalk = calculateProximity(lat, lon, sidewalkData.features);
  const isNearStreetCentreline = calculateProximity(lat, lon, streetCentrelineData.features);
  const isNearSewer = calculateProximity(lat, lon, sewerData.features);
  const isNearOverflow = calculateProximity(lat, lon, overflowData.features);

  // Return utility confidence based on proximity
  const utilityConfidence = {
    streetLight: isNearStreetLight ? 'Highly Likely' : 'Unlikely',
    roadEdge: isNearRoadEdge ? 'Highly Likely' : 'Unlikely',
    sidewalk: isNearSidewalk ? 'Highly Likely' : 'Unlikely',
    streetCentreline: isNearStreetCentreline ? 'Highly Likely' : 'Unlikely',
    sewer: isNearSewer ? 'Highly Likely' : 'Unlikely',  // Added sewer data
    overflow: isNearOverflow ? 'Highly Likely' : 'Unlikely',  // Added overflow data
  };

  return utilityConfidence;
}

export default calculateUtilityConfidence;
