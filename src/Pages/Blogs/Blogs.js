import React, { useContext } from "react";
import { AllPost } from "../../Context/PostContext";
import BlogPagination from "../../Shared/BlogPagination/BlogPagination";
import HeaderBg from "../../Shared/HeaderBg/HeaderBg";
import ReactLoader from "../../Shared/ReactLoader/ReactLoader";
import SinglePostCard from "../../Shared/SinglePostCard/SinglePostCard";
import "./Blogs.css";
const Blogs = () => {
  const { posts, setPage, page, totalPageNumber, done } = useContext(AllPost);
  console.log(posts);

  return !done ? (
    <ReactLoader />
  ) : (
    <section>
      <HeaderBg content={"Blogs"}></HeaderBg>

      <div className="container">
        <div className="row mt-3 gy-4">
          {posts.map((post) => (
            <SinglePostCard key={post._id} post={post}></SinglePostCard>
          ))}
        </div>
        <div className="row mt-3 pagination-container">
          <div className="pagination">
            <BlogPagination
              page={page}
              setPage={setPage}
              totalPageNumber={totalPageNumber}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
