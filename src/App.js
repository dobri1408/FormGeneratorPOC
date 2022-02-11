import "./App.css";
import React, { useState } from "react";
import "antd/dist/antd.css";
import Toolbar from "./components/toolbar/Toolbar";
import { Layout } from "antd";

import PageGeneratorModal from "./components/pagesgenerator/PageGeneratorModal";

import PageRender from "./components/pagesgenerator/PageRender";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageStart from "./components/pagesgenerator/PageStart";
import { siteSchema } from "./schemas/index";
const { Footer } = Layout;

function App() {
  const [modalTableGenerator, setModalTableGenerator] = useState(false);
  const [modalPageGenerator, setModalPageGenerator] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");

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
