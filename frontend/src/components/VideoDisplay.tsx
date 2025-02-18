// src/components/VideoDisplay.tsx
import React from "react";

const VideoDisplay: React.FC = () => {
  return (
    <div style={styles.container}>
      <video
        src="/video1.mp4" // publicフォルダ内に配置した場合はルートから参照
        autoPlay
        loop
        muted
        playsInline
        style={styles.video}
      />
      <video
        src="/video2.mp4" // 同様にルートから指定
        autoPlay
        loop
        muted
        playsInline
        style={styles.video}
      />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#000",
  },
  video: {
    width: "45%", // 画面幅の45%ずつ
    height: "auto",
    margin: "0 2.5%",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
  },
};

export default VideoDisplay;
