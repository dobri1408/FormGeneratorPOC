const columns = [
  {
    title: "Name Of Country",
    dataIndex: "name"
  },
  {
    title: "Surface of Country",
    dataIndex: "surface",

    editable: true
  }
];

const dataSource = [
  {
    key: "1",
    name: "Romania",
    surface: 128
  },
  {
    key: "2",
    name: "Canada",
    surface: 42
  }
];

export const tableSurfaceCountries = {
  schema: columns,
  initialData: dataSource,
  dynamic: false
};
