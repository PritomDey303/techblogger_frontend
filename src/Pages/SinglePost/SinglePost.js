import React, { useContext, useEffect, useState } from "react";
import { AllPost } from "../../Context/PostContext";
import { Link, useParams } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { FaRegComments, FaFacebookSquare } from "react-icons/fa";
import { BsStarFill, BsLinkedin } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { AiTwotoneLike } from "react-icons/ai";
import "./SinglePost.css";
import PostComment from "./PostComment";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const { posts } = useContext(AllPost);

  //single post api

  useEffect(() => {
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data.data[0]);
        setPost(data.data[0]);
      });
  }, [id]);

  const { image_url, rating, title, author, details } = post;

  return (
    <section className="my-4">
      <div className="container">
        <div className="row ">
          <div className="col-md-9">
            <img className="img-fluid" src={image_url} alt="" />
            <div className="mt-3 d-flex justify-content-start gap-3 text-white">
              <span className="fw-semibold bg-danger px-3 py-1 rounded fs-6 d-flex align-items-center gap-1">
                <FiUser />
                {author?.name === "system" ? "Pritom" : author?.name}
              </span>
              <span className="fw-semibold bg-danger px-3 py-1 rounded fs-6 d-flex align-items-center gap-1">
                <SlCalender />
                {author?.published_date.split(" ")[0]}
              </span>
              <span className="fw-semibold bg-danger px-3 py-1 rounded fs-6 d-flex align-items-center gap-1">
                <FaRegComments /> 20
              </span>
              <span className="fw-semibold bg-danger px-3 py-1 rounded fs-6 d-flex align-items-center gap-1">
                <BsStarFill /> Rating : {rating?.number}
              </span>
            </div>

            <div className="my-3">
              <h2 className="fs-4 fw-semibold">{title}</h2>
              <p>
                {details}WASHINGTON: President Joe Biden announced nearly $3
                billion in military aid to Kyiv on Wednesday -- the biggest US
                package so far -- to mark Ukraine's independence day, six months
                after Russia invaded the country. The package aims to fortify
                Ukraine's military over the coming two years by committing the
                production and... read full storyWASHINGTON: President Joe Biden
                announced nearly $3 billion in military aid to Kyiv on Wednesday
                -- the biggest US package so far -- to mark Ukraine's
                independence day, six months after Russia invaded the country.
                The package aims to fortify Ukraine's military over the coming
                two years by committing the production and... read full
                storyWASHINGTON: President Joe Biden announced nearly $3 billion
                in military aid to Kyiv on Wednesday -- the biggest US package
                so far -- to mark Ukraine's independence day, six months after
                Russia invaded the country. The package aims to fortify
                Ukraine's military over the coming two years by committing the
                production and... read full storyWASHINGTON: President Joe Biden
                announced nearly $3 billion in military aid to Kyiv on Wednesday
                -- the biggest US package so far -- to mark Ukraine's
                independence day, six months after Russia invaded the country.
                The package aims to fortify Ukraine's military over the coming
                two years by committing the production and... read full story
              </p>

              <div className="mt-5">
                <p className="fw-semibold">12 likes</p>
                <button className="btn btn-primary d-flex align-items-center"><AiTwotoneLike/>Like</button> 
              </div>
            </div>

            <div className="row my-4">
              <div className="col-8 bg-white p-4">
                <div className="d-flex justify-content-start gap-3">
                  <img className="cs-dp-img" src={author?.img} alt="" />
                  <div className="py-3">
                    <h4 className="fs-6">Author Information</h4>
                    <h4 className="fs-5">
                      {author?.name === "system" ? "Pritom Dey" : author?.name}
                    </h4>
                    <div className="d-flex justify-content-start gap-3">
                      <a
                        className="btn btn-primary border-0"
                        style={{"backgroundColor": "#dd4b39"}}
                        href="#!"
                        role="button"
                      >
                        <MdEmail/>
                      </a>
                      <a
                        className="btn btn-primary"
                        style={{"backgroundColor": "#3b5998"}}
                        href="#!"
                        role="button"
                      >
                        <FaFacebookSquare/>
                      </a>
                      <a
                        className="btn btn-primary"
                        style={{"backgroundColor": "#0082ca"}}
                        href="#!"
                        role="button"
                      >
                        <BsLinkedin/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
            <div className="my-5">
                        <PostComment></PostComment>
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
                {posts.slice(0, 6).map((ps , i) => {
                  return (
                    <div key={i} className="d-flex justify-content-start align-items-center gap-2 mb-3">
                      <img className="cs-sp-img" src={ps?.image_url} alt="" />
                      <Link to={`/blogs/${ps?._id}`} className="fs-6 text-black text-decoration-none">
                        {ps?.title.length > 40
                          ? ps.title.slice(0, 40) + "..."
                          : ps.title}
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
  );
};

export default SinglePost;
