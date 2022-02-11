import { DataType, EditingMode } from "ka-table/enums";
import { loadData } from "ka-table/actionCreators";
export const tablePropsInit = {
  columns: [
    {
      dataType: DataType.String,
      key: "name",
      style: { width: "40%" },
      title: "Name",
    },
    {
      dataType: DataType.Number,
      key: "score",
      style: { width: "70px" },
      title: "Score",
    },
    {
      dataType: DataType.Boolean,
      key: "passed",
      title: "Passed",
    },
    { key: ":delete", width: 70, style: { textAlign: "center" } },
  ],
  singleAction: loadData(),
  //validation=
  validation: ({ column, value }) => {
    if (column.key === "name") {
      if (!value) {
        return `Value can't be empty`;
      }
    }
    if (column.key === "score") {
      if (value > 100) {
        return `Value can't be more than 100`;
      }
      if (!value) {
        return `Value can't be empty`;
      }
    }
  },
  editableCells: [
    {
      columnKey: "score",
      rowKeyValue: 2,
    },
  ],
  editingMode: EditingMode.Cell,
  rowKeyField: "id",
};
