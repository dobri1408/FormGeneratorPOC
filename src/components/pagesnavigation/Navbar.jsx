import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { DiffOutlined, PlusCircleOutlined } from "@ant-design/icons";
import "./navbar.css";

import { useHistory } from "react-router-dom";
import TabGeneratorModal from "../modals/TabGeneratorModal";
import { connect } from "react-redux";
function Navbar({ pageName, country, siteSchema }) {
  const history = useHistory();
  const [modalTabGenerator, setModalTabGenerator] = useState(0);
  const [tabs, setTabs] = useState([]);
  useEffect(() => {
    setTabs(
      siteSchema[country].find((element) => element.pageName === pageName).tabs
    );
  }, [country, siteSchema, pageName]);
  return (
    <div className="navbar">
      <TabGeneratorModal
        modalTabGenerator={modalTabGenerator}
        setModalTabGenerator={setModalTabGenerator}
        pageName={pageName}
      />
      <div className="inner">
        <Menu mode="horizontal">
          {tabs?.map((tab) => {
            return (
              <Menu.Item
                key={tab.tabName}
                icon={<DiffOutlined />}
                onClick={() => {
                  history.push(`/${country}/${pageName}/${tab.tabName}`);
                }}
              >
                {tab.tabName}
              </Menu.Item>
            );
          })}
          <Menu.Item
            key={"tab new"}
            icon={<PlusCircleOutlined />}
            onClick={() => {
              setModalTabGenerator(true);
            }}
          >
            Add new Tab
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    siteSchema: state,
  };
}
export default connect(mapStateToProps, null)(Navbar);
