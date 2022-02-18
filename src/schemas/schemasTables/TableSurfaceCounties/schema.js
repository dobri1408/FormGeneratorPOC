const columns = [
  {
    title: "Name Of County",
    dataIndex: "name",
  },
  {
    title: "Surface of County",
    dataIndex: "surface",

    editable: true,
    // validation: ["required", "number", "min=30", "max=100", "not=50"], //all these are function names
  },
];

const dataSource = [
  {
    key: "1",
    name: "Brasov",
    surface: 128,
  },
  {
    key: "2",
    name: "Bucuresti",
    surface: 42,
  },
];

export const tableSurfaceCounties = {
  schema: columns,
  initialData: dataSource,
};
