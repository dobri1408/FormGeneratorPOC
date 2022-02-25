import React, { useEffect } from "react";
import { Widgets } from "./widgets";
import { connect } from "react-redux";
function FieldGenerator({
  tabSchema,
  pageName,
  configurationQuill,
  setConfigurationQuill,
  tabName,
  siteSchema,
}) {
  const checkVisibility = (visibility) => {
    let show = true;
    console.log({ visibility });
    visibility.forEach((condition) => {
      const element = siteSchema.elements.find(
        (element) => parseInt(element.id) === parseInt(condition.id)
      );
      condition.dependencies.forEach((dependency) => {
        console.log(element.data);
        console.log(dependency.key);
        if (element.data[dependency.key] != dependency.value) show = false;
      });
    });
    return show;
  };
  return (
    <>
      {tabSchema?.elements?.map((block, index) => {
        let show = true;
        console.log({ block });
        if (block.visibility) {
          show = false;
          show = checkVisibility(block.visibility);
        }
        let props = {
          configurationQuill: configurationQuill,
          block: block,
          index: index,
          pageName: pageName,
          tabName: tabName,
          setConfigurationQuill: setConfigurationQuill,
          id: block.id,
        };
        return show && Widgets[block.type](props);
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
