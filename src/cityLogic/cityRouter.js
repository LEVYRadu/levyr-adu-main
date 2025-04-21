import hamilton from './hamilton';
import toronto from './toronto';

// Improved cityRouter function to handle address routing
export function cityRouter(address) {
  const lower = address.toLowerCase();

  if (lower.includes('hamilton')) return hamilton;
  if (lower.includes('toronto')) return toronto;

  return null; // City not supported
}
