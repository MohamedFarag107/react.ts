import ReactQuill from "react-quill";
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],

    [{ align: [] }],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "align", // Alignment format
];

interface CustomQuillProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  [x: string]: any;
}
import "react-quill/dist/quill.snow.css";
function CustomQuill({
  placeholder,
  value,
  onChange,
  ...rest
}: CustomQuillProps) {
  return (
    <div>
      <ReactQuill
        theme="snow"
        onChange={onChange}
        value={value}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        {...rest}
      />
      {/* error */}
    </div>
  );
}

export default CustomQuill;
