const columns = [
  {
    title: "",
    dataIndex: "1",
    importValues: { id: 4, key: 1, dataIndex: "name" },
    editable: true
  },
  {
    title: "Surface of County",
    dataIndex: "surface",

    editable: true,
    validation: ["number", "min=30", "max=100", "not=50"] //all these are function names
  }
];

const dataSource = [
  {
    key: "1",
    name: "Brasov",
    surface: 128
  },
  {
    key: "2",
    name: "Bucuresti",
    surface: 42
  }
];

export const dynamicTable = {
  schema: columns,
  initialData: dataSource,

  dynamic: true,
  visibility: [
    {
      id: 8,
      dependencies: [{ key: "exempleRadioEnum", value: "Vreau Tabel" }]
    }
  ]
};
