import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { DiffOutlined } from "@ant-design/icons";
import "./Toolbar.css";
import { useHistory } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import { useSelector } from "react-redux";
const { Sider } = Layout;

function Toolbar({ country, countryCode }) {
  const history = useHistory();
  const [pages, setPages] = useState([]);
  const siteSchema = useSelector((state) => state);

  useEffect(() => {
    if (country) {
      const countrySchema = siteSchema[country];
      setPages(countrySchema.map((e) => e.pageName));
    }
  }, [country, siteSchema]);

  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0
      }}
    >
      <div className="logo">
        {country && (
          <ReactCountryFlag
            countryCode={countryCode}
            svg
            style={{
              height: "80px",
              width: "80px",
              marginLeft: "30%"
            }}
          />
        )}
      </div>
      {country && (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
          {pages?.map((page) => {
            return (
              <Menu.Item
                key={page}
                icon={<DiffOutlined />}
                onClick={() => {
                  history.push(`/${country}/${page}`);
                }}
              >
                {page}
              </Menu.Item>
            );
          })}
        </Menu>
      )}
    </Sider>
  );
}

export default Toolbar;
