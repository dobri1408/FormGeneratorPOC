import React, { useEffect } from "react";
import { Widgets } from "./widgets";
import { connect } from "react-redux";
function FieldGenerator({ tabSchema, pageName, tabName, siteSchema }) {
  const checkVisibility = (visibility) => {
    let show = true;

    visibility.forEach((condition) => {
      const element = siteSchema.elements.find(
        (element) => parseInt(element.id) === parseInt(condition.id)
      );
      condition.dependencies.forEach((dependency) => {
        if (element.data[dependency.key] != dependency.value) show = false;
      });
    });
    return show;
  };
  return (
    <>
      {tabSchema?.elements?.map((block, index) => {
        let show = true;

        if (block.visibility) {
          show = false;
          show = checkVisibility(block.visibility);
        }
        let props = {
          block: block,
          index: index,
          pageName: pageName,
          tabName: tabName,

          id: block.id,
          name: block?.name
        };
        return show && Widgets[block.type](props);
      })}
    </>
  );
}
function mapStateToProps(state) {
  return {
    siteSchema: state
  };
}
export default connect(mapStateToProps, null)(FieldGenerator);
