// src/App.tsx
import React, { useState } from "react";
import API_URL from "./config";

const App: React.FC = () => {
  // ユーザー入力とバックエンドからのレスポンスの状態管理
  const [userInput, setUserInput] = useState<string>("");
  const [response, setResponse] = useState<any>(null);

  // 入力フォームの送信処理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ページリロードを防止
    const data = { user_input: userInput }; // 送信データ

    try {
      const res = await fetch(`${API_URL}/api/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const result = await res.json();
      setResponse(result);
      setUserInput(""); // 送信後、入力欄をリセット
    } catch (error: unknown) {
      console.error("Error sending request:", error);
      setResponse({ error: "Failed to connect to backend" });
    }
  };

  // CSVをダウンロードする処理
  const handleDownloadCSV = () => {
    window.location.href = `${API_URL}/api/export`;
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h1>ユーザー入力フォーム</h1>
      <form onSubmit={handleSubmit}>
        <label>
          入力:
          <input
            type="text"
            value={userInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserInput(e.target.value)
            }
            style={{ marginLeft: "0.5rem" }}
          />
        </label>
        <button type="submit" style={{ marginLeft: "1rem" }}>
          送信
        </button>
      </form>

      {response && (
        <div style={{ marginTop: "1rem" }}>
          <h2>レスポンス</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      <div style={{ marginTop: "2rem" }}>
        <h1>CSVダウンロード</h1>
        <button onClick={handleDownloadCSV}>CSVをダウンロード</button>
      </div>
    </div>
  );
};

export default App;
