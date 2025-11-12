function getConditionTestResults({ conditions, value, pairValue }) {
  return conditions.map((condition) => ({
    name: condition.description,
    passed: condition.test(pairValue == null ? value : { value, pairValue }),
  }));
}

function checkFieldValidity({ conditionTestResults }) {
  return conditionTestResults.every((result) => result.passed);
}

export { getConditionTestResults, checkFieldValidity };
