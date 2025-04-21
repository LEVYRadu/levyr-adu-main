import zoningLogic from './hamilton/zoningLogic';

export default async function runHamiltonLogic({ lat, lon }) {
  const zoningResult = await zoningLogic({ lat, lon });

  return {
    city: "Hamilton",
    zoning: zoningResult,
    // More modules (like constraints, utilities) will go here later
  };
}
