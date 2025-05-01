// // src/components/VideoPlayer/VideoPlayer.tsx
// import React from "react";
// import styles from "./VideoPlayer.module.css";

// interface VideoPlayerProps {
//   videoSrc: string;
// }

// const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc }) => {
//   return (
//     <div className={styles.videoContainer}>
//       <video
//         src={videoSrc}
//         autoPlay
//         loop
//         muted
//         playsInline
//         className={styles.video}
//       />
//     </div>
//   );
// };

// export default VideoPlayer;
import React, { useRef, useEffect } from "react";
import styles from "./VideoPlayer.module.css";

interface VideoPlayerProps {
  videoSrc: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // 0.5倍速
    }
  }, []);

  return (
    <div className={styles.videoContainer}>
      <video
        ref={videoRef}
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
