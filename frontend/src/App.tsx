import React from "react";
import EvaluationSectionR from "./components/EvaluationSectionR";

const App: React.FC = () => {
  return (
    <div style={appContainerStyle}>
      <h1>ビデオ評価実験</h1>
      <EvaluationSectionR />
    </div>
  );
};

const appContainerStyle: React.CSSProperties = {
  padding: "1rem",
  fontFamily: "sans-serif",
};

export default App;
