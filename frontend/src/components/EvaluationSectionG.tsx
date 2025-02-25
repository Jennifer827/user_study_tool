// src/components/EvaluationSectionG.tsx
import React, { useEffect, useState } from "react";
import VideoWithEvaluation from "./VideoWithEvaluation";
import API_URL from "../config";

const evaluationLabels = [
  "Visual Quality",
  "Semantic Quality",
  "Objectness",
  "Structural Quality",
  "Overall Quality",
];

interface EvaluationSectionGProps {
  onNext: (sceneEvaluationData?: any) => void;
}

const EvaluationSectionG: React.FC<EvaluationSectionGProps> = ({ onNext }) => {
  const [videoSrc1, setVideoSrc1] = useState<string>("");
  const [videoSrc2, setVideoSrc2] = useState<string>("");
  const [originalImageSrc, setOriginalImageSrc] = useState<string>("");
  // グローバルなスライドインデックス
  const [globalSlideIndex, setGlobalSlideIndex] = useState<number>(0);
  // 各モデルの評価（項目数分の配列、初期はすべて null）
  const [ratingModelA, setRatingModelA] = useState<(number | null)[]>(
    new Array(evaluationLabels.length).fill(null)
  );
  const [ratingModelB, setRatingModelB] = useState<(number | null)[]>(
    new Array(evaluationLabels.length).fill(null)
  );
  const [abChoice, setAbChoice] = useState<string | null>(null);
  // 現在のシーン情報（getRandomR の結果）
  const [sceneData, setSceneData] = useState<any>(null);
  // resetTrigger を追加。シーン切替時にこの値をインクリメントしてリセットを通知する
  const [resetTrigger, setResetTrigger] = useState<number>(0);

  // 引数 shouldUpdateProgress により、進捗更新の有無を制御
  const fetchRandomScene = async (shouldUpdateProgress: boolean = true) => {
    try {
      const response = await fetch(`${API_URL}/api/getRandomG`, {});
      console.log(`${API_URL}/api/getRandomG`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // { model1: string, model2: string, data: string }
      setSceneData(data);
      setVideoSrc1(`/generated/${data.model1}/${data.data}.mp4`);
      setVideoSrc2(`/generated/${data.model2}/${data.data}.mp4`);
      setOriginalImageSrc(`/generated/original/${data.data}.png`);
      setGlobalSlideIndex(0);
      setRatingModelA(new Array(evaluationLabels.length).fill(null));
      setRatingModelB(new Array(evaluationLabels.length).fill(null));
      setAbChoice(null);
      // リセット通知用のトリガーを更新
      setResetTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching random scene:", error);
    }
  };

  // 初回レンダリング時は進捗更新をしない
  useEffect(() => {
    fetchRandomScene(false);
  }, []);

  // Next ボタン押下時のみ進捗更新（fetchRandomScene内で onNext が呼ばれる）
  // const handleNext = () => {
  //   fetchRandomScene(true);
  // };
  // Next Scene ボタン：すべての評価項目が入力されているかチェックし、
  // 入力済みならまとめてバックエンドに送信し、シーンを切り替える
  const handleNextScene = async () => {
    // チェック：どちらかに未入力がある場合はアラート
    const incompleteA = ratingModelA.some((rating) => rating === null);
    const incompleteB = ratingModelB.some((rating) => rating === null);
    if (incompleteA || incompleteB || abChoice === null) {
      alert("すべての評価項目に入力してください。");
      return;
    }

    // 期待する形式の JSON を各評価項目ごとに作成する
    const payloadRatings: {
      model: string;
      scene: string;
      criterion: string;
      rating: number;
    }[] = [];
    // const payloadRatings = [];
    evaluationLabels.forEach((label, index) => {
      payloadRatings.push({
        model: sceneData.model1,
        scene: sceneData.data,
        criterion: label,
        rating: ratingModelA[index] as number,
      });
    });
    evaluationLabels.forEach((label, index) => {
      payloadRatings.push({
        model: sceneData.model2,
        scene: sceneData.data,
        criterion: label,
        rating: ratingModelB[index] as number,
      });
    });

    try {
      const res = await fetch(`${API_URL}/api/submit_rating`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadRatings),
      });
      console.log(payloadRatings);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const result = await res.json();
      console.log("Ratings submitted:", result);
    } catch (error) {
      console.error("Error submitting aggregated ratings:", error);
      return;
    }

    // ABテスト
    const abPayload = {
      win_model: abChoice === "A" ? sceneData.model1 : sceneData.model2,
      lose_model: abChoice === "A" ? sceneData.model2 : sceneData.model1,
      scene: sceneData.data,
    };
    try {
      const res = await fetch(`${API_URL}/api/submit_AB`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(abPayload),
      });
      console.log("AB payload:", abPayload);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const result = await res.json();
      console.log("AB test submitted:", result);
    } catch (error) {
      console.error("Error submitting AB test result:", error);
      return;
    }

    // バックエンド送信後、親コールバック（onNext）を呼び出し、次シーンを取得
    onNext && onNext(payloadRatings);
    fetchRandomScene();
  };

  return (
    <div style={videosContainerStyle}>
      <div style={leftSectionStyle}>
        <VideoWithEvaluation
          videoSrc={videoSrc1}
          videoTitle="Model A"
          evaluationLabels={evaluationLabels}
          currentSlideIndex={globalSlideIndex}
          onEvaluationChange={(criterionIndex, rating) => {
            const newRatings = [...ratingModelA];
            newRatings[criterionIndex] = rating;
            setRatingModelA(newRatings);
          }}
          resetTrigger={resetTrigger}
        />
      </div>
      <div style={centerSectionStyle}>
        <h2 style={titleStyle}>Original Image</h2>
        <img src={originalImageSrc} style={originalImageStyle} alt="Original" />
        <div style={abTestControlsStyle}>
          <button
            onClick={() => setAbChoice("A")}
            style={{
              ...abButtonStyle,
              backgroundColor: abChoice === "A" ? "#007bff" : "#ccc",
            }}
          >
            A
          </button>
          <button
            onClick={() => setAbChoice("B")}
            style={{
              ...abButtonStyle,
              backgroundColor: abChoice === "B" ? "#007bff" : "#ccc",
            }}
          >
            B
          </button>
        </div>
        <button style={nextButtonStyle} onClick={handleNextScene}>
          Next
        </button>
      </div>
      <div style={rightSectionStyle}>
        <VideoWithEvaluation
          videoSrc={videoSrc2}
          videoTitle="Model B"
          evaluationLabels={evaluationLabels}
          currentSlideIndex={globalSlideIndex}
          onEvaluationChange={(criterionIndex, rating) => {
            const newRatings = [...ratingModelB];
            newRatings[criterionIndex] = rating;
            setRatingModelB(newRatings);
          }}
          resetTrigger={resetTrigger}
        />
      </div>
    </div>
  );
};

const videosContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "flex-start",
  flexWrap: "nowrap",
  width: "100%",
  maxWidth: "3000px",
  margin: "0 auto",
};

const leftSectionStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const rightSectionStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const centerSectionStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "1rem",
};

const titleStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "1rem",
};

const originalImageStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "500px",
  height: "auto",
  borderRadius: "10px",
  marginBottom: "1rem",
};

const nextButtonStyle: React.CSSProperties = {
  padding: "0.75rem 1.5rem",
  fontSize: "16px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const abTestControlsStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "10px",
};

const abButtonStyle: React.CSSProperties = {
  margin: "0 0.5rem",
  padding: "0.5rem 1rem",
  fontSize: "16px",
  border: "none",
  borderRadius: "5px",
  color: "#fff",
  cursor: "pointer",
};

export default EvaluationSectionG;
