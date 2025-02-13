// import React from "react";
// import VideoWithEvaluation from "./VideoWithEvaluation";

// const evaluationLabels = [
//   "Visual Quality",
//   "Semantic Quality",
//   "Objectness",
//   "Overall Quality",
// ];

// interface Props {
//   videoSrc1: string;
//   videoTitle1: string;
//   videoSrc2: string;
//   videoTitle2: string;
// }

// const EvaluationSectionR: React.FC<Props> = ({
//   videoSrc1,
//   videoTitle1,
//   videoSrc2,
//   videoTitle2,
// }) => {
//   const handleEvaluationChangeVideo1 = (
//     criterionIndex: number,
//     rating: number
//   ) => {
//     console.log(
//       `${videoTitle1} - ${evaluationLabels[criterionIndex]}: ${rating}`
//     );
//   };

//   const handleEvaluationChangeVideo2 = (
//     criterionIndex: number,
//     rating: number
//   ) => {
//     console.log(
//       `${videoTitle2} - ${evaluationLabels[criterionIndex]}: ${rating}`
//     );
//   };

//   return (
//     <div style={videosContainerStyle}>
//       <VideoWithEvaluation
//         videoSrc={videoSrc1}
//         videoTitle={videoTitle1}
//         evaluationLabels={evaluationLabels}
//         onEvaluationChange={handleEvaluationChangeVideo1}
//       />
//       <div style={originalContainerStyle}>
//         <h2 style={titleStyle}>Original Image</h2>
//         <img src="/original.png" style={originalImageStyle} alt="Original" />
//       </div>
//       <VideoWithEvaluation
//         videoSrc={videoSrc2}
//         videoTitle={videoTitle2}
//         evaluationLabels={evaluationLabels}
//         onEvaluationChange={handleEvaluationChangeVideo2}
//       />
//     </div>
//   );
// };

// // スタイルの修正
// const videosContainerStyle: React.CSSProperties = {
//   display: "flex",
//   justifyContent: "space-around",
//   flexWrap: "wrap",
//   width: "100%",
//   maxWidth: "4000px",
//   margin: "0 auto",
// };

// const originalContainerStyle: React.CSSProperties = {
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   textAlign: "center",
//   margin: "0 20px",
// };

// const originalImageStyle: React.CSSProperties = {
//   width: "100%",
//   maxWidth: "500px",
//   height: "auto",
//   borderRadius: "10px",
// };

// const titleStyle: React.CSSProperties = {
//   textAlign: "center",
// };

// export default EvaluationSectionR;
// src/components/EvaluationSectionR.tsx
import React from "react";
import VideoWithEvaluation from "./VideoWithEvaluation";

const evaluationLabels = [
  "Visual Quality",
  "Semantic Quality",
  "Objectness",
  "Overall Quality",
];

interface Props {
  videoSrc1: string;
  videoTitle1: string;
  videoSrc2: string;
  videoTitle2: string;
  // onNext: () => void;
  onNext: (sceneEvaluationData?: any) => void;
}

const EvaluationSectionR: React.FC<Props> = ({
  videoSrc1,
  videoTitle1,
  videoSrc2,
  videoTitle2,
  onNext,
}) => {
  return (
    <div style={videosContainerStyle}>
      <div style={leftSectionStyle}>
        <VideoWithEvaluation
          videoSrc={videoSrc1}
          videoTitle={videoTitle1}
          evaluationLabels={evaluationLabels}
        />
      </div>
      <div style={centerSectionStyle}>
        <h2 style={titleStyle}>Original Image</h2>
        <img src="/original.png" style={originalImageStyle} alt="Original" />
        <button style={nextButtonStyle} onClick={() => onNext()}>
          Next
        </button>
      </div>
      <div style={rightSectionStyle}>
        <VideoWithEvaluation
          videoSrc={videoSrc2}
          videoTitle={videoTitle2}
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
  flex: "1",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const rightSectionStyle: React.CSSProperties = {
  flex: "1",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const centerSectionStyle: React.CSSProperties = {
  flex: "1",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // justifyContent: "center",
  // margin: "0 20px",
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

export default EvaluationSectionR;
