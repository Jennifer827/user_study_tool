// src/components/RatingButtons.tsx
import React, { useState } from "react";
import API_URL from "../config";

interface VideoWithEvaluationProps {
  evaluationLabels: string[];
  // 必要なら親へ評価変更を通知するコールバックも追加可能
  onEvaluationChange?: (criterionIndex: number, rating: number) => void;
}

const RatingButtons: React.FC<VideoWithEvaluationProps> = ({
  evaluationLabels,
  onEvaluationChange,
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

  return (
    <div style={containerStyle}>
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
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "1rem",
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

export default RatingButtons;
