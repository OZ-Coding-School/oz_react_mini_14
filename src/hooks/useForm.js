import { useCallback, useState } from 'react';

function useForm({ initialState }) {
  const [formState, setFormState] = useState(initialState);
  const isFormValid = Object.values(formState).every(({ valid }) => valid);

  const handleFormChange = useCallback(
    ({ fieldName, value, valid }) =>
      setFormState((prev) => ({
        ...prev,
        [fieldName]: { ...prev[fieldName], value, valid },
      })),
    [],
  );

  return { formState, isFormValid, handleFormChange };
}

export default useForm;
