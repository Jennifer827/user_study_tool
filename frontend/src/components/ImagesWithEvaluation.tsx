// export default ImagesWithEvaluation;
import React from "react";
import RatingButtons from "./RatingButtons";
import Slideshow from "./SlideShow";

interface ImagesWithEvaluationProps {
  imageUrls: string[];
  imageTitle: string;
  evaluationLabels: string[];
  // 追加: グローバルな現在のスライドインデックス
  currentSlideIndex: number;
  onEvaluationChange?: (criterionIndex: number, rating: number) => void;
  resetTrigger: number;
}

const ImagesWithEvaluation: React.FC<ImagesWithEvaluationProps> = ({
  imageUrls,
  imageTitle,
  evaluationLabels,
  currentSlideIndex,
  onEvaluationChange,
  resetTrigger,
}) => {
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>{imageTitle}</h2>
      <Slideshow imageUrls={imageUrls} currentIndex={currentSlideIndex} />
      <div style={evaluationContainerStyle}>
        <RatingButtons
          evaluationLabels={evaluationLabels}
          onEvaluationChange={onEvaluationChange}
          resetTrigger={resetTrigger}
        />
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "1rem",
};

const titleStyle: React.CSSProperties = {
  marginBottom: "0.5rem",
};

const evaluationContainerStyle: React.CSSProperties = {
  marginTop: "1rem",
  width: "100%",
  maxWidth: "500px",
};

export default ImagesWithEvaluation;
