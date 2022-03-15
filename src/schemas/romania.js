export const schemaRomania = [
  {
    pageName: "start",
    tabs: [
      {
        tabName: "start",
        elements: [
          {
            id: 100,
            type: "html",
            htmlSchema: [
              {
                type: "header",
                data: {
                  text: "This is a heading",
                  level: 2,
                },
              },
              {
                type: "paragraph",
                data: {
                  text: "This is a paragraph",
                },
              },
            ],
          },
          {
            type: "table",
            nameTable: "tableSurfaceCounties",
            id: 4,
            name: "Counties",
          },
          {
            type: "input",
            nameInput: "RadioInput",
            id: 8,
          },
          {
            type: "table",
            nameTable: "defualtWiskeyTable",
            name: "Default Wiksey Table",
            id: 22,
            visibility: [
              {
                id: 8,
                dependencies: [
                  { key: "exampleRadioEnum", value: "Default Table" },
                ],
              },
            ],
          },
          {
            type: "table",
            nameTable: "propietiesTable",
            name: "Propierties Table",
            id: 20,
            visibility: [
              {
                id: 8,
                dependencies: [
                  { key: "exampleRadioEnum", value: "Custom Table" },
                ],
              },
            ],
          },
          {
            type: "table",
            nameTable: "wiskeyTable",
            name: "Custom Wiskey Table",
            id: 16,
            visibility: [
              {
                id: 8,
                dependencies: [
                  { key: "exampleRadioEnum", value: "Custom Table" },
                ],
              },
            ],
            getColumns: { id: 20, dataIndex: "property" },
          },
        ],
      },
    ],
  },
  {
    pageName: "Forests",
    tabs: [
      {
        tabName: "Rodna",
        elements: [
          { type: "table", nameTable: "tableSurfaceCountries", id: 1 },
        ],
      },
      {
        tabName: "Brasov",
        elements: [{ type: "table", nameTable: "tableSurfaceCounties", id: 2 }],
      },
    ],
  },
];
