import React from "react";
import { Modal, Button } from "antd";
import { TableOutlined } from "@ant-design/icons";
import { tables } from "../../data/index";
import { siteSchema } from "../../data/siteschema";
import "../../styles/tablegenerator.css";
function TableGeneratorModal({
  modalTableGenerator,
  setModalTableGenerator,
  pageName,
  tabName,
}) {
  const handleOk = (table) => {
    let foundIndex = siteSchema.findIndex((x) => x.pageName === pageName);

    let tabIndex = siteSchema[foundIndex].tabs.findIndex(
      (x) => x.tabName === tabName
    );
    !("elements" in siteSchema[foundIndex].tabs[tabIndex]) &&
      (siteSchema[foundIndex].tabs[tabIndex].elements = []);
    siteSchema[foundIndex].tabs[tabIndex]?.elements?.push({
      type: "table",
      nameTable: table.name,
    });

    setModalTableGenerator(false);
  };

  const handleCancel = () => {
    setModalTableGenerator(false);
  };

  return (
    <Modal
      title="Select Table"
      visible={modalTableGenerator}
      onCancel={handleCancel}
    >
      <ul>
        {tables.map((table) => {
          return (
            <div>
              <li>
                <Button
                  type="primary"
                  size="large"
                  icon={<TableOutlined />}
                  onClick={() => {
                    handleOk(table);
                  }}
                >
                  {table.name}
                </Button>
              </li>
            </div>
          );
        })}
      </ul>
    </Modal>
  );
}

export default TableGeneratorModal;
