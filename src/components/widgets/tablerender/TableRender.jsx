import React, { useState, useEffect, useContext, useRef } from "react";
import { connect } from "react-redux";
import { Table, Input, Button, Popconfirm, Form } from "antd";
import { ADD_ROW_TO_TABLE } from "../../../redux/constants";
import "./TableRender.css";

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
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

function TableRender({ id, elements, addNewRow }) {
  const [tableData, setTableData] = useState();
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    const newData = {};
    newData.key = (count + 1).toString();
    tableData.schema.forEach((column) => {
      newData[column.dataIndex] = "Bucuresti";
    });
    let newElementsArray = [...elements];
    const tableObject = Object.assign(tableData);
    tableObject.data.push(newData);
    let elementsIndexTable = newElementsArray.findIndex(
      (element) => element.id === id
    );
    newElementsArray[elementsIndexTable] = tableObject;
    setTableData({ ...tableData, data: [...tableData.data, tableObject] });
    addNewRow(newElementsArray);
  };
  const handleAddNewData = (tableObject) => {
    setTableData(tableObject);
    console.log(tableData);
  };
  const handleSave = (row) => {
    const newData = Object.assign(tableData);
    const index = newData.data.findIndex((item) => row.key === item.key);
    const item = newData.data[index];
    newData.data.splice(index, 1, { ...item, ...row });

    let newElementsArray = [...elements];
    let elementsIndexTable = newElementsArray.findIndex(
      (element) => element.id === id
    );

    const tableObject = Object.assign(newData);
    newElementsArray[elementsIndexTable] = tableObject;
    addNewRow(newElementsArray);
    handleAddNewData(tableObject);
  };

  useEffect(() => {
    setTableData(elements.find((element) => element.id === id));
  }, []);
  useEffect(() => {
    if (tableData) setCount(tableData.data.length);
  }, [tableData]);
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
      }),
    };
  });
  console.log(tableData);
  return (
    <>
      {tableData && (
        <>
          <Button
            onClick={handleAdd}
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            Add a row
          </Button>
          <Table
            components={components}
            rowClassName={() => "editable-row"}
            bordered
            dataSource={elements.find((element) => element.id === id).data}
            columns={columns}
          />
        </>
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    elements: state.elements,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addNewRow: (payload) =>
      dispatch({ type: ADD_ROW_TO_TABLE, payload: payload }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TableRender);
