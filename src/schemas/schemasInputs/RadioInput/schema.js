const schema = {
  type: "object",
  properties: {
    exampleRadioEnum: {
      type: "string",
      enum: ["Nu vreau tabel", "Vreau Tabel"],
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
  exampleRadioEnum: "Vreau Tabel",
};

export const RadioInput = {
  schema: schema,
  uiSchema: uiSchema,
  data: data,
};
