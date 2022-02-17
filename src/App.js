import "./App.css";
import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import Toolbar from "./components/toolbar/Toolbar";
import { Layout } from "antd";

import PageGeneratorModal from "./components/pagesgenerator/PageGeneratorModal";

import PageRender from "./components/pagesgenerator/PageRender";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageStart from "./components/pagesgenerator/PageStart";
import * as TablesSchemas from "./schemas/schemasTables";
import { connect } from "react-redux";
import { ADD_ELEMENT_TO_SYSTEM } from "./redux/constants";
const { Footer } = Layout;

function App({ siteSchema, addNewElement }) {
  const [modalTableGenerator, setModalTableGenerator] = useState(false);
  const [modalPageGenerator, setModalPageGenerator] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  console.log({ siteSchema });
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
                data: TablesSchemas[element.nameTable].initialData,
                schema: TablesSchemas[element.nameTable].schema,
              };

              addNewElement(payload);
            }
          }
        });
      });
    });
  }, [selectedCountry]);
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
