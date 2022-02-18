import React, { useEffect } from "react";
import { Widgets } from "./widgets";
import { connect } from "react-redux";
function FieldGenerator({
  tabSchema,
  pageName,
  configurationQuill,
  setConfigurationQuill,
  tabName,
}) {
  return (
    <>
      {tabSchema?.elements?.map((block, index) => {
        let props = {
          configurationQuill: configurationQuill,
          block: block,
          index: index,
          pageName: pageName,
          tabName: tabName,
          setConfigurationQuill: setConfigurationQuill,
          id: block.id,
        };
        return Widgets[block.type](props);
      })}
    </>
  );
}
function mapStateToProps(state) {
  return {
    siteSchema: state,
  };
}
export default connect(mapStateToProps, null)(FieldGenerator);
