const streetLightAPI = 'https://services.arcgis.com/rYz782eMbySr2srL/arcgis/rest/services/Street_Light/FeatureServer/3/query?outFields=*&where=1%3D1&f=geojson';
const roadEdgeAPI = 'https://services.arcgis.com/rYz782eMbySr2srL/arcgis/rest/services/Road_Edge/FeatureServer/3/query?outFields=*&where=1%3D1&f=geojson';
const sidewalkAPI = 'https://services.arcgis.com/rYz782eMbySr2srL/arcgis/rest/services/Road_Sidewalk/FeatureServer/2/query?outFields=*&where=1%3D1&f=geojson';
const streetCentrelineAPI = 'https://services.arcgis.com/rYz782eMbySr2srL/arcgis/rest/services/Street_Centreline/FeatureServer/14/query?outFields=*&where=1%3D1&f=geojson';

async function fetchGeoJSON(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function calculateUtilityConfidence({ lat, lon }) {
  const streetLightData = await fetchGeoJSON(streetLightAPI);
  const roadEdgeData = await fetchGeoJSON(roadEdgeAPI);
  const sidewalkData = await fetchGeoJSON(sidewalkAPI);
  const streetCentrelineData = await fetchGeoJSON(streetCentrelineAPI);

  // Here, you would implement your logic to evaluate proximity to utility data
  const isNearStreetLight = streetLightData.features.some(feature => {
    // Implement your logic based on lat/lon proximity
  });

  const isNearRoadEdge = roadEdgeData.features.some(feature => {
    // Implement your logic based on lat/lon proximity
  });

  const isNearSidewalk = sidewalkData.features.some(feature => {
    // Implement your logic based on lat/lon proximity
  });

  const isNearStreetCentreline = streetCentrelineData.features.some(feature => {
    // Implement your logic based on lat/lon proximity
  });

  // Based on your evaluation, return a confidence score
  const utilityConfidence = {
    streetLight: isNearStreetLight ? 'Highly Likely' : 'Unlikely',
    roadEdge: isNearRoadEdge ? 'Highly Likely' : 'Unlikely',
    sidewalk: isNearSidewalk ? 'Highly Likely' : 'Unlikely',
    streetCentreline: isNearStreetCentreline ? 'Highly Likely' : 'Unlikely',
  };

  return utilityConfidence;
}

export default calculateUtilityConfidence;
