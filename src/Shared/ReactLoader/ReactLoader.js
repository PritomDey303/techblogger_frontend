import React from "react";
import ReactLoading from "react-loading";
import "./ReactLoader.css";
const ReactLoader = () => {
  return (
    <div className="reactloader">
      <ReactLoading type={"bars"} color={"#fff"} height={100} width={100} />
    </div>
  );
};

export default ReactLoader;
