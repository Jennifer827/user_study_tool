import React from "react";
import API_URL from "../config";

const DownloadButton: React.FC = () => {
  const handleDownloadCSV = () => {
    window.location.href = `${API_URL}/api/export`;
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h1>CSVダウンロード</h1>
      <button onClick={handleDownloadCSV}>CSVをダウンロード</button>
    </div>
  );
};

export default DownloadButton;
