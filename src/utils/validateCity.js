// utils/validateCity.js

const validateCity = (city) => {
  const supportedCities = ['Toronto', 'Hamilton'];  // List of supported cities
  return supportedCities.includes(city);  // Check if the city is in the supported list
};

export default validateCity;
