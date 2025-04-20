import React, { useEffect } from "react";
import ToolBar from "./components/ToolBar";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
// style
import "./styles.css";

const TextEditor = ({
  tags = undefined,
  value = "",
  onChange = () => {},
  minHeight,
  placeholder = "",
  ...rest
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      Dropcursor,
      Image,
      Color,
      TextStyle,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      // FALSE IS USED FOR emitUpdate = false to prevent infinite loop 
      // so this will change the value inside the text editor
      // but it will not call the onChange function
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  return (
    <div className={`text_editor ${rest["aria-invalid"] ? "has_error" : ""}`}>
      <ToolBar editor={editor} tags={tags} />
      <div className="editor_text_area" style={{ minHeight: minHeight ? minHeight : "250px" }}>
        <EditorContent editor={editor} placeholder={placeholder} />
      </div>
    </div>
  );
};

export default TextEditor;
