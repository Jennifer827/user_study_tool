import React, { useState } from "react";
import InputForm from "./components/InputForm";
import ResponseDisplay from "./components/ResponseDisplay";
import DownloadButton from "./components/DownloadButton";

const App: React.FC = () => {
  const [response, setResponse] = useState<any>(null);

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h1>ユーザー入力フォーム</h1>
      <InputForm onResponse={setResponse} />
      <ResponseDisplay response={response} />
      <DownloadButton />
    </div>
  );
};

export default App;
