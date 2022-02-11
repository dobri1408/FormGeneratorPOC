import React from "react";
import Form from "@rjsf/antd";
function FormRender({ formName }) {
  const uischema = require(`../../../data/forms/${formName}/uischema.json`);
  const schema = require(`../../../data/forms/${formName}/schema.json`);
  const { dataForm } = require(`../../../data/forms/${formName}/data.js`);
  return (
    <div style={{ background: "whitesmoke" }}>
      <div style={{ padding: "20px" }}>
        <Form schema={schema} uischema={uischema} data={dataForm} />
      </div>
    </div>
  );
}

export default FormRender;
