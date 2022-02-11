import React, { useState } from "react";
import { Modal, Button } from "antd";
import { DiffOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { siteSchema } from "../../../data/siteschema";
import { useHistory } from "react-router-dom";
function TabGeneratorModal({
  modalTabGenerator,
  setModalTabGenerator,
  pageName,
}) {
  const [tabName, setTabName] = useState("Untitled");
  const history = useHistory();

  const handleOk = (table) => {
    let foundIndex = siteSchema.findIndex((x) => x.pageName === pageName);
    siteSchema[foundIndex].tabs.push({ tabName: tabName, elements: [] });
    setModalTabGenerator(false);
    //   history.push(`/${pageName}$${tabName}`);
  };

  const handleCancel = () => {
    setModalTabGenerator(false);
  };
  return (
    <Modal
      title="Create New Tab"
      visible={modalTabGenerator}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <Input
        size="large"
        placeholder="Untitled"
        prefix={<DiffOutlined />}
        onChange={(e) => {
          setTabName(e.target.value);
        }}
      />
    </Modal>
  );
}

export default TabGeneratorModal;
