// src/components/ProgressBar.tsx
import React from "react";

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progressPercent = (current / total) * 100;
  return (
    <div style={containerStyle}>
      <div style={{ ...barStyle, width: `${progressPercent}%` }} />
      <div style={textStyle}>
        {current} / {total}
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "30px",
  backgroundColor: "#eee",
};

const barStyle: React.CSSProperties = {
  height: "100%",
  backgroundColor: "#007bff",
  transition: "width 0.3s",
};

const textStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  lineHeight: "30px",
  fontWeight: "bold",
  color: "black",
};

export default ProgressBar;
