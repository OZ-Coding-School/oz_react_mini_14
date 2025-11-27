const pickFormValues = ({ formState }) =>
  Object.fromEntries(
    Object.entries(formState).map(([field, { value }]) => [field, value]),
  );

export { pickFormValues };
