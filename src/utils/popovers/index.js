export const popoverCounties = (props) => {
  //props.value - value of curent cell,
  //props.column - column,
  //props.row - row number,
  //props.tableData - schemas, values of all Cells
  //be sure that for each cell just one popover will be render

  if (props.column === "surface") {
    return `Nu va bucurati ca aveti pamant mult (${props.value}), ca va fi a Rusiei`;
  }
  return null;
};
