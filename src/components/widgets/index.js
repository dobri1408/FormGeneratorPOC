import FormRender from "./formrender/FormRender";
import TableRender from "./tablerender/TableRender";
import HtmlRender from "./htmlrender/HtmlRender";
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

  table: (props) => {
    return (
      <>
        <TableRender id={props.id} name={props.name} />
        <br />
        <br />
      </>
    );
  },
  html: (props) => {
    return (
      <>
        <HtmlRender id={props.id} />
        <br />
        <br />
      </>
    );
  },
};
