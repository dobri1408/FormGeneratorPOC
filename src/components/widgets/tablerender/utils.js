export const validations = (tableData, setValidationsOfTable) => {
  const newObjectValidations = {};
  console.log("validation");
  tableData.schema?.forEach((column) => {
    newObjectValidations[column?.dataIndex] = [];
    column?.validation?.forEach((validation) => {
      newObjectValidations[column.dataIndex].push({
        nameFunction: validation?.substr(
          0,
          validation?.indexOf("=") !== -1
            ? validation?.indexOf("=")
            : validation?.length
        ),
        parameter:
          validation?.indexOf("=") !== -1
            ? validation?.substr(
                validation?.indexOf("=") + 1,
                validation?.length
              )
            : null,
      });
    });
    tableData.generalValidation?.forEach((validation) => {
      newObjectValidations[column.dataIndex].push({
        nameFunction: validation?.substr(
          0,
          validation?.indexOf("=") !== -1
            ? validation?.indexOf("=")
            : validation?.length
        ),
        parameter:
          validation?.indexOf("=") !== -1
            ? validation?.substr(
                validation?.indexOf("=") + 1,
                validation?.length
              )
            : null,
      });
    });
  });
  setValidationsOfTable(newObjectValidations);
};

export const footersFunction = (tableData, Footers, setFooters) => {
  const footersArray = [];
  if (tableData?.footers?.length) {
    tableData?.footers?.forEach((footer) => {
      footersArray.push(Footers[footer](tableData));
    });
    setFooters([...footersArray]);
  }
};

export const popovers = (tableData, setPopoversObject) => {
  const newObjectPopovers = {};
  tableData.schema?.forEach((column) => {
    newObjectPopovers[column?.dataIndex] = [];
    column?.popovers?.forEach((popoverFunction) => {
      newObjectPopovers[column?.dataIndex].push(popoverFunction);
    });
  });
  setPopoversObject(newObjectPopovers);
};
