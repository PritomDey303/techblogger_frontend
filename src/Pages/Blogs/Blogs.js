import React, { useContext } from "react";
import { AllPost } from "../../Context/PostContext";
import BlogPagination from "../../Shared/BlogPagination/BlogPagination";
import HeaderBg from "../../Shared/HeaderBg/HeaderBg";
import ReactLoader from "../../Shared/ReactLoader/ReactLoader";
import SinglePostCard from "../../Shared/SinglePostCard/SinglePostCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Blogs.css";

const Blogs = () => {
  const { posts, setPage, page, totalPageNumber, done } = useContext(AllPost);
  const skeletonArray = Array(6).fill(0);

  return (
    <section>
      <HeaderBg content={"Blogs"}></HeaderBg>
      <div className="container">
        <div className="row mt-3 gy-4">
          {!done
            ? skeletonArray.map((_, index) => (
                <div className="col-md-4" key={index}>
                  <Skeleton height={300} borderRadius={10} />
                  <Skeleton height={30} width={`80%`} />
                  <Skeleton height={20} width={`60%`} />
                </div>
              ))
            : posts.map((post) => (
                <SinglePostCard key={post._id} post={post} />
              ))}
        </div>
        {done && (
          <div className="row mt-3 pagination-container">
            <div className="pagination">
              <BlogPagination
                page={page}
                setPage={setPage}
                totalPageNumber={totalPageNumber}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;
