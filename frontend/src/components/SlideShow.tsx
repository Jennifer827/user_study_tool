// export default Slideshow;
import React from "react";

interface SlideshowProps {
  // 指定ディレクトリ内の全画像のURLリスト
  imageUrls: string[];
  currentIndex: number;
}

const Slideshow: React.FC<SlideshowProps> = ({ imageUrls, currentIndex }) => {
  return (
    <div style={containerStyle}>
      <div style={imageContainerStyle}>
        <img
          src={imageUrls[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          style={mainImageStyle}
        />
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const imageContainerStyle: React.CSSProperties = {
  width: "600px",
  height: "400px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "10px",
};

const mainImageStyle: React.CSSProperties = {
  maxWidth: "100%",
  maxHeight: "100%",
  borderRadius: "10px",
};

export default Slideshow;
