import { Rating } from "@mui/material";
import moment from "moment/moment";
import React, { useContext, useEffect, useState } from "react";
import { AiTwotoneDislike, AiTwotoneLike } from "react-icons/ai";
import { BsLinkedin, BsStarFill } from "react-icons/bs";
import { FaFacebookSquare, FaRegComments } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { Link, useParams } from "react-router-dom";
import { AllPost } from "../../Context/PostContext";
import { Notification } from "../../Context/ToastContext";
import { url } from "../../Context/Url";
import ReactLoader from "../../Shared/ReactLoader/ReactLoader";
import human1 from "../../assets/images/humanicon.png";
import PostComment from "./PostComment";
import "./SinglePost.css";

const SinglePost = () => {
  const { notification } = useContext(Notification);
  //const { authData } = useContext(AuthContext);

  const { id } = useParams();
  const [post, setPost] = useState({});
  const { posts } = useContext(AllPost);
  const [done, setDone] = useState(true);
  const [trigger, setTrigger] = useState(true);
  const [givenRating, setGivenRating] = useState(1);
  const [alreadyRating, setAlreadyRating] = useState(-1);
  const [like, setLike] = useState(false);
  //single post api

  useEffect(() => {
    setDone(false);
    fetch(`${url}/api/blog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data.data);
        //console.log(data.data);
      });

    //call api to check if user already rated
    fetch(`${url}/api/rating/check/${id}`, {
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.status === "success") {
          setAlreadyRating(data.rating);
        }
      });
    //call api to check if user already liked
    fetch(`${url}/api/like/check/${id}`, {
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data?.like === true) {
          setLike(true);
        } else {
          setLike(false);
        }
      });

    setDone(true);
  }, [id, trigger]);

  const {
    image_url,
    title,
    author,
    description,
    comments,

    avgrating,

    likesCount,
  } = post;

  /////////////////////////////
  //handle rating
  const handleRating = () => {
    setDone(false);
    if (givenRating === -1) {
      notification("Please give a rating", "danger");
      setDone(true);
      return;
    }
    fetch(`${url}/api/rating/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        blogid: id,
        rating: givenRating,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          notification("Rating added successfully", "success");

          setTrigger(!trigger);
        } else {
          notification("Something went wrong", "danger");
        }

        setDone(true);
      });
  };
  //////////////////////////////////////////
  //handle like
  const handleLike = () => {
    setDone(false);
    fetch(`${url}/api/like/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },

      body: JSON.stringify({
        blogid: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          //notification("Liked successfully", "success");
          setDone(true);
          setTrigger(!trigger);
        } else {
          notification("Something went wrong", "danger");
        }
      });
    setDone(true);
  };
  //////////////////////////////////////////

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

                  <div className="d-flex justify-content-between align-items-center">
                    {/* like code */}
                    <div className="mt-5">
                      <p className="fw-semibold">{likesCount} likes</p>
                      {!like ? (
                        <button
                          onClick={handleLike}
                          className="btn btn-primary  d-flex align-items-center"
                        >
                          <AiTwotoneLike />
                          like
                        </button>
                      ) : (
                        <button
                          className="btn likebutton d-flex align-items-center"
                          onClick={handleLike}
                        >
                          <span className="text-secondary">
                            <AiTwotoneDislike />
                            unlike
                          </span>
                        </button>
                      )}
                    </div>
                    {/* rating code */}
                    <div>
                      <p className="fw-semibold">Rate the post</p>
                      <Rating
                        name="simple-controlled"
                        value={givenRating}
                        onChange={(event, newValue) => {
                          setGivenRating(newValue);
                        }}
                      />

                      {alreadyRating !== -1 && (
                        <p className="text-secondary">
                          You already rated this post with {alreadyRating}{" "}
                          <BsStarFill className="text-warning"></BsStarFill>.
                        </p>
                      )}
                      {/* submit button */}
                      <button
                        className="btn btn-outline-danger d-block mt-1"
                        onClick={handleRating}
                      >
                        Submit Rating
                      </button>
                    </div>
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
                      blogid={id}
                      trigger={trigger}
                      setTrigger={setTrigger}
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
