export const ComplexValidation = (dataTable) => {
  ///Create Complex Data Validation , dataTable is all the data in the table and you can check it yourselef
  //Exemple of validation for Table Interpol : the sum of scores cannot be bigger than 300
  if (!dataTable.length) return 0;
  const reducer = (accumulator, currentValue) =>
    accumulator + parseInt(currentValue.score);

  if (dataTable.reduce(reducer, 0) > 300)
    return "Error The sum of score values cannot be bigger than 300";

  return 0;
};
