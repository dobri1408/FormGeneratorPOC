const columns = [
  {
    title: "Name of Wiksey",
    dataIndex: "name",

    editable: true
  },
  {
    title: "Premium",
    dataIndex: "premium",
    editable: true
  },
  {
    title: "Vechi",
    dataIndex: "Vechi",
    editable: true
  }
];

const dataSource = [
  {
    key: "1",
    name: "Brandy",
    premium: "da",
    vechi: "nu"
  },
  {
    key: "2",
    name: "Ceva rusesc",
    premium: "nu",
    vechi: "da"
  }
];

export const defualtWiskeyTable = {
  schema: columns,
  initialData: dataSource
};
