export const schemaDenmark = [
  {
    pageName: "Paduri Conifere",
    tabs: [
      {
        tabName: "Toronto",
        elements: [{ type: "form", nameForm: "Form1" }],
      },

      {
        tabName: "Qubec",
        elements: [
          {
            type: "quill",
            id: 1,
            content: {},
          },
        ],
      },
    ],
  },
  {
    pageName: "Fieroase",
    tabs: [
      {
        tabName: "Toronto",
        elements: [
          { type: "table", nameTable: "Table1" },
          { type: "form", nameForm: "Form1" },
        ],
      },

      {
        tabName: "Qubec",
        elements: [
          {
            type: "quill",
            id: 2,
            content: {},
          },
        ],
      },
    ],
  },
];
