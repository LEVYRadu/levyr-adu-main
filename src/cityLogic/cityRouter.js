import validateCity from '../utils/validateCity';
import hamilton from './hamilton';
import toronto from './toronto';

const cityRouter = async (city, address) => {
  if (!validateCity(city)) {
    return { error: 'City not supported' };
  }

  switch (city) {
    case 'Hamilton':
      return await hamilton(address);
    case 'Toronto':
      return await toronto(address);
    default:
      return { error: 'City not supported' };
  }
};

export default cityRouter;
