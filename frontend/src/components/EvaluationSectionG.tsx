// // src/components/EvaluationSectionR.tsx
// import React from "react";
// import VideoWithEvaluation from "./VideoWithEvaluation";

// const evaluationLabels = [
//   "Visual Quality",
//   "Semantic Quality",
//   "Structural Quality",
//   "Objectness",
//   "Overall Quality",
// ];

// interface Props {
//   videoSrc1: string;
//   videoSrc2: string;
//   originalImageSrc: string;
//   // onNext: () => void;
//   onNext: (sceneEvaluationData?: any) => void;
// }

// const EvaluationSectionG: React.FC<Props> = ({
//   videoSrc1,
//   videoSrc2,
//   originalImageSrc,
//   onNext,
// }) => {
//   return (
//     <div style={videosContainerStyle}>
//       <div style={leftSectionStyle}>
//         <VideoWithEvaluation
//           videoSrc={videoSrc1}
//           videoTitle="Model 1"
//           evaluationLabels={evaluationLabels}
//         />
//       </div>
//       <div style={centerSectionStyle}>
//         <h2 style={titleStyle}>Original Image</h2>
//         <img src={originalImageSrc} style={originalImageStyle} alt="Original" />
//         <button style={nextButtonStyle} onClick={() => onNext()}>
//           Next
//         </button>
//       </div>
//       <div style={rightSectionStyle}>
//         <VideoWithEvaluation
//           videoSrc={videoSrc2}
//           videoTitle="Model 2"
//           evaluationLabels={evaluationLabels}
//         />
//       </div>
//     </div>
//   );
// };

// const videosContainerStyle: React.CSSProperties = {
//   display: "flex",
//   justifyContent: "space-around",
//   alignItems: "flex-start",
//   flexWrap: "wrap",
//   width: "100%",
//   maxWidth: "2000px",
//   margin: "0 auto",
// };

// const leftSectionStyle: React.CSSProperties = {
//   flex: "1",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
// };

// const rightSectionStyle: React.CSSProperties = {
//   flex: "1",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
// };

// const centerSectionStyle: React.CSSProperties = {
//   flex: "1",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   // justifyContent: "center",
//   // margin: "0 20px",
//   margin: "1rem",
// };

// const titleStyle: React.CSSProperties = {
//   textAlign: "center",
//   marginBottom: "1rem",
// };

// const originalImageStyle: React.CSSProperties = {
//   width: "100%",
//   maxWidth: "500px",
//   height: "auto",
//   borderRadius: "10px",
//   marginBottom: "1rem",
// };

// const nextButtonStyle: React.CSSProperties = {
//   padding: "0.75rem 1.5rem",
//   fontSize: "16px",
//   backgroundColor: "#28a745",
//   color: "#fff",
//   border: "none",
//   borderRadius: "5px",
//   cursor: "pointer",
// };

// export default EvaluationSectionG;

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
  // onNextScene?: (sceneData: any) => void; // 必要に応じて、現在のシーンデータをAppに渡す場合
}

const EvaluationSectionG: React.FC<EvaluationSectionGProps> = ({ onNext }) => {
  // シーンから得られる各動画およびオリジナル画像のパスを state で管理
  const [videoSrc1, setVideoSrc1] = useState<string>("");
  const [videoSrc2, setVideoSrc2] = useState<string>("");
  const [originalImageSrc, setOriginalImageSrc] = useState<string>("");

  // バックエンドの get_random_scene API を呼び出す関数
  const fetchRandomScene = async () => {
    try {
      const response = await fetch(`${API_URL}/api/getRandomG`, {});
      console.log(`${API_URL}/api/getRandomG`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // { model1: string, model2: string, data: string }
      // 動画ファイルのパス例: /videos/{model}/{data}.mp4
      setVideoSrc1(`/generated/${data.data}/${data.model1}.mp4`);
      setVideoSrc2(`/generated/${data.data}/${data.model2}.mp4`);
      // オリジナル画像のパス例: /original/{data}.png
      setOriginalImageSrc(`/generated/${data.data}/original.png`);
      // 必要なら onNextScene にシーン情報を渡す
      onNext && onNext(data);
    } catch (error) {
      console.error("Error fetching random scene:", error);
    }
  };
  // 初回レンダリング時にランダムシーンを取得
  useEffect(() => {
    fetchRandomScene();
  }, []);
  // Next ボタン押下時: 件数カウントと次シーン選択
  const handleNext = () => {
    onNext();
    fetchRandomScene();
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
