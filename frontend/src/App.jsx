// import { useState } from "react";
// import API_URL from "./config";

// function App() {
//   const [response, setResponse] = useState(null);

//   const handleSubmit = async () => {
//     const data = { message: "Hello from React!" };

//     try {
//       const res = await fetch(`${API_URL}/api/submit`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       if (!res.ok) {
//         throw new Error(`HTTP error! Status: ${res.status}`);
//       }

//       const result = await res.json();
//       setResponse(result);
//     } catch (error) {
//       console.error("Error sending request:", error);
//       setResponse({ error: "Failed to connect to backend" });
//     }
//   };

//   // CSVをダウンロードする関数
//   const handleDownloadCSV = () => {
//     window.location.href = `${API_URL}/api/export_csv`;
//   };

//   return (
//     <div>
//       <div>
//         <h1>React ↔ Flask API Test</h1>
//         <button onClick={handleSubmit}>Send Request</button>
//         {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
//       </div>
//       <div>
//         <h1>被験者実験のデータ管理</h1>
//         <button onClick={handleDownloadCSV}>CSVをダウンロード</button>
//       </div>
//     </div>
//   );
// }

// export default App;

// src/App.jsx
import { useState } from "react";
import API_URL from "./config";

function App() {
  // ユーザー入力とバックエンドからのレスポンスの状態管理
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState(null);

  // 入力フォームの送信処理
  const handleSubmit = async (e) => {
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
    } catch (error) {
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
            onChange={(e) => setUserInput(e.target.value)}
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
}

export default App;
