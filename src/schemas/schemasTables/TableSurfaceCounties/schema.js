const columns = [
  {
    title: "Name Of County",
    dataIndex: "name",
    editable: true
  },
  {
    title: "Surface of County",
    dataIndex: "surface",
    popovers: ["popoverCounties"],
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

export const tableSurfaceCounties = {
  schema: columns,
  footers: ["totalFooter", "messageFooter"],
  initialData: dataSource,
  dynamic: false
};
