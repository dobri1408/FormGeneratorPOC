import FormRender from "./formrender/FormRender";
import TableRender from "./tablerender/TableRender";
import TextEditor from "./quill/TextEditor";

export const Widgets = {
  form: (props) => {
    return (
      <>
        <FormRender formName={props.block.nameForm} />
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
        <TableRender
          pageName={props.pageName}
          tabName={props.tabName}
          nameTable={props.block.nameTable}
          indexTable={props.index}
        />
        <br />
        <br />
      </>
    );
  },
};
