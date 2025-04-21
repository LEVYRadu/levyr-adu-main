// src/cityLogic/cityRouter.js

import hamilton from "./hamilton";
import toronto from "./toronto";

// Improved cityRouter function
export function cityRouter(address) {
  // Normalize address to lowercase and trim spaces
  const lower = address.trim().toLowerCase();

  // Check for exact matches for "hamilton" and "toronto"
  if (lower.includes("hamilton")) {
    return hamilton;
  }

  if (lower.includes("toronto")) {
    return toronto;
  }

  // If no match is found, return an error message instead of null
  throw new Error("City not supported. Please check the address or contact support.");
}
