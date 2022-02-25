import FormRender from "./formrender/FormRender";
import TableRender from "./tablerender/TableRender";
import TextEditor from "./quill/TextEditor";

export const Widgets = {
  input: (props) => {
    return (
      <>
        <FormRender id={props.id} />
        <br />
        <br />
      </>
    );
  },
  quill: (props) => {
    return (
      <>
        <TextEditor
          content={props.block.content}
          configurationQuill={props.configurationQuill}
          setConfigurationQuill={props.setConfigurationQuill}
          id={props.block.id}
          tabName={props.tabName}
          pageName={props.pageName}
        />
        <br />
        <br />
      </>
    );
  },
  table: (props) => {
    return (
      <>
        <TableRender id={props.id} />
        <br />
        <br />
      </>
    );
  },
};
