import React from "react";
import ReactDOM from "react-dom";
import CodeEditor from "../../../../../../components/WebBuilderComponents/codeEditor";
import HTML5SVG from "assets/jsx-svg/HTML5";
import { renderToString } from "react-dom/server";

const codeEditorBlock = (editor) => {
  // Add Custom Panel
  editor.Panels.addButton("options", {
    id: "open-html-css",
    command: "open-html-css",
    attributes: { title: "Add HTML/CSS Code" },
    label: renderToString(<HTML5SVG color={"#EEE"} width={14} height={14} />),
  });

  // Add Command to Open Custom Panel
  editor.Commands.add("open-html-css", {
    run(editor) {
      const modal = editor.Modal;
      modal.setTitle("Add HTML & CSS code to web builder");
      modal.setContent(`<div id="custom-panel-container"></div>`);
      modal.open();

      // Render React Component in Modal
      const panelContainer = document.getElementById("custom-panel-container");
      const root = panelContainer._reactRoot || ReactDOM?.createRoot(panelContainer);
      panelContainer._reactRoot = root;

      // Render the custom React component
      root.render(React.createElement(CodeEditor, { editor }));
    },
  });
};

export default codeEditorBlock;
