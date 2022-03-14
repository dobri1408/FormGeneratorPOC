import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { useParams } from "react-router-dom";
import { PageHeader, Button } from "antd";

import { v4 as uuidv4 } from "uuid";
import TableGeneratorModal from "../modals/TableGeneratorModal";
import FormGeneratorModal from "../modals/FormGeneratorModal";
import FieldGenerator from "../FieldGenerator";
import Navbar from "../pagesnavigation/Navbar";
import { connect } from "react-redux";
import { countries } from "../../data/countries";
import { Validations } from "../Validation";
import {
  openErrorNotification,
  openSuccessNotification
} from "../notification/SaveNotification";

const { Header, Content } = Layout;
function PageRender({
  modalTableGenerator,
  setModalTableGenerator,
  setSelectedCountry,
  setCountryCode,
  siteSchema,
  addNewElement
}) {
  let { country, pageName } = useParams();
  const countrySchema = siteSchema[country];

  const [tabName, setTabName] = useState("");
  const [tabSchema, setTabSchema] = useState([]);
  const [pageSchema, setPageSchema] = useState([]);

  const [modalFormGenerator, setModalFormGenerator] = useState(false);

  ///USEEFFECTS
  useEffect(() => {
    if (country) {
      let countryCode = countries.find(
        (element) => element.countryName.toLowerCase() === country
      ).countryCode;
      setSelectedCountry(country);
      setCountryCode(countryCode);
    }
    const url = window.location.href;
    const lastSegment = url.split("/").pop();
    if (lastSegment === pageName) {
      if (pageSchema?.tabs?.length > 0) setTabName(pageSchema.tabs[0].tabName);
    } else setTabName(lastSegment);
  }, [pageSchema, window.location.href]);

  const checkErrors = () => {
    let errors = false;
    for (let key in Validations[country]) {
      let result = Validations[country][key](siteSchema.elements);

      if (result.error === true) {
        openErrorNotification(result.errorMessage);
        errors = true;
      }
    }

    return errors;
  };

  useEffect(() => {
    if (!pageName.length) return;
    setPageSchema(
      countrySchema.find((element) => element.pageName === pageName)
    );
  }, [pageName, countrySchema]);
  useEffect(() => {
    if (pageSchema.length === 0 || tabName.length === 0) return;

    setTabSchema(pageSchema.tabs.find((tab) => tab.tabName === tabName));
  }, [pageSchema, tabName, countrySchema]);

  return (
    <div>
      <Header className="site-layout-background" style={{ padding: 0 }}>
        <PageHeader
          onBack={() => window.history.back()}
          title={pageName}
          extra={[
            <Button
              key="4"
              type="primary"
              onClick={() => {
                if (checkErrors() === false) openSuccessNotification();
              }}
            >
              Save
            </Button>
          ]}
        />
      </Header>

      {pageName.length && (
        <>
          {" "}
          <Navbar
            pageName={pageName}
            currentTab={tabName}
            countrySchema={countrySchema}
            country={country}
          />
          <TableGeneratorModal
            modalTableGenerator={modalTableGenerator}
            setModalTableGenerator={setModalTableGenerator}
            pageName={pageName}
            tabName={tabName}
          />
          <FormGeneratorModal
            modalFormGenerator={modalFormGenerator}
            setModalFormGenerator={setModalFormGenerator}
            pageName={pageName}
            tabName={tabName}
          />
        </>
      )}
      <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, textAlign: "center" }}
        >
          <div
            style={{
              display: "inline-block",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <FieldGenerator
              tabSchema={tabSchema}
              pageName={pageName}
              tabName={tabName}
            />
          </div>
        </div>
      </Content>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    siteSchema: state
  };
}

export default connect(mapStateToProps, null)(PageRender);
