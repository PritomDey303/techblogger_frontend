import moment from "moment";
import React, { useContext, useState } from "react";

import { Button } from "react-bootstrap";
import human from "../../../src/assets/images/humanicon.png";
import { AuthContext } from "../../Context/AuthContext";
import { Notification } from "../../Context/ToastContext";
import useTextToxicityDetection from "../../UtilityFunction/useTextToxicityDetector";
const PostComment = ({ comments, setDone }) => {
  const { authData } = useContext(AuthContext);
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
  console.log(comments);
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
    if (toxicType.length > 0) {
      Notification("error", "Your comment is not allowed");
    }
  };
  return (
    <div className="bg-white p-3 rounded">
      <h2 className="fs-5">Comments</h2>

      <div className="mt-5">
        {/* comments blocks */}

        {comments?.map((commentData) => (
          <div
            key={commentData?._id}
            className="d-flex justify-content-start gap-4"
          >
            <img className="cs-sp-img rounded-circle" src={human} alt="human" />
            <div>
              <h3 className="fs-5 fs-bolder">{commentData?.user?.name}</h3>
              <div
                className="d-flex my-1 text-secondary"
                style={{ fontSize: "14px", fontWeight: "bold" }}
              >
                <p>{moment(commentData?.createdAt).fromNow()}</p>
              </div>
              <p className="fs-6 py-1">{commentData?.comment}</p>
            </div>
          </div>
        ))}
      </div>
      <div></div>
      {/* comment form and toxicity check */}
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
                  placeholder={authData?.user?.name}
                  readOnly
                />
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
                {toxicType?.length > 0 &&
                  `This comment contains ${toxicType.join(", ")} words.`}
              </p>
              {comment === "" || toxicType?.length || loading ? (
                <Button
                  variant="danger"
                  type="submit"
                  onClick={handleCommentSubmit}
                  disabled
                >
                  Submit
                </Button>
              ) : (
                <Button
                  variant="danger"
                  type="submit"
                  onClick={handleCommentSubmit}
                >
                  Submit
                </Button>
              )}
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

                {toxicityScore && toxicityScore?.toxicity === true ? (
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

                {toxicityScore && toxicityScore?.identity_attack === true ? (
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

                {toxicityScore && toxicityScore?.insult === true ? (
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

                {toxicityScore && toxicityScore?.obscene === true ? (
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

                {toxicityScore && toxicityScore?.severe_toxicity === true ? (
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

                {toxicityScore && toxicityScore?.threat === true ? (
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

                {toxicityScore && toxicityScore?.sexual_explicit === true ? (
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
