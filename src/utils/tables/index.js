export const getValueOfSpecifedTable = (specifedTable, siteSchema) => {
  const specifedTableIndex = siteSchema?.elements?.findIndex(
    (block) => block?.type === "table" && block?.id === specifedTable?.id
  );

  const rowIndexOfSpecifedTable = siteSchema?.elements[
    specifedTableIndex
  ]?.data.findIndex(
    (row) => parseInt(row?.key) === parseInt(specifedTable?.key)
  );

  return siteSchema?.elements[specifedTableIndex]?.data[
    rowIndexOfSpecifedTable
  ][specifedTable.dataIndex];
};

export const getValuesOfAColumn = (details, siteSchema) => {
  const id = details?.id;
  const dataIndex = details?.dataIndex;
  const specifedTable = Object.assign(
    siteSchema?.elements?.find(
      (block) => block?.type === "table" && block?.id === id
    )
  );
  const values = new Array();
  specifedTable.data.forEach((row) => {
    values.push(Object.assign(row[dataIndex]));
  });
  return values;
};

export const insertTableIntoRedux = (
  siteSchema,
  TablesSchemas,
  addNewElement,
  element
) => {
  if (
    siteSchema?.elements?.findIndex(
      (block) => block?.type === "table" && block?.id === element.id
    ) === -1
  ) {
    const payload = {
      type: "table",
      id: element.id,
      nameTable: element.nameTable,
      defaultValues: [...TablesSchemas[element.nameTable].initialData],
      data: [...TablesSchemas[element.nameTable].initialData],
      schema: Object.assign(TablesSchemas[element.nameTable].schema),
      getColumns: element.getColumns,
      footers: TablesSchemas[element.nameTable].footers
        ? [...TablesSchemas[element.nameTable].footers]
        : [],
      generalValidation: TablesSchemas[element.nameTable].generalValidation,
    };
    if (TablesSchemas[element.nameTable].visibility?.length > 0) {
      payload.visibility = [...TablesSchemas[element.nameTable]?.visibility];
    }
    addNewElement(payload);
  }
};

export const insertInputIntoRedux = (InputsSchemas, element, addNewElement) => {
  const payload = {
    type: "input",
    id: element.id,
    nameTable: element.nameInput,
    default: Object.assign(InputsSchemas[element.nameInput].data),
    data: Object.assign(InputsSchemas[element.nameInput].data),
    uiSchema: Object.assign(InputsSchemas[element.nameInput].uiSchema),
    schema: Object.assign(InputsSchemas[element.nameInput].schema),
  };

  addNewElement(payload);
};

export const insertHtmlIntoRedux = (element, addNewElement) => {
  const payload = {
    ...element,
  };
  addNewElement(payload);
};
export const updateDyanmicTables = (
  siteSchema,
  TablesSchemas,
  updateSchema
) => {
  const tables = siteSchema.elements.filter(
    (element) => element?.type === "table"
  );
  const importValuesTables = tables.filter(
    (table) => TablesSchemas[table.nameTable]?.dynamic === true
  );

  if (!importValuesTables) return;
  importValuesTables.forEach((table) => {
    const schemaOfTable = [...TablesSchemas[table.nameTable].schema];
    const idOfTable = table.id;
    schemaOfTable.forEach((column) => {
      if (column.importValues) {
        column.title = getValueOfSpecifedTable(column.importValues, siteSchema);
      }
    });

    if (
      JSON.stringify(
        siteSchema.elements.find((table) => table.id === idOfTable).schema
      ) !== JSON.stringify(schemaOfTable)
    ) {
      const payload = { id: idOfTable, schema: schemaOfTable };

      updateSchema(payload);
    }
  });
};

export const getColumnsFromAnotherTable = (
  siteSchema,
  TablesSchemas,
  updateSchema
) => {
  const tables = siteSchema.elements.filter(
    (element) => element?.type === "table"
  );
  const getColumnsTables = tables.filter(
    (table) => table.getColumns !== undefined
  );

  getColumnsTables.forEach((table) => {
    const idOfImportTable = table?.getColumns?.id;
    const dataIndexOfImportTable = table?.getColumns?.dataIndex;

    const values = [
      ...getValuesOfAColumn(
        {
          id: idOfImportTable,
          dataIndex: dataIndexOfImportTable,
        },
        siteSchema
      ),
    ];
    const newSchemaObject = [...TablesSchemas[table.nameTable].schema];
    values.forEach((value) => {
      let stringifyValue = JSON.stringify(value).slice(1);
      stringifyValue = stringifyValue.slice(0, -1);
      if (
        stringifyValue.length > 0 &&
        !newSchemaObject.find((column) => column.title === stringifyValue)
      ) {
        newSchemaObject.push({
          title: stringifyValue,
          editable: true,
          dataIndex: stringifyValue,
        });
      }
    });
    const newTable = Object.assign(table);
    newTable.schema = [...newSchemaObject];

    if (
      JSON.stringify(
        siteSchema.elements.find((tablex) => tablex.id === table.id).schema
      ) != JSON.stringify(newTable.schema)
    ) {
      const payload = { id: table.id, schema: newSchemaObject };
      updateSchema(payload);
    }
  });
};
