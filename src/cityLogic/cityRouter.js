import validateCity from '../utils/validateCity'; // Import validateCity
import hamilton from './hamilton';
import toronto from './toronto';

const cityRouter = async (city) => {
  if (!validateCity(city)) {
    return { error: 'City not supported' };
  }

  switch (city) {
    case 'Hamilton':
      return await hamilton(); // Await the hamilton function
    case 'Toronto':
      return await toronto();  // Await the toronto function
    default:
      return { error: 'City not supported' };
  }
};

export default cityRouter; // Ensure export is included
