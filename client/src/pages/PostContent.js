import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../userContext";

const PostContent = () => {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((info) => {
        setPostInfo(info);
      });
    });
  }, []);
  if (!postInfo) return "";
  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">by: {postInfo.author.username}</div>
      {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <Link to={`/edit/${postInfo._id}`} className="edit-btn">Edit Post</Link>
        </div>
      )}
      <div className="image">
        <img alt="" src={`http://localhost:4000/${postInfo?.cover}`} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  );
};
export default PostContent;
