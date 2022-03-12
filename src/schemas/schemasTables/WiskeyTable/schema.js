const columns = [
  {
    title: "Name of Wiksey",
    dataIndex: "name",

    editable: true,
  },
];

const dataSource = [
  {
    key: "1",
    name: "Brandy",
  },
  {
    key: "2",
    name: "Ceva rusesc",
  },
];

export const wiskeyTable = {
  schema: columns,
  initialData: dataSource,
  visibility: [
    {
      id: 8,
      dependencies: [{ key: "exempleRadioEnum", value: "Vreau Tabel" }],
    },
  ],
  generalValidation: ["min=50"],
};
