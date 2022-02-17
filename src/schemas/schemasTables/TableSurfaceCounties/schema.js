const columns = [
  {
    title: "Name Of County",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Surface of County",
    dataIndex: "surface",
    key: "surface",
    editable: true,
  },
];

const dataSource = [
  {
    key: "1",
    name: "Brasov",
    surface: 128,
    address: "10 Downing Street",
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
