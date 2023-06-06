import { useCallback, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Sidebar from "./Sidebar";
import PostForm from "./PostForm";
import Post from "./Post";
import trendingIcon from "../../assets/trendingIcon.png";
import "./homepage.css";
import SuggestedCard from "./SuggestedCard";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../redux/slices/postsSlice";

const Dashboard = () => {
  const { globalPosts } = useSelector((state) => state.posts);
  const [width, setWidth] = useState(2560);

  const dispatch = useDispatch();

  useEffect(() => {
    const el = window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });

    return window.removeEventListener("resize", el);
  }, [width]);

  const fetchPosts = useCallback(async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    dispatch(setPosts([...data.globalPosts]));
  }, [dispatch]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <Grid
      container
      sx={{
        flexGrow: 1,
        justifyContent: "space-between",
        background: "#F5F5F5",
      }}
    >
      {/* SIDEBAR */}
      {width > 768 && (
        <>
          <Grid className="sidebarOptionsWrapper">
            <div className="sidebarOptions">
              <div className="sidebarHeading">
                Trending Topics <img src={trendingIcon} alt="trending" />
              </div>
              <Sidebar />
            </div>
          </Grid>
        </>
      )}

      {/* PUBLIC POSTS */}
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "#F5F5F5",

          marginLeft: `${
            width < 769 ? `auto` : width < 1025 && width > 768 ? `24%` : `30%`
          }`,
          marginRight: `${width < 1025 ? `auto` : `0`}`,
          padding: "5px",
        }}
      >
        <>
          <PostForm fetchPosts={fetchPosts} />
          <div className="feeds-layout">
            {globalPosts &&
              globalPosts.map((post) => (
                <Post data={post} key={Math.random() * 50} />
              ))}
          </div>
        </>
      </Grid>

      {/* SUGGESTIONS */}
      {width > 768 && (
        <Grid className="suggested-layout">
          <div className="suggested-heading">Recent Questions</div>

          <div className="suggestions">
            {globalPosts &&
              globalPosts.map((post) => (
                <SuggestedCard data={post} key={Math.random() * 50} />
              ))}
          </div>
        </Grid>
      )}
    </Grid>
  );
};

export default Dashboard;
