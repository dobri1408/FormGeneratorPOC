const columns = [
  {
    title: "Name Of Property",
    dataIndex: "property",
    editable: true,
  },
];

const dataSource = [
  {
    key: "1",
    property: "vechi",
  },
];

export const propietiesTable = {
  schema: columns,
  initialData: dataSource,
  dynamic: false,
  name: "Properties Table",
  visibility: [
    {
      id: 8,
      dependencies: [{ key: "exempleRadioEnum", value: "Nu Vreau Tabel" }],
    },
  ],
};
