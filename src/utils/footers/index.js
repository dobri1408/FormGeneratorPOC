export const totalFooter = (tableData) => {
  let total = 0;
  tableData.data.forEach((row) => (total += row.surface));

  return { name: "Total", value: total };
};
export const messageFooter = (tableData) => {
  return { name: "Message", value: null };
};
