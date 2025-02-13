// src/components/VideoWithEvaluation.tsx
import React, { useState } from "react";
import API_URL from "../config";

interface VideoWithEvaluationProps {
  videoSrc: string;
  videoTitle: string;
  evaluationLabels: string[];
  onEvaluationChange?: (criterionIndex: number, rating: number) => void;
  onNext?: () => void; // 次のシーンへ進むためのコールバック
}

const VideoWithEvaluation: React.FC<VideoWithEvaluationProps> = ({
  videoSrc,
  videoTitle,
  evaluationLabels,
  onEvaluationChange,
  onNext,
}) => {
  // 各評価観点ごとの評価状態（初期はnull）
  const [evaluationRatings, setEvaluationRatings] = useState<(number | null)[]>(
    new Array(evaluationLabels.length).fill(null)
  );

  // バックエンドに評価結果を送信する非同期関数
  const sendRatingToBackend = async (
    criterionIndex: number,
    rating: number
  ) => {
    try {
      const payload = {
        videoTitle: videoTitle,
        criterion: evaluationLabels[criterionIndex],
        rating: rating,
      };
      const res = await fetch(`${API_URL}/api/submit_rating`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const result = await res.json();
      console.log("Rating submitted:", result);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  // 評価ボタンがクリックされたときの処理
  const handleRating = (criterionIndex: number, rating: number) => {
    const newRatings = [...evaluationRatings];
    newRatings[criterionIndex] = rating;
    setEvaluationRatings(newRatings);
    if (onEvaluationChange) {
      onEvaluationChange(criterionIndex, rating);
    }
    // バックエンドに送信
    sendRatingToBackend(criterionIndex, rating);
  };

  // 全ての評価観点に対して評価が済んでいるかチェック
  const allEvaluated = evaluationRatings.every((r) => r !== null);

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>{videoTitle}</h2>
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        style={videoStyle}
      />
      <div style={evaluationContainerStyle}>
        {evaluationLabels.map((label, index) => (
          <div key={index} style={evaluationRowStyle}>
            <div style={labelStyle}>{label}</div>
            <div style={ratingButtonsStyle}>
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => handleRating(index, num)}
                  style={{
                    ...ratingButtonStyle,
                    backgroundColor:
                      evaluationRatings[index] === num ? "#007bff" : "#ccc",
                  }}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* 評価が完了していれば Next ボタンを表示 */}
      {allEvaluated && onNext && (
        <button onClick={onNext} style={nextButtonStyle}>
          Next
        </button>
      )}
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "1rem",
  padding: "1rem",
  border: "1px solid #ccc",
  borderRadius: "8px",
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

const nextButtonStyle: React.CSSProperties = {
  marginTop: "1rem",
  padding: "0.75rem 1.5rem",
  fontSize: "16px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default VideoWithEvaluation;
