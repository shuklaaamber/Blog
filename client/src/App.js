import "./App.css";
import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import Indexpage from "./pages/Indexpage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserContextProvider from "./userContext";
import CreatePost from "./pages/CreatePost";
import PostContent from "./pages/PostContent";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Indexpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostContent />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
