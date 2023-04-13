import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";
import useTextToxicityDetection from "../../UtilityFunction/useTextToxicityDetector";

const PostComment = () => {
  const [comment, setComment] = useState("");
  const [toxicityScore, setToxicityScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getToxicityScore } = useTextToxicityDetection();
  const [toxicType, setToxicType] = useState([]);
  //toxicity check
  const handleCheckToxicity = async (comment) => {
    const score = await getToxicityScore(comment);
    return score;
  };

  //handle comment
  const handleCommentSubmit = async (e) => {
    //empty toxic type array
    setToxicType([]);
    //clear comment field
    setLoading(true);
    const toxicityData = await handleCheckToxicity(comment);
    setToxicityScore(toxicityData);
    setLoading(false);
    if (toxicityData.toxicity === true) {
      setToxicType((toxicType) => [...toxicType, "toxicity"]);
    }
    if (toxicityData.identity_attack === true) {
      setToxicType((toxicType) => [...toxicType, "identity attack"]);
    }
    if (toxicityData.insult === true) {
      setToxicType((toxicType) => [...toxicType, "insulting"]);
    }
    if (toxicityData.severe_toxicity === true) {
      setToxicType((toxicType) => [...toxicType, "severe toxicity"]);
    }

    if (toxicityData.sexual_explicit === true) {
      setToxicType((toxicType) => [...toxicType, "sexual explicit"]);
    }
    if (toxicityData.threat === true) {
      setToxicType((toxicType) => [...toxicType, "threat"]);
    }
    if (toxicityData.obscene === true) {
      setToxicType((toxicType) => [...toxicType, "obscene"]);
    }
    console.log(toxicType);
  };
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
                  required
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
                  placeholder="Write your comment here..."
                  required
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  onBlur={(e) => {
                    handleCommentSubmit(e);
                  }}
                ></textarea>
              </div>
              <p
                className="fw-bolder text-danger mt-1 mb-2"
                style={{ fontSize: "14px" }}
              >
                {toxicType.length > 0 &&
                  `This comment contains ${toxicType.join(", ")} words.`}
              </p>
              <Button
                variant="danger"
                type="submit"
                onClick={handleCommentSubmit}
              >
                Submit
              </Button>
            </form>
          </div>
          {/* display toxicity score */}
          <div className="col-md-6">
            <h2 className="fs-5 mb-4">
              Toxicity Analytics{" "}
              {loading && (
                <span
                  className="spinner-border spinner-border-md text-danger"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
            </h2>
            {/* toxicity */}
            <div>
              <div className="d-flex justify-content-start">
                <p className="fs-6 me-2">Toxicity:</p>

                {toxicityScore && toxicityScore.toxicity === true ? (
                  <p className="fs-6 text-danger fw-bold"> True</p>
                ) : (
                  <p className="fs-6 text-success fw-bold"> False</p>
                )}
              </div>
            </div>
            {/* identity attack */}
            <div>
              <div className="d-flex justify-content-start">
                <p className="fs-6 me-2">Identity Attack:</p>

                {toxicityScore && toxicityScore.identity_attack === true ? (
                  <p className="fs-6 text-danger fw-bold"> True</p>
                ) : (
                  <p className="fs-6 text-success fw-bold">False</p>
                )}
              </div>
            </div>
            {/* insult */}
            <div>
              <div className="d-flex justify-content-start">
                <p className="fs-6 me-2">Insult:</p>

                {toxicityScore && toxicityScore.insult === true ? (
                  <p className="fs-6 text-danger fw-bold"> True</p>
                ) : (
                  <p className="fs-6 text-success fw-bold">False</p>
                )}
              </div>
            </div>
            {/* obscene */}
            <div>
              <div className="d-flex justify-content-start">
                <p className="fs-6 me-2">Obscene:</p>

                {toxicityScore && toxicityScore.obscene === true ? (
                  <p className="fs-6 text-danger fw-bold"> True</p>
                ) : (
                  <p className="fs-6 text-success fw-bold">False</p>
                )}
              </div>
            </div>
            {/* severe toxicity */}
            <div>
              <div className="d-flex justify-content-start">
                <p className="fs-6 me-2">Severe Toxicity:</p>

                {toxicityScore && toxicityScore.severe_toxicity === true ? (
                  <p className="fs-6 text-danger fw-bold"> True</p>
                ) : (
                  <p className="fs-6 text-success fw-bold">False</p>
                )}
              </div>
            </div>
            {/* threat */}
            <div>
              <div className="d-flex justify-content-start">
                <p className="fs-6 me-2">Threat:</p>

                {toxicityScore && toxicityScore.threat === true ? (
                  <p className="fs-6 text-danger fw-bold"> True</p>
                ) : (
                  <p className="fs-6 text-success fw-bold">False</p>
                )}
              </div>
            </div>
            {/* sexual explicit */}
            <div>
              <div className="d-flex justify-content-start">
                <p className="fs-6 me-2">Sexual Explicit:</p>

                {toxicityScore && toxicityScore.sexual_explicit === true ? (
                  <p className="fs-6 text-danger fw-bold"> True</p>
                ) : (
                  <p className="fs-6 text-success fw-bold">False</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComment;
