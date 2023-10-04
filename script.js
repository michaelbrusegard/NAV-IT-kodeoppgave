// Import the 'assert' module used for testing
const assert = require('assert');
// I interpret the input to be an array of the last 3 years of income starting with the most recent year
const example = [500000, 450000, 400000];
// I assume grunnbeløpet from the https://www.nav.no/grunnbelopet 2023 value
const G = 118620;
const workingDaysInAYear = 260;

function calculateDagpenger(incomeLast3years) {
  if (incomeLast3years.length != 3) {
    throw new Error(
      'Income data has to be defined for exactly the last 3 years.'
    );
  }

  const sumIncome = incomeLast3years.reduce(
    (total, current) => total + current,
    0
  );
  const incomeLastYear = incomeLast3years[0];
  const isEligible = eligibleForDagpenger(sumIncome, incomeLastYear);
  if (isEligible) {
    const dagsatsen = calculateDagsatsen(sumIncome, incomeLastYear);
    return {
      eligibleForDagpenger: true,
      dagsatsen: dagsatsen,
    };
  }
  return {
    eligibleForDagpenger: false,
  };
}

// True if either the sum of the last 3 years income is greater than 3G or the income of the most recent year is greater than 1.5G
function eligibleForDagpenger(sumIncome, incomeLastYear) {
  return sumIncome > 3 * G || incomeLastYear > 1.5 * G;
}

// Dagsatsen is dagpengegrunnlaget divided by working days in a year
function calculateDagsatsen(sumIncome, incomeLastYear) {
  // Dagpengegrunnlaget is the highest of either the average of the last 3 years income or the income of the most recent year, but at most 6G
  const dagpengegrunnlag = Math.min(
    Math.max(sumIncome / 3, incomeLastYear),
    6 * G
  );
  return Math.ceil(dagpengegrunnlag / workingDaysInAYear);
}

function runTests() {
  // Test case 1: Eligible for dagpenger with sumIncome > 3G
  const input1 = example;
  const result1 = calculateDagpenger(input1);
  assert.strictEqual(result1.eligibleForDagpenger, true);
  assert.strictEqual(result1.dagsatsen, 1924);
  console.log('Test case 1: Eligible for dagpenger with sumIncome > 3G');
  console.log('Input:', input1);
  console.log('Result:', result1);
  console.log('------------------------');

  // Test case 2: Eligible for dagpenger with incomeLastYear > 1.5G
  const input2 = [180000, 80000, 75000];
  const result2 = calculateDagpenger(input2);
  assert.strictEqual(result2.eligibleForDagpenger, true);
  assert.strictEqual(result2.dagsatsen, 693);
  console.log('Test case 2: Eligible for dagpenger with incomeLastYear > 1.5G');
  console.log('Input:', input2);
  console.log('Result:', result2);
  console.log('------------------------');

  // Test case 3: Not eligible for dagpenger (below income thresholds)
  const input3 = [50000, 60000, 70000];
  const result3 = calculateDagpenger(input3);
  assert.strictEqual(result3.eligibleForDagpenger, false);
  console.log(
    'Test case 3: Not eligible for dagpenger (below income thresholds)'
  );
  console.log('Input:', input3);
  console.log('Result:', result3);
  console.log('------------------------');

  //   Test case 4: Throws an error for incorrect input length
  const input4 = [500000, 450000];
  let result4;
  try {
    calculateDagpenger(input4);
    // If the function doesn't throw an error, the test fails
    assert.fail('Function should throw an error for incorrect input length');
  } catch (error) {
    // Ensure that the error message matches
    result4 = error.message;
    assert.strictEqual(
      error.message,
      'Income data has to be defined for exactly the last 3 years.'
    );
  }
  console.log('Test case 4: Throws an error for incorrect input length');
  console.log('Input:', input4);
  console.log('Result:', result4);
  console.log('------------------------');

  console.log('All tests passed!');
}

// Run the function with the example input
console.log(calculateDagpenger(example));

// Run the tests
runTests();
