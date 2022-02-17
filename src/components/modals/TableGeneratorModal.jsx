import React from "react";
import { Modal, Button } from "antd";
import { TableOutlined } from "@ant-design/icons";
import { tables } from "../../data/index";

import "../../styles/tablegenerator.css";
function TableGeneratorModal({
  modalTableGenerator,
  setModalTableGenerator,
  pageName,
  tabName,
}) {
  const handleOk = (table) => {
    //To DO

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
