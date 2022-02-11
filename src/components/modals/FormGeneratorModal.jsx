import React from "react";
import { Modal, Button } from "antd";
import { TableOutlined } from "@ant-design/icons";
import { forms } from "../../data/index";
import { siteSchema } from "../../data/siteschema";
import "../../styles/tablegenerator.css";
function FormGeneratorModal({
  modalFormGenerator,
  setModalFormGenerator,
  pageName,
  tabName,
}) {
  const handleOk = (form) => {
    let foundIndex = siteSchema.findIndex((x) => x.pageName === pageName);

    let tabIndex = siteSchema[foundIndex].tabs.findIndex(
      (x) => x.tabName === tabName
    );
    !("elements" in siteSchema[foundIndex].tabs[tabIndex]) &&
      (siteSchema[foundIndex].tabs[tabIndex].elements = []);
    siteSchema[foundIndex].tabs[tabIndex]?.elements?.push({
      type: "form",
      nameForm: form.name,
    });

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
