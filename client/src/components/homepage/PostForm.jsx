import { useState } from "react";
import { useSelector } from "react-redux";
import { postFormat } from "../../utils/constants";
import { Link } from "react-router-dom";
import askIcon from "../../assets/askIcon.png";
import replyIcon from "../../assets/replyIcon.png";
import postIcon from "../../assets/postIcon.png";
import cardProfile from "../../assets/cardProfile.png";
import "./homepage.css";

const PostForm = ({ fetchPosts }) => {
  const { userInfo } = useSelector((state) => state.auth);

  const [post, setPost] = useState(postFormat);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/posts/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userInfo._id, ...post }),
    });
    fetchPosts();
    console.log(await res.json());
    setPost(postFormat);
  };
  const handleInput = (e) => {
    const value = e.target.value;
    setPost((prev) => {
      return { ...prev, question: value, by: userInfo.username };
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="post-status">
        <div className="left">
          <img src={cardProfile} alt="profile" className="profile" />
          <div className="username-display">{userInfo.username || `Bob`}</div>
        </div>
        <div className="right">
          <textarea
            className="top"
            type="text"
            name="question"
            placeholder="What do you want to ask or share?"
            value={post.question}
            onChange={handleInput}
          />
          <div className="bottom">
            <div className="ask">
              <img src={askIcon} alt="ask" />
              Ask
            </div>
            <div className="separator"></div>
            <div className="answer">
              <img src={replyIcon} alt="reply" />
              Answer
            </div>
            <div className="separator"></div>
            <button type="submit" className="post">
              <img src={postIcon} alt="post" />
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
