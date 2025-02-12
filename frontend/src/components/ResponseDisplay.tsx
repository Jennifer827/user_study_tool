import React from "react";

interface ResponseDisplayProps {
  response: any;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response }) => {
  if (!response) return null;

  return (
    <div style={{ marginTop: "1rem" }}>
      <h2>レスポンス</h2>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
};

export default ResponseDisplay;
