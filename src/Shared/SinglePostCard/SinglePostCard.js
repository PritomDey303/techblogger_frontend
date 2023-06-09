import React from "react";
import { FiChevronRight, FiUser } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";

import moment from "moment/moment";
import "./SingleCard.css";

const SinglePostCard = ({ post }) => {
  const {
    _id,
    title,
    description,
    image_url,
    createdAt,
    author: { name },
  } = post;

  //get time from createdAt using moment
  const time = moment(createdAt).fromNow();
  return (
    <div className="col-md-4">
      <div className="bg-white rounded shadow">
        <div className="position-relative">
          <img className="cs-img-post" src={image_url} alt="" />

          <span className="position-absolute bg-danger bottom-0 start-0 text-center py-1 px-2 text-white fw-semibold">
            Trending
          </span>
        </div>
        <div className="d-flex justify-content-between mx-2 my-3">
          <span className="fw-semibold fs-6 d-flex align-items-center gap-1">
            <FiUser />
            {name}
          </span>
          <span
            className="fw-semibold fs-6 d-flex align-items-center gap-1"
            style={{ fontSize: "8px" }}
          >
            <SlCalender />
            {time}
          </span>
        </div>
        <div className="mx-2 my-3 pb-3">
          <h2 title={title} className="fs-5 ">
            {title?.length > 60 ? title?.slice(0, 60) + "..." : title}
          </h2>

          <p className="my-3 mb-4">
            {
              //show only 100 character from description
              description?.length > 50
                ? description?.slice(0, 100) + "..."
                : description
            }
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
