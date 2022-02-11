import React, { useState, useEffect, useCallback } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./TextEditor.css";
import { siteSchema } from "../../../data/siteschema";
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

function TextEditor({
  content,
  configurationQuill,
  setConfigurationQuill,
  id,
  tabName,
  pageName,
}) {
  const [quill, setQuill] = useState();

  useEffect(() => {
    if (configurationQuill.readOnly === true) {
      let containers = document.getElementsByClassName("ql-container ql-snow ");
      if (containers?.length > 0) {
        for (let i = 0; i < containers.length; i++) {
          containers[i].style.border = "none";
        }
      }
    }
  }, [configurationQuill]);
  const switchEditorState = () => {
    setConfigurationQuill({
      modules: {
        toolbar: TOOLBAR_OPTIONS, // Snow includes toolbar by default
      },
      readOnly: false,
    });
  };
  const saveContents = () => {
    let foundIndex = siteSchema.findIndex((x) => x.pageName === pageName);

    let tabIndex = siteSchema[foundIndex].tabs.findIndex(
      (x) => x.tabName === tabName
    );
    !("elements" in siteSchema[foundIndex].tabs[tabIndex]) &&
      (siteSchema[foundIndex].tabs[tabIndex].elements = []);

    const quillIndex = siteSchema[foundIndex].tabs[
      tabIndex
    ]?.elements?.findIndex((x) => x.id === id);

    siteSchema[foundIndex].tabs[tabIndex].elements[quillIndex].content =
      quill.getContents();
  };
  useEffect(() => {
    if (quill == null) return;

    const interval = setInterval(() => {
      if (quill != null) {
        saveContents();
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [quill]);
  useEffect(() => {
    if (quill) {
      quill.setContents(content);
    }
  }, [quill, content]);
  const wrapperRef = useCallback(
    (wrapper) => {
      if (wrapper == null) return;

      wrapper.innerHTML = "";
      const editor = document.createElement("div");
      wrapper.append(editor);
      const q = new Quill(editor, {
        theme: "snow",
        ...configurationQuill,
      });

      setQuill(q);
    },
    [configurationQuill, content]
  );
  return (
    <div
      className="container"
      ref={wrapperRef}
      onClick={(e) => {
        if (e.detail === 2) {
          switchEditorState();
        }
      }}
    ></div>
  );
}

export default TextEditor;
