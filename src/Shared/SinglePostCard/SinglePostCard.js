import React from "react";
import { FaRegComments } from "react-icons/fa";
import { FiChevronRight, FiUser } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";

import "./SingleCard.css";

const SinglePostCard = ({ post }) => {
  const {
    _id,
    title,
    details,
    thumbnail_url,
    author: { name, published_date },
  } = post;

  return (
    <div className="col-md-4">
      <div className="bg-white rounded shadow">
        <div className="position-relative">
          <img className="cs-img-post" src={thumbnail_url} alt="" />
          <span className="position-absolute bg-danger bottom-0 start-0 text-center py-1 px-2 text-white fw-semibold">
            Trending
          </span>
        </div>
        <div className="d-flex justify-content-between mx-2 my-3">
          <span className="fw-semibold fs-6 d-flex align-items-center gap-1">
            <FiUser />
            {name}
          </span>
          <span className="fw-semibold fs-6 d-flex align-items-center gap-1">
            <SlCalender />
            {published_date?.split(" ")[0]}
          </span>
          <span className="fw-semibold fs-6 d-flex align-items-center gap-1">
            <FaRegComments /> 20
          </span>
        </div>
        <div className="mx-2 my-3 pb-3">
          <h2 title={title} className="fs-5 ">
            {title.length > 60 ? title.slice(0, 60) + "..." : title}
          </h2>

          <p className="my-3 mb-4">
            {details.length > 120 ? details.slice(0, 120) + "..." : details}
          </p>

          <Link
            to={`/blogs/${_id}`}
            className="bg-danger rounded text-white px-3 py-2 text-decoration-none fw-semibold"
          >
            Read More <FiChevronRight />{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SinglePostCard;
