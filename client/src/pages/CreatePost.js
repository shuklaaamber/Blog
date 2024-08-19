import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const createPost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("files", files[0]);
    data.set("content", content);

    const response = await fetch("http://localhost:4000/post/", {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form onSubmit={createPost}>
      <input
        type="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="summary"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button type="submit" style={{ marginTop: "10px" }}>
        Create Post
      </button>
    </form>
  );
};
export default CreatePost;
