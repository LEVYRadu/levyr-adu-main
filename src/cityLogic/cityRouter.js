// src/cityLogic/cityRouter.js

import * as hamilton from "./hamilton.js";
import * as toronto from "./toronto.js";

// This function determines which city's logic to use based on the address
export const getCityLogic = (address) => {
  if (hamilton.isAddressInHamilton(address)) {
    return hamilton.getHamiltonReportLogic;  // Returns the specific Hamilton report logic
  }
  if (toronto.isAddressInToronto(address)) {
    return toronto.getTorontoReportLogic;  // Returns the specific Toronto report logic
  }

  return null; // Returns null if no match
};
