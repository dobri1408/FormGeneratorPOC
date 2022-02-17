const columns = [
  {
    title: "Name Of Country",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Surface of Country",
    dataIndex: "surface",
    key: "surface",
    editable: true,
  },
];

const dataSource = [
  {
    key: "1",
    name: "Romania",
    surface: 128,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "Canada",
    surface: 42,
  },
];

export const tableSurfaceCountries = {
  schema: columns,
  initialData: dataSource,
};
