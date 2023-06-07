import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { FaRegComments } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
import { AllPost } from "../../../Context/PostContext";
import { url } from "../../../Context/Url";
import "./Hero.css";

const Hero = () => {
  const { posts } = useContext(AllPost);
  console.log(posts[0]);
  const id = posts[0]?._id;

  //api calling for single post data
  const [singlePost, setSinglePost] = useState({});
  useEffect(() => {
    fetch(`${url}/api/blog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSinglePost(data.data);
      });
  }, [id]);

  return (
    <section className="cs-hero d-flex align-items-center ">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="">
              <h4 className="font-bold text-white d-inline-block bg-danger p-2 fs-6 rounded-2">
                Trending Post
              </h4>
              <h1 className=" mt-2 font-bold text-white fs-3">
                {singlePost?.title}
              </h1>
              <div className="d-flex justify-content-start gap-3 mt-4 mb-5">
                <span className="bg-danger p-1 px-2 rounded-2 fs-6 text-white fw-semibold">
                  <BiUser />
                  {singlePost?.author?.name}
                </span>
                <span className="bg-danger p-1 px-2 rounded-2 fs-6 text-white fw-semibold">
                  <FaRegComments /> Comments : {singlePost?.comments?.length}
                </span>
                <span className="bg-danger p-1 px-2 rounded-2 fs-6 text-white fw-semibold">
                  <SlCalender /> {moment(singlePost?.createdAt).fromNow()}
                </span>
              </div>
              <Link
                to={`/blogs/${id}`}
                className="text-white py-2 text-decoration-none fw-semibold"
              >
                Read Post <FiChevronRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
