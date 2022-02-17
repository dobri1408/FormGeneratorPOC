import React, { useState } from "react";

import { Layout } from "antd";
import { PageHeader } from "antd";
import ReactCountryFlag from "react-country-flag";
import { countries } from "../../data/countries";
import { siteSchema } from "../../schemas";
import { useHistory } from "react-router-dom";
import "./pagestart.css";
const { Header, Content } = Layout;
function PageStart({ setSelectedCountry, setCountryCode }) {
  const history = useHistory();

  const redirectToFirstPageOfCountry = (country) => {
    const firstPage = siteSchema[country][0].pageName;
    history.push(`/${country}/${firstPage}`);
  };
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
                    <li
                      className="list-item-country"
                      onClick={() => {
                        setSelectedCountry(country.countryName.toLowerCase());
                        setCountryCode(country.countryCode);
                        redirectToFirstPageOfCountry(
                          country.countryName.toLowerCase()
                        );
                      }}
                    >
                      <ReactCountryFlag
                        countryCode={country.countryCode}
                        svg
                        style={{
                          width: "180px",
                          height: "100px",

                          border: "1px solid #efefef",
                        }}
                      />
                      <h3>{country.countryName}</h3>
                    </li>
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
