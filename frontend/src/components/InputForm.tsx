import React, { useState } from "react";
import API_URL from "../config";

interface InputFormProps {
  onResponse: (response: any) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onResponse }) => {
  const [userInput, setUserInput] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { user_input: userInput };

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
      onResponse(result);
      setUserInput(""); // 送信後リセット
    } catch (error) {
      console.error("Error sending request:", error);
      onResponse({ error: "Failed to connect to backend" });
    }
  };

  return (
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
  );
};

export default InputForm;
