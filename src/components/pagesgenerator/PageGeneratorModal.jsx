import React, { useState } from "react";
import { Modal, Button } from "antd";
import { DiffOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { siteSchema } from "../../data/siteschema";
import { useHistory } from "react-router-dom";
function PageGeneratorModal({ modalPageGenerator, setModalPageGenerator }) {
  const [pageName, setPageName] = useState("Untitled");
  const history = useHistory();

  const handleOk = (table) => {
    siteSchema.push({
      pageName: pageName,
      tabs: [{ tabName: "start", elements: [] }],
    });
    setModalPageGenerator(false);
    history.push(`/${pageName}`);
  };

  const handleCancel = () => {
    setModalPageGenerator(false);
  };
  return (
    <Modal
      title="Create New Page"
      visible={modalPageGenerator}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <Input
        size="large"
        placeholder="Untitled"
        prefix={<DiffOutlined />}
        onChange={(e) => {
          setPageName(e.target.value);
        }}
      />
    </Modal>
  );
}

export default PageGeneratorModal;
