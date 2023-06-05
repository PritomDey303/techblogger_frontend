import axios from "axios";
import React, { useState } from "react";

const TextToxicityDetector = () => {
  const [text, setText] = useState("");
  const [toxicity, setToxicity] = useState(null);

  const detectToxicity = async () => {
    try {
      const response = await axios.post(
        `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=AIzaSyCPvSIGJgZ4lGxsxiVnTjmPpurP54lLffI`,
        {
          comment: { text },
          languages: ["en"],
          requestedAttributes: { TOXICITY: {} },
          withCredentials: true,
        }
      );
      const { toxicity } = response.data.attributeScores.TOXICITY;
      setToxicity(toxicity.summaryScore.value);
      console.log(toxicity.summaryScore.value);
    } catch (error) {
      console.error("Error detecting toxicity:", error);
    }
  };

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={detectToxicity}>Detect Toxicity</button>
      {toxicity !== null && <div>Toxicity: {toxicity}</div>}
    </div>
  );
};

export default TextToxicityDetector;
