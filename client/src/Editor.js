import React from "react";
import ReactQuill from "react-quill";

const Editor = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [2, 3, 4, false] }],
      ["bold", "italic", "underline", "blockquote"],
      [{ color: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
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
    "color",
    "clean",
  ];
  return (
    <ReactQuill
      modules={modules}
      formats={formats}
      value={value}
      onChange={onChange}
    />
  );
};

export default Editor;
