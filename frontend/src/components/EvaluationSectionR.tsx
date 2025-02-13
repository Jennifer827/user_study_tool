import React from "react";
import VideoWithEvaluation from "./RatingButtons";

const evaluationLabels = [
  "Visual Quality",
  "Semantic Quality",
  "Objectness",
  "Overall Quality",
];

const EvaluationSectionR: React.FC = () => {
  const handleEvaluationChangeVideo1 = (
    criterionIndex: number,
    rating: number
  ) => {
    console.log(`Video 1 - ${evaluationLabels[criterionIndex]}: ${rating}`);
    // ここで必要なら、さらに状態更新や他の処理を実施
  };

  const handleEvaluationChangeVideo2 = (
    criterionIndex: number,
    rating: number
  ) => {
    console.log(`Video 2 - ${evaluationLabels[criterionIndex]}: ${rating}`);
  };

  return (
    <div style={appContainerStyle}>
      <div style={videosContainerStyle}>
        <VideoWithEvaluation
          videoSrc="/video1.mp4"
          videoTitle="Video 1"
          evaluationLabels={evaluationLabels}
          onEvaluationChange={handleEvaluationChangeVideo1}
        />
        <VideoWithEvaluation
          videoSrc="/video2.mp4"
          videoTitle="Video 2"
          evaluationLabels={evaluationLabels}
          onEvaluationChange={handleEvaluationChangeVideo2}
        />
      </div>
    </div>
  );
};

const appContainerStyle: React.CSSProperties = {
  padding: "1rem",
  fontFamily: "sans-serif",
};

const videosContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
};

export default EvaluationSectionR;
