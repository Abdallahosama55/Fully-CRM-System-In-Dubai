import React, { useEffect, useState } from "react";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { oneDark } from "@codemirror/theme-one-dark";
import prettier from "https://unpkg.com/prettier@2.2.1/esm/standalone.mjs";
import parserHTML from "https://unpkg.com/prettier@2.2.1/esm/parser-html.mjs";
import parserCSS from "https://unpkg.com/prettier@2.2.1/esm/parser-postcss.mjs";
import "./styles.css";

const CodeEditor = ({ editor }) => {
  const [htmlContent, setHtmlContent] = useState("");
  const [cssContent, setCssContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const htmlCode = editor.getHtml();
    const cssCode = editor.getCss();
    setHtmlContent(formatCode(htmlCode, "html"));
    setCssContent(formatCode(cssCode, "css"));
    formatCode();
  }, []);

  const handleHtmlChange = (value) => {
    setHtmlContent(value);
  };

  const handleCssChange = (value) => {
    setCssContent(value);
  };

  const formatCode = (code, type) => {
    let formattedCode = code;
    if (type === "html" && typeof code === "string") {
      formattedCode = prettier.format(code, {
        parser: "html",
        plugins: [parserHTML],
      });
    } else if (type === "css" && typeof code === "string") {
      formattedCode = prettier.format(code, {
        parser: "css",
        plugins: [parserCSS],
      });
    }
    return formattedCode;
  };

  const handleSave = async () => {
    setLoading(true);
    const formattedHtml = formatCode(htmlContent, "html");
    const formattedCss = formatCode(cssContent, "css");
    await editor.setComponents(formattedHtml);
    await editor.addStyle(formattedCss);
    editor.store();
    setLoading(false);
    editor.Modal.close();
  };

  return (
    <div className="gjs-mdl-content">
      <div className="gjs-export-dl">
        <div className="gjs-cm-editor-c">
          <div className="gjs-cm-editor" id="gjs-cm-htmlmixed">
            <div id="gjs-cm-title">HTML</div>
            <div className="gjs-cm-code">
              <CodeMirror
                height="450px"
                extensions={[html(), oneDark, EditorView.lineWrapping]}
                onChange={handleHtmlChange}
                value={htmlContent}
              />
            </div>
          </div>
        </div>
        <div className="gjs-cm-editor-c">
          <div className="gjs-cm-editor" id="gjs-cm-css">
            <div id="gjs-cm-title">CSS</div>
            <div className="gjs-cm-code">
              <CodeMirror
                value={cssContent}
                height="450px"
                extensions={[css(), oneDark, EditorView.lineWrapping]}
                onChange={handleCssChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <button
          style={{
            background: "#5cb85c",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={handleSave}>
          {loading ? "Loading..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;
