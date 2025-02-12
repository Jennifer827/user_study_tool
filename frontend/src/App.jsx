import { useState } from "react";
import API_URL from "./config";

function App() {
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    const data = { message: "Hello from React!" };

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
    } catch (error) {
      console.error("Error sending request:", error);
      setResponse({ error: "Failed to connect to backend" });
    }
  };

  // CSVをダウンロードする関数
  const handleDownloadCSV = () => {
    window.location.href = `${API_URL}/api/export_csv`;
  };

  return (
    <div>
      <div>
        <h1>React ↔ Flask API Test</h1>
        <button onClick={handleSubmit}>Send Request</button>
        {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      </div>
      <div>
        <h1>被験者実験のデータ管理</h1>
        <button onClick={handleDownloadCSV}>CSVをダウンロード</button>
      </div>
    </div>
  );
}

export default App;
