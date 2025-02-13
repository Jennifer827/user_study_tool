// src/components/VideoPlayer/VideoPlayer.tsx
import React from "react";
import styles from "./VideoPlayer.module.css";

interface VideoPlayerProps {
  videoSrc: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc }) => {
  return (
    <div className={styles.videoContainer}>
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className={styles.video}
      />
    </div>
  );
};

export default VideoPlayer;
