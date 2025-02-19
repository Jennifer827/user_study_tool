// src/components/RatingButtons.tsx
import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import RatingButtons from "./RatingButtons";

interface VideoWithEvaluationProps {
  videoSrc: string;
  videoTitle: string;
  evaluationLabels: string[];
  currentSlideIndex: number;
  // 必要なら親へ評価変更を通知するコールバックも追加可能
  onEvaluationChange?: (criterionIndex: number, rating: number) => void;
}

const VideoWithEvaluation: React.FC<VideoWithEvaluationProps> = ({
  videoSrc,
  videoTitle,
  evaluationLabels,
  currentSlideIndex,
  onEvaluationChange,
}) => {
  // 各評価観点ごとの評価状態（初期はnull）
  // const [evaluationRatings, setEvaluationRatings] = useState<(number | null)[]>(
  //   new Array(evaluationLabels.length).fill(null)
  // );
  // バックエンドに評価結果を送信する非同期関数

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>{videoTitle}</h2>
      <VideoPlayer videoSrc={videoSrc} />
      <div style={evaluationContainerStyle}>
        <RatingButtons
          evaluationLabels={evaluationLabels}
          onEvaluationChange={onEvaluationChange}
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

const videoStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "500px",
  height: "auto",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
};

const evaluationContainerStyle: React.CSSProperties = {
  marginTop: "1rem",
  width: "100%",
  maxWidth: "500px",
};

const evaluationRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  marginBottom: "0.5rem",
};

const labelStyle: React.CSSProperties = {
  flex: "0 0 120px",
  textAlign: "right",
  marginRight: "1rem",
  fontWeight: "bold",
};

const ratingButtonsStyle: React.CSSProperties = {
  display: "flex",
};

const ratingButtonStyle: React.CSSProperties = {
  margin: "0 0.25rem",
  padding: "0.5rem 1rem",
  border: "none",
  borderRadius: "5px",
  color: "#fff",
  cursor: "pointer",
};

export default VideoWithEvaluation;
