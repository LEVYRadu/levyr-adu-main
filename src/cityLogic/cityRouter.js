// cityRouter.js
import hamilton from './hamilton';
import toronto from './toronto';

const cityRouter = (city) => {
  if (!validateCity(city)) {
    return { error: 'City not supported' };
  }

  switch (city) {
    case 'Hamilton':
      return hamilton;
    case 'Toronto':
      return toronto;
    default:
      return { error: 'City not supported' };
  }
};

export default cityRouter; // Add this line
