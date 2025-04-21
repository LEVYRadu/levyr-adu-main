import zoningLogic from './hamilton/zoningLogic';
import calculateUtilityConfidence from './hamilton/utilityLogic';

export default async function runHamiltonLogic({ lat, lon }) {
  const zoningResult = await zoningLogic({ lat, lon });
  const utilityConfidence = await calculateUtilityConfidence({ lat, lon });

  return {
    city: "Hamilton",
    zoning: zoningResult,
    utilities: utilityConfidence,
    // More modules (like constraints) will go here later
  };
}
