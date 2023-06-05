import React, { useEffect, useState } from "react";

import { createContext } from "react";
export const AllPost = createContext();
const { url } = require("./Url");
const PostContext = ({ children }) => {
  const [posts, setPosts] = useState([]);

  //fetching all post

  useEffect(() => {
    fetch(`${url}/api/blog`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data.blogs);
        setPosts(data.data.blogs);
      });
  }, []);

  return <AllPost.Provider value={{ posts }}>{children}</AllPost.Provider>;
};

export default PostContext;
