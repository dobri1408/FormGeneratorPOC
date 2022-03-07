const schema = {
  type: "object",
  properties: {
    exampleRadioEnum: {
      type: "string",
      enum: ["Default Table", "Custom Table"],
    },
  },
};

const uiSchema = {
  type: "Control",
  scope: "#/properties/exampleRadioEnum",
  options: {
    format: "radio",
  },
};

export const data = {
  exampleRadioEnum: "Default Table",
};

export const RadioInput = {
  schema: schema,
  uiSchema: uiSchema,
  data: data,
};
