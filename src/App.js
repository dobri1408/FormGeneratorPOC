import "./App.css";
import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import Toolbar from "./components/toolbar/Toolbar";
import { Layout } from "antd";
import { UPDATE_SCHEMA_TABLE } from "./redux/constants";
import PageGeneratorModal from "./components/pagesgenerator/PageGeneratorModal";

import PageRender from "./components/pagesgenerator/PageRender";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageStart from "./components/pagesgenerator/PageStart";
import * as TablesSchemas from "./schemas/schemasTables";
import * as InputsSchemas from "./schemas/schemasInputs";
import { connect } from "react-redux";
import { ADD_ELEMENT_TO_SYSTEM } from "./redux/constants";
const { Footer } = Layout;

function App({ siteSchema, addNewElement, updateSchema }) {
  const [modalTableGenerator, setModalTableGenerator] = useState(false);
  const [modalPageGenerator, setModalPageGenerator] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getValueOfSpecifedTable = (specifedTable) => {
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
  const getValuesOfAColumn = (details) => {
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
  useEffect(() => {
    //insert each element of country in redux sistem
    if (selectedCountry.length === 0) return;
    const countrySchema = siteSchema[selectedCountry];
    countrySchema.forEach((page) => {
      page?.tabs?.forEach((tab) => {
        tab?.elements?.forEach((element) => {
          if (element.type === "table") {
            if (
              siteSchema?.elements?.findIndex(
                (block) => block?.type === "table" && block?.id === element.id
              ) === -1
            ) {
              const payload = {
                type: "table",
                id: element.id,
                nameTable: element.nameTable,
                defaultValues: [
                  ...TablesSchemas[element.nameTable].initialData,
                ],
                data: [...TablesSchemas[element.nameTable].initialData],
                schema: Object.assign(TablesSchemas[element.nameTable].schema),
                getColumns: element.getColumns,
              };
              if (TablesSchemas[element.nameTable].visibility?.length > 0) {
                payload.visibility = [
                  ...TablesSchemas[element.nameTable]?.visibility,
                ];
              }
              addNewElement(payload);
            }
          } else if (element.type === "input") {
            if (
              siteSchema?.elements?.findIndex(
                (block) => block?.type === "input" && block?.id === element.id
              ) === -1
            ) {
              const payload = {
                type: "input",
                id: element.id,
                nameTable: element.nameInput,
                default: Object.assign(InputsSchemas[element.nameInput].data),
                data: Object.assign(InputsSchemas[element.nameInput].data),
                uiSchema: Object.assign(
                  InputsSchemas[element.nameInput].uiSchema
                ),
                schema: Object.assign(InputsSchemas[element.nameInput].schema),
              };

              addNewElement(payload);
            }
          }
        });
      });
    });
  }, [addNewElement, selectedCountry, siteSchema]);

  useEffect(() => {
    // INEFICIENT
    //UPDATE COLUMNS OF DYNAMIC TABLES

    const tables = siteSchema.elements.filter(
      (element) => element?.type === "table"
    );
    const importValuesTables = tables.filter(
      (table) => TablesSchemas[table.nameTable]?.dynamic === true
    );
    console.log({ importValuesTables });
    if (!importValuesTables) return;
    importValuesTables.forEach((table) => {
      const schemaOfTable = [...TablesSchemas[table.nameTable].schema];
      const idOfTable = table.id;
      schemaOfTable.forEach((column) => {
        if (column.importValues) {
          column.title = getValueOfSpecifedTable(column.importValues);
          //   column.dataIndex = column.title;
        }
      });

      if (
        JSON.stringify(
          siteSchema.elements.find((table) => table.id === idOfTable).schema
        ) !== JSON.stringify(schemaOfTable)
      ) {
        const payload = { id: idOfTable, schema: schemaOfTable };
        console.log("ind");
        updateSchema(payload);
      }
    });

    //TO DO action to update schemas of tables
  }, [getValueOfSpecifedTable, siteSchema.elements, updateSchema]);
  useEffect(() => {
    const tables = siteSchema.elements.filter(
      (element) => element?.type === "table"
    );
    const getColumnsTables = tables.filter(
      (table) => table.getColumns !== undefined
    );
    console.log({ getColumnsTables });
    getColumnsTables.forEach((table) => {
      const idOfImportTable = table?.getColumns?.id;
      const dataIndexOfImportTable = table?.getColumns?.dataIndex;
      console.log({ idOfImportTable, dataIndexOfImportTable });
      const values = [
        ...getValuesOfAColumn({
          id: idOfImportTable,
          dataIndex: dataIndexOfImportTable,
        }),
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
        console.log("nttrtr");
        console.log(newTable.schema);
        const payload = { id: table.id, schema: newSchemaObject };
        updateSchema(payload);
      }
    });
  }, [getValuesOfAColumn, siteSchema.elements, updateSchema]);
  ///DESPARE in DOUA USEFEECT
  return (
    <>
      <Router>
        <Layout hasSider>
          <Toolbar
            setModalTableGenerator={setModalTableGenerator}
            setModalPageGenerator={setModalPageGenerator}
            country={selectedCountry}
            countryCode={countryCode}
          />

          <PageGeneratorModal
            modalPageGenerator={modalPageGenerator}
            setModalPageGenerator={setModalPageGenerator}
            country={selectedCountry}
          />
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Switch>
              <Route exact path="/">
                <PageStart
                  setSelectedCountry={setSelectedCountry}
                  selectedCountry={selectedCountry}
                  setCountryCode={setCountryCode}
                />
              </Route>
              <Route path="/:country/:pageName">
                <PageRender
                  modalTableGenerator={modalTableGenerator}
                  setModalTableGenerator={setModalTableGenerator}
                  setSelectedCountry={setSelectedCountry}
                  setCountryCode={setCountryCode}
                />
              </Route>
            </Switch>

            <Footer style={{ textAlign: "center" }}>
              Form & Table Generator
            </Footer>
          </Layout>
        </Layout>
      </Router>
    </>
  );
}
function mapStateToProps(state) {
  return {
    siteSchema: state,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addNewElement: (payload) =>
      dispatch({ type: ADD_ELEMENT_TO_SYSTEM, payload: payload }),
    updateSchema: (payload) =>
      dispatch({ type: UPDATE_SCHEMA_TABLE, payload: payload }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
