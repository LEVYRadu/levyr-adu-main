// src/cityLogic/cityRouter.js

import * as hamilton from "./hamilton.js";
import * as toronto from "./toronto.js";

export const getCityLogic = (address) => {
  if (hamilton.isAddressInHamilton(address)) {
    return hamilton;
  }
  if (toronto.isAddressInToronto(address)) {
    return toronto;
  }

  return null;
};
