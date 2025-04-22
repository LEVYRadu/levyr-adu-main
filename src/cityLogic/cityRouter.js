import hamilton from './hamilton';
import toronto from './toronto';

// Log to verify
console.log(hamilton);
console.log(toronto);

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
