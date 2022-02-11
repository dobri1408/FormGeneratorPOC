/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import { kaReducer, Table } from "ka-table";
import { updateData } from "ka-table/actionCreators";
import { kaPropsUtils } from "ka-table/utils";
import { ActionType } from "ka-table/enums";
import { deleteRow } from "ka-table/actionCreators";
import "../../../App.css";

import { siteSchema } from "../../../data/siteschema";
const DeleteRow = ({ dispatch, rowKeyValue }) => {
  return (
    <img
      src="https://komarovalexander.github.io/ka-table/static/icons/delete.svg"
      className="delete-row-column-button"
      onClick={() => dispatch(deleteRow(rowKeyValue))}
      alt=""
    />
  );
};
function TableRender({ nameTable, pageName, tabName, indexTable }) {
  const {
    tablePropsInit,
  } = require(`../../../data/table/${nameTable}/TableSchema.js`);
  const jsonData = require(`../../../data/table/${nameTable}/TableData.json`);
  const {
    ComplexValidation,
  } = require(`../../../data/table/${nameTable}/ComplexValidation.js`);
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dataOfTable = kaPropsUtils.getData(tableProps);
  const [error, setError] = useState("");
  const dispatch = async (action) => {
    changeTableProps((prevState) => kaReducer(prevState, action));
    if (action.type === ActionType.LoadData) {
      dispatch(updateData(jsonData));
    }
  };

  useEffect(() => {
    if (siteSchema.length === 0) return;
    if (!dataOfTable.length) return;
    const error = ComplexValidation(dataOfTable);
    if (error !== 0) {
      setError(error);
      let foundIndex = siteSchema.findIndex((x) => x.pageName === pageName);
      if (foundIndex === -1) {
        return;
      }
      let tabIndex = siteSchema[foundIndex].tabs.findIndex(
        (x) => x.tabName === tabName
      );
      if (tabIndex === -1) {
        return;
      }
      !("errors" in siteSchema[foundIndex]?.tabs[tabIndex]) &&
        (siteSchema[foundIndex].tabs[tabIndex].errors = []);
      if (foundIndex === -1) {
        return;
      }
      let indexError = siteSchema[foundIndex].tabs[tabIndex]?.errors?.findIndex(
        (x) => x.errorId === pageName + tabName + indexTable
      );
      if (indexError === -1) {
        siteSchema[foundIndex].tabs[tabIndex]?.errors?.push({
          errorId: pageName + tabName + indexTable,
          errorMessage: error,
        });
      }
    } else {
      setError(null);
      let foundIndex = siteSchema.findIndex((x) => x.pageName === pageName);
      let tabIndex = siteSchema[foundIndex].tabs.findIndex(
        (x) => x.tabName === tabName
      );
      if (tabIndex === -1) {
        return;
      }

      !("errors" in siteSchema[foundIndex]?.tabs[tabIndex]) &&
        (siteSchema[foundIndex].tabs[tabIndex].errors = []);
      let indexError = siteSchema[foundIndex].tabs[tabIndex]?.errors?.findIndex(
        (x) => x.errorId === pageName + tabName + indexTable
      );
      if (indexError === -1) return;
      siteSchema[foundIndex].tabs[tabIndex].errors.splice(indexError, 1);
    }
  }, [dataOfTable]);

  return (
    <>
      <div className="remote-data-demo">
        <Table
          {...tableProps}
          dispatch={dispatch}
          childComponents={{
            cellText: {
              content: (props) => {
                switch (props.column.key) {
                  case ":delete":
                    return <DeleteRow {...props} />;
                }
              },
            },
          }}
        />
      </div>
      <div className="error">{error}</div>
    </>
  );
}

export default TableRender;
