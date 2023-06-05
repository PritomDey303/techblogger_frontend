import moment from "moment/moment";
import React, { useContext, useEffect, useState } from "react";
import { AiTwotoneLike } from "react-icons/ai";
import { BsLinkedin, BsStarFill } from "react-icons/bs";
import { FaFacebookSquare, FaRegComments } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { Link, useParams } from "react-router-dom";
import { AllPost } from "../../Context/PostContext";
import { url } from "../../Context/Url";
import ReactLoader from "../../Shared/ReactLoader/ReactLoader";
import human1 from "../../assets/images/humanicon.png";
import PostComment from "./PostComment";
import "./SinglePost.css";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const { posts } = useContext(AllPost);
  const [done, setDone] = useState(true);
  //single post api

  useEffect(() => {
    setDone(false);
    fetch(`${url}/api/blog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data.data);
        setDone(true);
      });
  }, [id]);

  const {
    image_url,
    title,
    author,
    description,
    comments,

    avgrating,

    likesCount,
  } = post;

  return (
    <>
      {!done ? (
        <ReactLoader />
      ) : (
        <section className="my-4">
          <div className="container">
            <div className="row ">
              <div className="col-md-9">
                <img className="img-fluid" src={image_url} alt="" />
                <div className="mt-3 d-flex justify-content-start gap-3 text-white">
                  <span className="fw-semibold bg-danger px-3 py-1 rounded fs-6 d-flex align-items-center gap-1">
                    <FiUser />
                    {author?.name ? author?.name : "Unknown"}
                  </span>
                  <span className="fw-semibold bg-danger px-3 py-1 rounded fs-6 d-flex align-items-center gap-1">
                    <SlCalender />
                    {moment(post?.created_at).format("MMMM Do YYYY")}
                  </span>
                  <span className="fw-semibold bg-danger px-3 py-1 rounded fs-6 d-flex align-items-center gap-1">
                    <FaRegComments /> {comments?.length}
                  </span>
                  <span className="fw-semibold bg-danger px-3 py-1 rounded fs-6 d-flex align-items-center gap-1">
                    <BsStarFill /> Rating : {avgrating}
                  </span>
                </div>

                <div className="my-3">
                  <h2 className="fs-4 fw-semibold">{title}</h2>
                  <p>{description}</p>

                  <div className="mt-5">
                    <p className="fw-semibold">{likesCount} likes</p>
                    <button className="btn btn-primary d-flex align-items-center">
                      <AiTwotoneLike />
                      Like
                    </button>
                  </div>
                </div>

                <div className="row my-4">
                  <div className="col-8 bg-white p-4">
                    <div className="d-flex justify-content-start gap-3">
                      <img className="cs-dp-img" src={human1} alt="" />
                      <div className="py-3">
                        <h4 className="fs-6">Author Information</h4>
                        <h4 className="fs-5">
                          {author?.name ? author?.name : "Unknown"}
                        </h4>
                        <div className="d-flex justify-content-start gap-3">
                          <a
                            className="btn btn-primary border-0"
                            style={{ backgroundColor: "#dd4b39" }}
                            href="#!"
                            role="button"
                          >
                            <MdEmail />
                          </a>
                          <a
                            className="btn btn-primary"
                            style={{ backgroundColor: "#3b5998" }}
                            href="#!"
                            role="button"
                          >
                            <FaFacebookSquare />
                          </a>
                          <a
                            className="btn btn-primary"
                            style={{ backgroundColor: "#0082ca" }}
                            href="#!"
                            role="button"
                          >
                            <BsLinkedin />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="my-5">
                    <PostComment
                      comments={comments}
                      setDone={setDone}
                    ></PostComment>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div
                  className="sticky-top bg-white p-3 rounded"
                  style={{ top: 20 + "px" }}
                >
                  <h4>Latest Post</h4>
                  <div className="mt-4 ">
                    {posts.slice(0, 6).map((ps, i) => {
                      return (
                        <div
                          key={i}
                          className="d-flex justify-content-start align-items-center gap-2 mb-3"
                        >
                          <img
                            className="cs-sp-img"
                            src={ps?.image_url}
                            alt=""
                          />
                          <Link
                            to={`/blogs/${ps?._id}`}
                            className="fs-6 text-black text-decoration-none"
                          >
                            {ps?.title.length > 40
                              ? ps?.title.slice(0, 40) + "..."
                              : ps?.title}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SinglePost;
