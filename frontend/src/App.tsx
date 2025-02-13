import React from "react";
import EvaluationSectionR from "./components/EvaluationSectionR";

const App: React.FC = () => {
  return (
    <div style={appContainerStyle}>
      <h1>3D生成モデル評価実験</h1>
      <EvaluationSectionR
        videoSrc1="/video1.mp4"
        videoTitle1="Model 1"
        videoSrc2="/video2.mp4"
        videoTitle2="Model 2"
      />
    </div>
  );
};

const appContainerStyle: React.CSSProperties = {
  padding: "1rem",
  fontFamily: "sans-serif",
};

export default App;
