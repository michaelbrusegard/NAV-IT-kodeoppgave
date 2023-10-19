import retrieveGrunnbelopet from './retrieveGrunnbelopet.js';

const G = await retrieveGrunnbelopet();
const workingDaysInAYear = 260;

function calculateDagpenger(incomeLast3years) {
  // Check if the input is an array with 3 elements
  if (incomeLast3years.length !== 3) {
    throw new Error('Income data has to be defined for exactly the last 3 years.');
  }
  // Check if any income in the array is below 0
  else if (incomeLast3years.some((income) => income < 0)) {
    throw new Error('Income cannot be below 0.');
  }

  const sumIncome = incomeLast3years.reduce((total, current) => total + current, 0);
  const incomeLastYear = incomeLast3years[0];
  const isEligible = eligibleForDagpenger(sumIncome, incomeLastYear);
  if (!isEligible) {
    return {
      eligibleForDagpenger: false,
      dagsatsen: null,
    };
  }
  const dagsatsen = calculateDagsatsen(sumIncome, incomeLastYear);
  return {
    eligibleForDagpenger: true,
    dagsatsen: dagsatsen,
  };
}

// True if either the sum of the last 3 years income is greater than 3G or the income of the most recent year is greater than 1.5G
function eligibleForDagpenger(sumIncome, incomeLastYear) {
  return (sumIncome > 3 * G && incomeLastYear > 0) || incomeLastYear > 1.5 * G;
}

// Dagsatsen is dagpengegrunnlaget divided by working days in a year
function calculateDagsatsen(sumIncome, incomeLastYear) {
  // Dagpengegrunnlaget is the highest of either the average of the last 3 years income or the income of the most recent year, but at most 6G
  const dagpengegrunnlag = Math.min(Math.max(sumIncome / 3, incomeLastYear), 6 * G);
  return Math.ceil(dagpengegrunnlag / workingDaysInAYear);
}

// Export the function to be used in the test file
export default calculateDagpenger;
