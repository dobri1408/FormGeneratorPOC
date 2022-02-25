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
    console.log(rowIndexOfSpecifedTable);
    console.log(
      siteSchema?.elements[specifedTableIndex]?.data[rowIndexOfSpecifedTable]
    );
    return siteSchema?.elements[specifedTableIndex]?.data[
      rowIndexOfSpecifedTable
    ][specifedTable.dataIndex];
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
              };
              console.log(TablesSchemas[element.nameTable]);
              if (TablesSchemas[element.nameTable].visibility?.length > 0) {
                payload.visibility = [
                  ...TablesSchemas[element.nameTable]?.visibility,
                ];
                console.log({ payload });
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
    console.log("intru");
    const tables = siteSchema.elements.filter(
      (element) => element?.type === "table"
    );
    const importValuesTables = tables.filter(
      (table) => TablesSchemas[table.nameTable]?.dynamic === true
    );
    console.log(importValuesTables);
    importValuesTables.forEach((table) => {
      const schemaOfTable = [...TablesSchemas[table.nameTable].schema];
      const idOfTable = table.id;
      schemaOfTable.forEach((column) => {
        if (column.importValues) {
          column.title = getValueOfSpecifedTable(column.importValues);
          //   column.dataIndex = column.title;
        }
      });
      console.log({ schemaOfTable });
      if (
        JSON.stringify(
          siteSchema.elements.find((table) => table.id === idOfTable).schema
        ) !== JSON.stringify(schemaOfTable)
      ) {
        const payload = { id: idOfTable, schema: schemaOfTable };
        updateSchema(payload);
      }
    });
    //TO DO action to update schemas of tables
  }, [getValueOfSpecifedTable, siteSchema.elements]);
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
