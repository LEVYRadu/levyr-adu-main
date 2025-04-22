// Import the city validation function
import validateCity from '../utils/validateCity';
// Import the city-specific logic files
import hamilton from './hamilton';
import toronto from './toronto';

// The cityRouter function checks the city and returns the corresponding logic
const cityRouter = (city) => {
  // Normalize city name to proper case
  const normalizedCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

  // Validate if the city is supported
  if (!validateCity(normalizedCity)) {
    return { error: 'City not supported' };  // Return an error message if unsupported
  }

  // Return the specific city logic based on the city name
  switch (normalizedCity) {
    case 'Hamilton':
      return hamilton;  // Return Hamilton's logic
    case 'Toronto':
      return toronto;   // Return Toronto's logic
    default:
      return { error: 'City not supported' };  // Default error for unsupported cities
  }
};

export default cityRouter;
