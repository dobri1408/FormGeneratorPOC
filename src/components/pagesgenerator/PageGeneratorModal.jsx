import React, { useState } from "react";
import { Modal, Button } from "antd";
import { DiffOutlined } from "@ant-design/icons";
import { Input } from "antd";

import { useHistory } from "react-router-dom";
import { ADD_NEW_PAGE } from "../../redux/constants";
import { connect } from "react-redux";
function PageGeneratorModal({
  modalPageGenerator,
  setModalPageGenerator,
  country,
  addNewPage,
}) {
  const [pageName, setPageName] = useState("Untitled");
  const history = useHistory();

  const handleOk = () => {
    const payload = {
      country: country,
      newPage: { pageName: pageName, tabs: [] },
    };
    addNewPage(payload);
    history.push(`/${country}/${pageName}`);
    setModalPageGenerator(false);
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
function mapDispatchToProps(dispatch) {
  return {
    addNewPage: (payload) => dispatch({ type: ADD_NEW_PAGE, payload: payload }),
  };
}

export default connect(null, mapDispatchToProps)(PageGeneratorModal);
