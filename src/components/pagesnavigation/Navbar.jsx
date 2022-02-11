import React, { useState } from "react";
import { Menu } from "antd";
import { DiffOutlined, PlusCircleOutlined } from "@ant-design/icons";
import "./navbar.css";

import { useHistory } from "react-router-dom";
import TabGeneratorModal from "../modals/TabGeneratorModal";
function Navbar({ pageName,countrySchema,country }) {
  const history = useHistory();
  let foundIndex = countrySchema.findIndex((x) => x.pageName === pageName);
  const tabs = countrySchema[foundIndex].tabs;
  const [modalTabGenerator, setModalTabGenerator] = useState(0);
  return (
    <div className="navbar">
      <TabGeneratorModal
        modalTabGenerator={modalTabGenerator}
        setModalTabGenerator={setModalTabGenerator}
        pageName={pageName}
      />
      <div className="inner">
        <Menu mode="horizontal">
          {tabs.map((tab) => {
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

export default Navbar;
