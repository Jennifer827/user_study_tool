// // // src/App.tsx
// // import React, { useState } from "react";
// // import InputForm from "./components/InputForm";
// // import ResponseDisplay from "./components/ResponseDisplay";
// // import DownloadButton from "./components/DownloadButton";
// // import VideoDisplay from "./components/VideoDisplay";

// // const App: React.FC = () => {
// //   const [response, setResponse] = useState<any>(null);

// //   return (
// //     <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
// //       <h1>ユーザー入力フォーム</h1>
// //       <InputForm onResponse={setResponse} />
// //       <ResponseDisplay response={response} />
// //       <DownloadButton />
// //       <VideoDisplay />
// //     </div>
// //   );
// // };

// // export default App;
// // src/App.tsx
// // import React from "react";
// // import VideoWithRating from "./components/RatingButtons";

// // const App: React.FC = () => {
// //   const handleRatingChangeVideo1 = (rating: number) => {
// //     console.log("Video 1の評価:", rating);
// //     // 必要に応じて評価結果をバックエンドに送信する処理を追加可能
// //   };

// //   const handleRatingChangeVideo2 = (rating: number) => {
// //     console.log("Video 2の評価:", rating);
// //     // 必要に応じて評価結果をバックエンドに送信する処理を追加可能
// //   };

// //   return (
// //     <div style={appContainerStyle}>
// //       <h1>ビデオ評価実験</h1>
// //       <div style={videosContainerStyle}>
// //         <VideoWithRating
// //           videoSrc="/video1.mp4"
// //           videoTitle="Video 1"
// //           onRatingChange={handleRatingChangeVideo1}
// //         />
// //         <VideoWithRating
// //           videoSrc="/video2.mp4"
// //           videoTitle="Video 2"
// //           onRatingChange={handleRatingChangeVideo2}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // const appContainerStyle: React.CSSProperties = {
// //   padding: "1rem",
// //   fontFamily: "sans-serif",
// // };

// // const videosContainerStyle: React.CSSProperties = {
// //   display: "flex",
// //   justifyContent: "space-around",
// //   flexWrap: "wrap",
// // };

// // export default App;
// // src/App.tsx
// import React from "react";
// import VideoWithEvaluation from "./components/RatingButtons";

// const evaluationLabels = [
//   "画質", // Quality of video
//   "音質", // Audio quality
//   "内容の明瞭さ", // Clarity of content
//   "全体の印象", // Overall impression
// ];

// const App: React.FC = () => {
//   const handleEvaluationChangeVideo1 = (
//     criterionIndex: number,
//     rating: number
//   ) => {
//     console.log(`Video 1 - ${evaluationLabels[criterionIndex]}: ${rating}`);
//     // 必要に応じて、ここでバックエンドへの送信処理を追加
//   };

//   const handleEvaluationChangeVideo2 = (
//     criterionIndex: number,
//     rating: number
//   ) => {
//     console.log(`Video 2 - ${evaluationLabels[criterionIndex]}: ${rating}`);
//     // 必要に応じて、ここでバックエンドへの送信処理を追加
//   };

//   return (
//     <div style={appContainerStyle}>
//       <h1>ビデオ評価実験</h1>
//       <div style={videosContainerStyle}>
//         <VideoWithEvaluation
//           videoSrc="/video1.mp4"
//           videoTitle="Video 1"
//           evaluationLabels={evaluationLabels}
//           onEvaluationChange={handleEvaluationChangeVideo1}
//         />
//         <VideoWithEvaluation
//           videoSrc="/video2.mp4"
//           videoTitle="Video 2"
//           evaluationLabels={evaluationLabels}
//           onEvaluationChange={handleEvaluationChangeVideo2}
//         />
//       </div>
//     </div>
//   );
// };

// const appContainerStyle: React.CSSProperties = {
//   padding: "1rem",
//   fontFamily: "sans-serif",
// };

// const videosContainerStyle: React.CSSProperties = {
//   display: "flex",
//   justifyContent: "space-around",
//   flexWrap: "wrap",
// };

// export default App;
// src/App.tsx
import React from "react";
import VideoWithEvaluation from "./components/RatingButtons";

const evaluationLabels = [
  "Visual Quality",
  "Semantic Quality",
  "Objectness",
  "Overall Quality",
];

const App: React.FC = () => {
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
      <h1>ビデオ評価実験</h1>
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

export default App;
