export const schemaRomania = [
  {
    pageName: "start",
    tabs: [
      {
        tabName: "start",
        elements: [
          { type: "table", nameTable: "tableSurfaceCounties", id: 4 },
          {
            type: "input",
            nameInput: "RadioInput",
            id: 8
          },
          {
            type: "table",
            nameTable: "wiskeyTable",
            id: 16,
            visibility: [
              {
                id: 8,
                dependencies: [
                  { key: "exampleRadioEnum", value: "Vreau Tabel" }
                ]
              }
            ],
            getColumns: { id: 20, dataIndex: "property" }
          },
          {
            type: "table",
            nameTable: "propietiesTable",
            id: 20,
            visibility: [
              {
                id: 8,
                dependencies: [
                  { key: "exampleRadioEnum", value: "Nu vreau tabel" }
                ]
              }
            ]
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
