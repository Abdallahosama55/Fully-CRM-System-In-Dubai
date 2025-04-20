import ReactQuill, { Quill } from "react-quill";
// style
import "./quill.snow.css";
import "./styles.css";
import { Button } from "antd";

//Alignment
Quill.register(Quill.import("attributors/style/align"), true);

const Editor = ({ value, onChange, onSubmit, btn_label, className, placeholder, style }) => {
  return (
    <div className={`editor ${className ? className : ""}`} style={style}>
      <ReactQuill
        value={value}
        onChange={onChange}
        placeholder={placeholder ? placeholder : "Type here..."}
        modules={{
          toolbar: [
            // [{ 'align': [] }],
            [{ align: [] }, "bold", "italic", "underline", "strike", "link", "image"],
          ],
        }}
      />

      {onSubmit && btn_label && (
        <Button type="primary" size="small" className="submit_btn" onClick={onSubmit}>
          {btn_label}
        </Button>
      )}
    </div>
  );
};

export default Editor;
