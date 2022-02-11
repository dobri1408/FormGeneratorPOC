import React, { useState } from "react";

import { Layout } from "antd";
import { PageHeader } from "antd";
import ReactCountryFlag from "react-country-flag"
import { countries } from "../../data/countries";
import "./pagestart.css"
const { Header, Content } = Layout;
function PageStart({ modalTableGenerator, setModalTableGenerator, setCountrySelected }) {
  return (
    <div>
      <Header className="site-layout-background" style={{ padding: 0 }}>
        <PageHeader title={"Countries"} />
      </Header>

      <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, textAlign: "center" }}
        >
          <div
            style={{
              display: "inline-block",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ul className="list-country">
              {countries.map((country) => {
                return (
                  <> 
                  <li className="list-item-country" onClick={()=>{setCountrySelected(country)}}>
     <h3>{country.nameCountry} </h3>
                    <ReactCountryFlag
                countryCode={country.countryCode}
                svg
                style={{
                     width: "180px",
    height: "100px",

    border: "1px solid #efefef",
                }}
                title="US"
            />
          <h3> {country.name}</h3>
            </li>
            <h3> {country.name} </h3>
            </> 
                );
              })}
            </ul>
          </div>
        </div>
      </Content>
    </div>
  );
}

export default PageStart;
