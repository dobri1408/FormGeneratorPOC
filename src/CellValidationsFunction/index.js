export const min = (cellValue, parameter) => {
  cellValue = parseInt(cellValue);
  if (cellValue < parameter) return `Cell must be bigger than ${parameter}`;
  return true;
};
export const number = (cellValue) => {
  if (!isNaN(cellValue) === true) return true;
  else return "Cell must be number";
};
export const max = (cellValue, parameter) => {
  cellValue = parseInt(cellValue);
  if (cellValue > parameter) return `Cell must be smaller than ${parameter}`;
  return true;
};
export const not = (cellValue, parameter) => {
  cellValue = parseInt(cellValue);
  if (cellValue === parseInt(parameter))
    return `Cell must be diifferent than ${parameter}`;
  return true;
};
