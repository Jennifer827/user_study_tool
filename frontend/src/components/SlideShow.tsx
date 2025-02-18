import React, { useState } from "react";

interface SlideshowProps {
  // 指定ディレクトリ内の全画像のURLリスト
  imageUrls: string[];
}

const Slideshow: React.FC<SlideshowProps> = ({ imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // 前の画像に切り替え
  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  };

  // 次の画像に切り替え
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  // サムネイルクリックで任意の画像へ
  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div style={containerStyle}>
      {/* メイン画像エリア */}
      <div style={imageContainerStyle}>
        <img
          src={imageUrls[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          style={mainImageStyle}
        />
      </div>

      {/* 切り替えボタン */}
      <div style={controlsStyle}>
        <button onClick={goToPrev} style={buttonStyle}>
          Prev
        </button>
        <button onClick={goToNext} style={buttonStyle}>
          Next
        </button>
      </div>
    </div>
  );
};

// 各種スタイル
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

const controlsStyle: React.CSSProperties = {
  marginBottom: "10px",
};

const buttonStyle: React.CSSProperties = {
  margin: "0 10px",
  padding: "8px 16px",
  fontSize: "16px",
};

const thumbnailsStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "8px",
};

const thumbnailStyle: React.CSSProperties = {
  width: "80px",
  height: "60px",
  objectFit: "cover",
  cursor: "pointer",
  borderRadius: "5px",
};

export default Slideshow;
