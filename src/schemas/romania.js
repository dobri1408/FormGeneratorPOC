export const schemaRomania = [
  {
    pageName: "start",
    tabs: [
      {
        tabName: "start",
        elements: [
          {
            type: "table",
            nameTable: "tableSurfaceCounties",
            id: 4,
            name: "Counties"
          },
          {
            type: "input",
            nameInput: "RadioInput",
            id: 8
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
                  { key: "exampleRadioEnum", value: "Default Table" }
                ]
              }
            ]
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
                  { key: "exampleRadioEnum", value: "Custom Table" }
                ]
              }
            ]
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
                  { key: "exampleRadioEnum", value: "Custom Table" }
                ]
              }
            ],
            getColumns: { id: 20, dataIndex: "property" }
          }
        ]
      }
    ]
  },
  {
    pageName: "Padure Conifere",
    tabs: [
      {
        tabName: "Rodna",
        elements: [
          {
            type: "quill",
            id: 3,
            content: {
              ops: [
                {
                  insert: "Contest here..\nContest..."
                },
                {
                  attributes: {
                    header: 1
                  },
                  insert: "\n"
                },
                {
                  insert: "idk"
                },
                {
                  attributes: {
                    list: "ordered"
                  },
                  insert: "\n"
                },
                {
                  insert: "cool"
                },
                {
                  attributes: {
                    list: "ordered"
                  },
                  insert: "\n"
                },
                {
                  attributes: {
                    bold: true
                  },
                  insert: "bold"
                },
                {
                  attributes: {
                    list: "ordered"
                  },
                  insert: "\n"
                }
              ]
            }
          },
          { type: "table", nameTable: "tableSurfaceCountries", id: 1 }
        ]
      },
      {
        tabName: "Brasov",
        elements: [{ type: "table", nameTable: "tableSurfaceCounties", id: 2 }]
      }
    ]
  }
];
