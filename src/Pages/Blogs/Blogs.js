import React, { useContext } from "react";
import { AllPost } from "../../Context/PostContext";
import HeaderBg from "../../Shared/HeaderBg/HeaderBg";
import SinglePostCard from "../../Shared/SinglePostCard/SinglePostCard";

const Blogs = () => {
  const { posts } = useContext(AllPost);

  return (
    <section>
      <HeaderBg content={"Blogs"}></HeaderBg>

      <div className="container">
        <div className="row mt-3 gy-4">
          {posts.map(post => (
            <SinglePostCard key={post._id} post={post}></SinglePostCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
