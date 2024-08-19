import { useEffect, useState } from "react";
import Post from "../Post";

const Indexpage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/post").then((res) => {
      res.json().then((post) => {
        console.log(post);
        setPosts(post);
      });
    });
  }, []);

  return <>{posts.length > 0 && posts.map((post) => <Post {...post} />)}</>;
};

export default Indexpage;
