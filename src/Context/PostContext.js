import React, { useEffect, useState } from "react";

import { createContext } from "react";
import ReactLoader from "../Shared/ReactLoader/ReactLoader";
export const AllPost = createContext();
const { url } = require("./Url");
const PostContext = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [done, setDone] = useState(false);
  const [triggerPost, setTriggerPost] = useState(false);

  //fetching all post

  useEffect(() => {
    setDone(false);
    fetch(`${url}/api/blog`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data.blogs);
        setPosts(data.data.blogs);
      });
    setDone(true);
  }, [triggerPost]);

  if (!done) {
    return <ReactLoader />;
  }

  return (
    <AllPost.Provider
      value={{ posts, setPosts, done, setDone, triggerPost, setTriggerPost }}
    >
      {children}
    </AllPost.Provider>
  );
};

export default PostContext;
