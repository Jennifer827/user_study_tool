// src/components/EvaluationSectionG.tsx
import React, { useEffect, useState } from "react";
import VideoWithEvaluation from "./VideoWithEvaluation";
import API_URL from "../config";

const evaluationLabels = [
  "Visual Quality",
  "Semantic Quality",
  "Structural Quality",
  "Objectness",
  "Overall Quality",
];

interface EvaluationSectionGProps {
  onNext: (sceneEvaluationData?: any) => void;
}

const EvaluationSectionG: React.FC<EvaluationSectionGProps> = ({ onNext }) => {
  const [videoSrc1, setVideoSrc1] = useState<string>("");
  const [videoSrc2, setVideoSrc2] = useState<string>("");
  const [originalImageSrc, setOriginalImageSrc] = useState<string>("");

  // 引数 shouldUpdateProgress により、進捗更新の有無を制御
  const fetchRandomScene = async (shouldUpdateProgress: boolean = true) => {
    try {
      const response = await fetch(`${API_URL}/api/getRandomG`, {});
      console.log(`${API_URL}/api/getRandomG`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // { model1: string, model2: string, data: string }
      setVideoSrc1(`/generated/${data.model1}/${data.data}.mp4`);
      setVideoSrc2(`/generated/${data.model2}/${data.data}.mp4`);
      setOriginalImageSrc(`/generated/original/${data.data}.png`);
      // Next ボタン押下時のみ進捗を更新する
      if (shouldUpdateProgress) {
        onNext && onNext(data);
      }
    } catch (error) {
      console.error("Error fetching random scene:", error);
    }
  };

  // 初回レンダリング時は進捗更新をしない
  useEffect(() => {
    fetchRandomScene(false);
  }, []);

  // Next ボタン押下時のみ進捗更新（fetchRandomScene内で onNext が呼ばれる）
  const handleNext = () => {
    fetchRandomScene(true);
  };

  return (
    <div style={videosContainerStyle}>
      <div style={leftSectionStyle}>
        <VideoWithEvaluation
          videoSrc={videoSrc1}
          videoTitle="Model A"
          evaluationLabels={evaluationLabels}
        />
      </div>
      <div style={centerSectionStyle}>
        <h2 style={titleStyle}>Original Image</h2>
        <img src={originalImageSrc} style={originalImageStyle} alt="Original" />
        <button style={nextButtonStyle} onClick={handleNext}>
          Next
        </button>
      </div>
      <div style={rightSectionStyle}>
        <VideoWithEvaluation
          videoSrc={videoSrc2}
          videoTitle="Model 2"
          evaluationLabels={evaluationLabels}
        />
      </div>
    </div>
  );
};

const videosContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "flex-start",
  flexWrap: "wrap",
  width: "100%",
  maxWidth: "2000px",
  margin: "0 auto",
};

const leftSectionStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const rightSectionStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const centerSectionStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "1rem",
};

const titleStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "1rem",
};

const originalImageStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "500px",
  height: "auto",
  borderRadius: "10px",
  marginBottom: "1rem",
};

const nextButtonStyle: React.CSSProperties = {
  padding: "0.75rem 1.5rem",
  fontSize: "16px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default EvaluationSectionG;
