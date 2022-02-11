import React from "react";
import { Layout, Menu } from "antd";
import { TableOutlined, DiffOutlined } from "@ant-design/icons";
import "./Toolbar.css";
import { siteSchema } from "../../data/siteschema";
import { useHistory } from "react-router-dom";
const { Sider } = Layout;

function Toolbar({ setModalPageGenerator, countrySelected }) {
  const history = useHistory();
  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
        <Menu.Item
          key="2"
          icon={<DiffOutlined />}
          onClick={() => {
            setModalPageGenerator(true);
          }}
        >
          Add new page
        </Menu.Item>
        {siteSchema.map((page) => {
          return (
            <Menu.Item
              key={page.pageName}
              icon={<DiffOutlined />}
              onClick={() => {
                history.push(`/${countrySelected}/${page.pageName}`);
              }}
            >
              {page.pageName}
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
}

export default Toolbar;
