import React, { useState, useEffect, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Input, Button, Form } from "antd";
import { UPDATE_TABLE } from "../../../redux/constants";
import "./TableRender.css";
import * as Validations from "../../../CellValidationsFunction/index";
import * as Popovers from "../../../utils/popovers";
import * as Footers from "../../../utils/footers";
import { validations, footersFunction, popovers } from "./utils";
import { Popover } from "antd";

const renderPopover = (
  value,
  row,
  column,
  tableData,
  popoverFunction,
  children
) => {
  if (!value || !row || !column || !tableData) return;
  let props = {
    value: value,
    row: row,
    column: column,
    tableData: Object.assign(tableData),
  };

  let result = Popovers[popoverFunction](props);
  if (result) return <Popover content={result}>{children}</Popover>;
  return <>{children}</>;
};
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
  popoversFunctions,
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
      [dataIndex]: record[dataIndex],
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
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
          {
            validator: validator,
          },
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
              : "white",
        }}
        onClick={toggleEdit}
      >
        {popoversFunctions.length > 0
          ? popoversFunctions?.map((functionName) =>
              renderPopover(
                children,
                record.key,
                dataIndex,
                tableData,
                functionName,
                children
              )
            )
          : children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

function TableRender({ id, name }) {
  const tableData = useSelector((state) => {
    const found = state.elements.find((element) => element.id === id);
    return found;
  });
  const elements = useSelector((state) => {
    return state.elements;
  });
  const [numRows, setNumRows] = useState(tableData.data.length);
  const [validationsOfTable, setValidationsOfTable] = useState({});
  const [popoversObject, setPopoversObject] = useState({});
  const [footers, setFooters] = useState([]);
  const dispatch = useDispatch();

  const handleAdd = () => {
    const newRow = {};
    newRow.key = numRows + 1;
    setNumRows(numRows + 1);
    tableData.schema.forEach((column) => {
      newRow[column.dataIndex] = "";
    });
    insertRow(newRow, newRow);
    console.log({ tableData });
  };

  const updateRow = (row) => {
    const newData = Object.assign(tableData);
    const index = newData.data.findIndex((item) => row.key === item.key);
    const item = newData.data[index];

    newData.data.splice(index, 1, { ...item, ...row });

    dispatch({
      type: UPDATE_TABLE,
      payload: { id: id, tableData: newData },
    });
  };
  const insertRow = (row, defaultRow = null) => {
    const newData = Object.assign(tableData);
    newData.data.push(row);
    if (defaultRow != null) newData.defaultValues.push(defaultRow);
    dispatch({
      type: UPDATE_TABLE,
      payload: { id: id, tableData: newData },
    });
  };

  useEffect(() => {
    footersFunction(tableData, Footers, setFooters);
  }, [elements, tableData]);

  useEffect(() => {
    validations(tableData, setValidationsOfTable);
    popovers(tableData, setPopoversObject);
  }, [tableData]);
  //SAVE MODIFICATIONS ON CELL
  const handleSave = (row) => {
    updateRow(row);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
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
        tableData: Object.assign(tableData) || {},
        validator: validator,
        defaultValuesRow: tableData.defaultValues.find(
          (row) => row.key === record.key
        ),
        popoversFunctions:
          popoversObject[col.dataIndex]?.length > 0
            ? popoversObject[col.dataIndex]
            : [],
      }),
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
      <div className="table-header">
        <p>
          T{id} - {name}
        </p>
        <Button
          onClick={handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button>
      </div>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={[...tableData.data]}
        columns={columns}
        pagination={false}
      />
      {footers?.map((footer) => (
        <div className="footer">
          <span className="left">{footer.name}</span>
          <span className="right">{footer.value}</span>
        </div>
      ))}
    </>
  );
}

export default TableRender;
