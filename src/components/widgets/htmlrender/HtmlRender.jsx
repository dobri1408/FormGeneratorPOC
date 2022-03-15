import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
function convertToHtml(blocks, setConvertedHtml) {
  let converted = "";
  blocks.map((block) => {
    switch (block.type) {
      case "header":
        converted += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
        break;
      case "embded":
        converted += `<div><iframe width="560" height="315" src="${block.data.embed}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`;
        break;
      case "paragraph":
        converted += `<p>${block.data.text}</p>`;
        break;
      case "delimiter":
        converted += "<hr />";
        break;
      case "image":
        converted += `<img class="img-fluid" src="${block.data.url}" title="${block.data.caption}" /><br /><em>${block.data.caption}</em>`;
        break;
      case "list":
        converted += "<ul>";
        block.data.items.forEach(function (li) {
          converted += `<li>${li}</li>`;
        });
        converted += "</ul>";
        break;
      default:
        console.log("Unknown block type", block.type);
        break;
    }
    setConvertedHtml(converted);
  });
}

function HtmlRender({ id }) {
  const htmlSchema = useSelector(
    (state) => state.elements.find((element) => element.id === id).htmlSchema
  );
  console.log(htmlSchema);
  const [convertedHtml, setConvertedHtml] = useState("");

  useEffect(() => {
    convertToHtml(htmlSchema, setConvertedHtml);
  }, [htmlSchema]);
  return <div>{parse(convertedHtml)}</div>;
}

export default HtmlRender;
