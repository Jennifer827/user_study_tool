// src/components/RatingButtons.tsx
import React, { useState, useEffect } from "react";

interface RatingButtonsProps {
  evaluationLabels: string[];
  // onEvaluationChange(criterionIndex, rating) で親に通知する
  onEvaluationChange?: (criterionIndex: number, rating: number) => void;
  resetTrigger: number;
}

const RatingButtons: React.FC<RatingButtonsProps> = ({
  evaluationLabels,
  onEvaluationChange,
  resetTrigger,
}) => {
  // 各評価観点ごとの評価状態（初期はnull）
  const [evaluationRatings, setEvaluationRatings] = useState<(number | null)[]>(
    new Array(evaluationLabels.length).fill(null)
  );

  useEffect(() => {
    setEvaluationRatings(new Array(evaluationLabels.length).fill(null));
  }, [resetTrigger, evaluationLabels.length]);

  // 評価ボタンがクリックされたときの処理
  const handleRating = (criterionIndex: number, rating: number) => {
    const newRatings = [...evaluationRatings];
    newRatings[criterionIndex] = rating;
    setEvaluationRatings(newRatings);
    if (onEvaluationChange) {
      onEvaluationChange(criterionIndex, rating);
    }
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
