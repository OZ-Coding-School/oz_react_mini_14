import { memo } from 'react';
import { cn } from '@/utils';

const FormField = memo(function ({
  label,
  type,
  name,
  conditions,
  value,
  pairValue,
  valid,
  onChange,
  ...rest
}) {
  const conditionTestResults = getConditionTestResults({
    conditions,
    value,
    pairValue,
  });

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    const newConditionTestResults = getConditionTestResults({
      conditions,
      value: newValue,
      pairValue,
    });

    onChange({
      fieldName: name,
      value: newValue,
      valid: checkFieldValidity({
        conditionTestResults: newConditionTestResults,
      }),
    });
  };

  return (
    <div className="flex-center flex-col">
      <label htmlFor={name} className="w-full text-xl font-bold">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        {...rest}
        value={value}
        onChange={handleInputChange}
        className={cn(
          'mt-2 w-full rounded-md border-2 border-transparent bg-stone-50 px-4 py-2 outline-none dark:bg-stone-700',
          { 'border-red-400': !valid },
        )}
      />
      {conditionTestResults && (
        <ul className="mt-2 ml-10 flex w-full gap-2 text-sm">
          {conditionTestResults.map((result) => (
            <li
              key={result.name}
              className={cn('font-bold text-stone-500 dark:text-stone-400', {
                'text-stone-950 dark:text-stone-50': result.passed,
              })}
            >
              ✓ {result.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default FormField;

function getConditionTestResults({ conditions, value, pairValue }) {
  return conditions.map((condition) => ({
    name: condition.description,
    passed: condition.test(pairValue == null ? value : { value, pairValue }),
  }));
}

function checkFieldValidity({ conditionTestResults }) {
  return conditionTestResults.every((result) => result.passed);
}
