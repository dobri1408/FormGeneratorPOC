import React from "react";
import { Modal, Button } from "antd";
import { TableOutlined } from "@ant-design/icons";
import { forms } from "../../data/index";

import "../../styles/tablegenerator.css";
function FormGeneratorModal({
  modalFormGenerator,
  setModalFormGenerator,
  pageName,
  tabName,
}) {
  const handleOk = (form) => {
    //TODO
    setModalFormGenerator(false);
  };

  const handleCancel = () => {
    setModalFormGenerator(false);
  };

  return (
    <Modal
      title="Select Table"
      visible={modalFormGenerator}
      onCancel={handleCancel}
    >
      <ul>
        {forms.map((form) => {
          return (
            <div>
              <li>
                <Button
                  type="primary"
                  size="large"
                  icon={<TableOutlined />}
                  onClick={() => {
                    handleOk(form);
                  }}
                >
                  {form.name}
                </Button>
              </li>
            </div>
          );
        })}
      </ul>
    </Modal>
  );
}

export default FormGeneratorModal;
