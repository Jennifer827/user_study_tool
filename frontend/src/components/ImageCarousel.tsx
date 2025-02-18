// src/components/ImageCarousel.tsx
import React, { useState } from "react";

const images = [
  ["image1_left.jpg", "image1_right.jpg"],
  ["image2_left.jpg", "image2_right.jpg"],
  ["image3_left.jpg", "image3_right.jpg"],
];

const ImageCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);

  const nextImages = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div style={{..., styles.container, flexDirection: 'column'}}>
      <img src={images[index][0]} alt="Left" style={styles.image} />
      <img src={images[index][1]} alt="Right" style={styles.image} />
      <button onClick={nextImages} style={styles.button}>
        Next
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    // flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#eee",
  },
  image: {
    width: "40%",
    height: "auto",
    margin: "10px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
  },
};

export default ImageCarousel;
