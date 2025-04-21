// src/cityLogic/cityRouter.js

import hamilton from "./hamilton";
import toronto from "./toronto";

// Simple keyword matcher for now
export function cityRouter(address) {
  const lower = address.toLowerCase();

  if (lower.includes("hamilton")) return hamilton;
  if (lower.includes("toronto")) return toronto;

  return null; // not supported
}
