import React from "react";
import { Widgets } from "./widgets";
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
        };
        return Widgets[block.type](props);
      })}
    </>
  );
}

export default FieldGenerator;
