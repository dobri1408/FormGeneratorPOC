import React, { useState } from "react";
import { Modal, Button } from "antd";
import { DiffOutlined } from "@ant-design/icons";
import { Input } from "antd";

import { useHistory } from "react-router-dom";
function TabGeneratorModal({
  modalTabGenerator,
  setModalTabGenerator,
  pageName,
}) {
  const [tabName, setTabName] = useState("Untitled");
  const history = useHistory();

  const handleOk = (table) => {
    //todo
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
