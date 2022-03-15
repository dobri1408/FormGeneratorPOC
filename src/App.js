import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import Toolbar from "./components/toolbar/Toolbar";
import { Layout } from "antd";
import { UPDATE_SCHEMA_TABLE, ADD_ELEMENT_TO_SYSTEM } from "./redux/constants";
import { useSelector, useDispatch } from "react-redux";
import PageGeneratorModal from "./components/pagesgenerator/PageGeneratorModal";
import PageRender from "./components/pagesgenerator/PageRender";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageStart from "./components/pagesgenerator/PageStart";
import * as TablesSchemas from "./schemas/schemasTables";
import * as InputsSchemas from "./schemas/schemasInputs";
import {
  getValueOfSpecifedTable,
  insertTableIntoRedux,
  insertInputIntoRedux,
  updateDyanmicTables,
  getColumnsFromAnotherTable,
  insertHtmlIntoRedux,
} from "./utils/tables";

const { Footer } = Layout;

function App() {
  const [modalTableGenerator, setModalTableGenerator] = useState(false);
  const [modalPageGenerator, setModalPageGenerator] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const siteSchema = useSelector((state) => state);
  const dispatch = useDispatch();

  //ACTIONS
  const addNewElement = (payload) => {
    dispatch({ type: ADD_ELEMENT_TO_SYSTEM, payload: payload });
  };
  const updateSchema = (payload) => {
    dispatch({ type: UPDATE_SCHEMA_TABLE, payload: payload });
  };

  useEffect(() => {
    if (selectedCountry.length === 0) return;
    const countrySchema = siteSchema[selectedCountry];
    countrySchema.forEach((page) => {
      page?.tabs?.forEach((tab) => {
        tab?.elements?.forEach((element) => {
          if (element.type === "table") {
            insertTableIntoRedux(
              siteSchema,
              TablesSchemas,
              addNewElement,
              element
            );
          } else if (element.type === "input") {
            if (
              siteSchema?.elements?.findIndex(
                (block) => block?.type === "input" && block?.id === element.id
              ) === -1
            ) {
              insertInputIntoRedux(InputsSchemas, element, addNewElement);
            }
          } else if (element.type === "html") {
            if (
              siteSchema?.elements?.findIndex(
                (block) => block?.type === "html" && block?.id === element.id
              ) === -1
            ) {
              insertHtmlIntoRedux(element, addNewElement);
            }
          }
        });
      });
    });
  }, [addNewElement, selectedCountry, siteSchema]);

  useEffect(() => {
    updateDyanmicTables(siteSchema, TablesSchemas, updateSchema);
    getColumnsFromAnotherTable(siteSchema, TablesSchemas, updateSchema);
  }, [siteSchema, siteSchema.elements, updateSchema]);

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

export default App;
