import React, { useState, useEffect, useContext, useRef } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Table, Input, Button, Popconfirm, Form } from "antd";
import { INSERT_ROW, UPDATE_TABLE } from "../../../redux/constants";
import "./TableRender.css";
import * as Validations from "../../../CellValidationsFunction/index";
import { CiOutlined } from "@ant-design/icons";
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  tableData,
  validator,
  defaultValuesRow,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex]
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`
          },
          {
            validator: validator
          }
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: "24",
          backgroundColor:
            defaultValuesRow !== undefined &&
            children[1] != defaultValuesRow[dataIndex]
              ? "gold"
              : "white"
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

function TableRender({ id }) {
  const tableData = useSelector((state) =>
    state.elements.find((element) => element.id === id)
  );

  const [numRows, setNumRows] = useState(tableData.data.length);
  const [validationsOfTable, setValidationsOfTable] = useState({});

  const dispatch = useDispatch();
  const handleAdd = () => {
    const newRow = {};
    newRow.key = numRows + 1;
    setNumRows(numRows + 1);
    tableData.schema.forEach((column) => {
      newRow[column.dataIndex] = "";
    });
    insertRow(newRow, newRow);
  };
  const updateRow = (row) => {
    const newData = Object.assign(tableData);
    const index = newData.data.findIndex((item) => row.key === item.key);
    const item = newData.data[index];

    newData.data.splice(index, 1, { ...item, ...row });

    dispatch({
      type: UPDATE_TABLE,
      payload: { id: id, tableData: newData }
    });
  };
  const insertRow = (row, defaultRow = null) => {
    const newData = Object.assign(tableData);
    newData.data.push(row);
    if (defaultRow != null) newData.defaultValues.push(defaultRow);
    dispatch({
      type: UPDATE_TABLE,
      payload: { id: id, tableData: newData }
    });
  };
  //CELL VALIDATION
  useEffect(() => {
    const newObjectValidations = {};
    tableData.schema?.forEach((column) => {
      newObjectValidations[column?.dataIndex] = [];
      column?.validation?.forEach((validation) => {
        newObjectValidations[column.dataIndex].push({
          nameFunction: validation?.substr(
            0,
            validation?.indexOf("=") !== -1
              ? validation?.indexOf("=")
              : validation?.length
          ),
          parameter:
            validation?.indexOf("=") !== -1
              ? validation?.substr(
                  validation?.indexOf("=") + 1,
                  validation?.length
                )
              : null
        });
      });
    });
    setValidationsOfTable(newObjectValidations);
  }, [tableData]);
  //SAVE MODIFICATIONS ON CELL
  const handleSave = (row) => {
    updateRow(row);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  };
  const columns = tableData?.schema.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
        validator: validator,
        defaultValuesRow: tableData.defaultValues.find(
          (row) => row.key === record.key
        )
      })
    };
  });
  const validator = (rule, value, callback) => {
    const column = rule.field;
    validationsOfTable[column]?.forEach((validation) => {
      let result;
      if (validation.parameter === null)
        result = Validations[validation.nameFunction](value);
      else
        result = Validations[validation.nameFunction](
          value,
          validation.parameter
        );
      if (result !== true) {
        callback(result);
        return;
      }
    });

    callback();
  };

  return (
    <>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16
        }}
      >
        Add a row
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={[...tableData.data]}
        columns={columns}
      />
    </>
  );
}

export default TableRender;
