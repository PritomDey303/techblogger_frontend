import React, { useEffect, useState } from "react";

import { createContext } from "react";
import ReactLoader from "../Shared/ReactLoader/ReactLoader";
export const AllPost = createContext();
const { url } = require("./Url");
const PostContext = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [done, setDone] = useState(false);
  const [triggerPost, setTriggerPost] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 6;
  const [totalPageNumber, setTotalPageNumber] = useState(0);
  //date of two days ago
  //fetching all post

  useEffect(() => {
    setDone(false);
    fetch(`${url}/api/blog?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data.blogs);
        setPosts(data.data.blogs);
        setDone(true);
      });
  }, [triggerPost, page]);
  //fetching total post number
  useEffect(() => {
    setDone(false);
    fetch(`${url}/api/blog/total/count`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let temp = Math.ceil(data.data / limit);
        setTotalPageNumber(temp);
        setDone(true);
      });
  }, [triggerPost]);

  if (!done) {
    return <ReactLoader />;
  }

  return (
    <AllPost.Provider
      value={{
        posts,
        setPosts,
        done,
        setDone,
        triggerPost,
        setTriggerPost,
        setPage,
        page,
        totalPageNumber,

        limit,
      }}
    >
      {children}
    </AllPost.Provider>
  );
};

export default PostContext;
