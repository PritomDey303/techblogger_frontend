import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { url } from "../../Context/Url";
import BlogPagination from "../../Shared/BlogPagination/BlogPagination";
import HeaderBg from "../../Shared/HeaderBg/HeaderBg";
import ReactLoader from "../../Shared/ReactLoader/ReactLoader";
import SinglePostCard from "../../Shared/SinglePostCard/SinglePostCard";
import "./CategoryTemplate.css";
const CategoryTemplate = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [done, setDone] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(1);
  const limit = 6;
  //fetching category wise post
  useEffect(() => {
    setDone(false);
    fetch(`${url}/api/blog/category/${id}?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data.data.blogs);
        setTotalPageNumber(Math.ceil(data?.data?.blogs?.length / limit));
        setDone(true);
      });
  }, [id, page]);

  return !done ? (
    <ReactLoader />
  ) : posts?.length === 0 ? (
    <section style={{ minHeight: "70vh" }}>
      <HeaderBg content={id} />
      <h1 className="text-center text-danger mt-5">No Post Found</h1>
    </section>
  ) : (
    <section style={{ minHeight: "70vh" }}>
      <HeaderBg content={id} />
      <div className="container">
        <div className="row mt-3 gy-4">
          {posts?.map((post) => (
            <SinglePostCard key={post._id} post={post}></SinglePostCard>
          ))}
        </div>
      </div>
      <div className="pagination">
        <BlogPagination
          page={page}
          setPage={setPage}
          totalPageNumber={totalPageNumber}
        />
      </div>
    </section>
  );
};

export default CategoryTemplate;
