import React from "react";
import { Button } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";

const PostComment = () => {
  return (
    <div className="bg-white p-3 rounded">
      <h2 className="fs-5">Comments</h2>

      <div className="mt-5">
        {/* comments blocks */}
        <div className="d-flex justify-content-start gap-4">
          <img
            className="cs-sp-img rounded-circle"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
            alt=""
          />
          <div>
            <h3 className="fs-6">Virat Kohli</h3>
            <div className="d-flex gap-1 text-warning">
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
            </div>
            <p className="fs-6 py-2">
              The package aims to fortify Ukraine's military over the coming two
              years by committing the production and... read full story
            </p>
          </div>
        </div>
      </div>
      <div></div>

      <div className="my-4">
        <div className="row">
          <div className="col-md-6">
            <h2 className="fs-5">Submit comment</h2>

            <form className="mt-4">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="John Doe"
                />
              </div>
              <div className="mb-3">
                <select
                  className="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                >
                  <option defaultValue={5}>Rate this post</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="3">4</option>
                  <option value="3">5</option>
                </select>
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>
              <Button variant="danger" type="submit">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComment;
