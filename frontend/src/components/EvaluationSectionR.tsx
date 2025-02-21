// src/components/EvaluationSectionR.tsx
import React, { useEffect, useState } from "react";
import ImagesWithEvaluation from "./ImagesWithEvaluation";
import Slideshow from "./SlideShow";
import API_URL from "../config";

const evaluationLabels = [
  "Visual Quality",
  "Semantic Quality",
  // "Structural Quality",
  "Objectness",
  "Overall Quality",
];

interface EvaluationSectionRProps {
  onNext: (sceneEvaluationData?: any) => void;
}

const EvaluationSectionR: React.FC<EvaluationSectionRProps> = ({ onNext }) => {
  const [imageList1, setImageList1] = useState<string[]>([]);
  const [imageList2, setImageList2] = useState<string[]>([]);
  const [imageListOri, setImageListOri] = useState<string[]>([]);
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

  /**
   * 指定されたディレクトリ内の画像ファイル名一覧を取得し、
   * フルパスの URL リストに変換して返す。
   * バックエンドは /api/listImages?dir=... の形式でファイル一覧を JSON 配列で返すものとする。
   */
  const fetchImageList = async (dir: string): Promise<string[]> => {
    try {
      const response = await fetch(
        `${API_URL}/api/listImages?dir=${encodeURIComponent(dir)}`
      );
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // 例: ["imgA.png", "photo_2025.jpg", "sample.png", ...]
      const fileNames: string[] = await response.json();
      // 各ファイル名にディレクトリパスを結合してフルURLに
      return fileNames.map((fileName) => `${dir}${fileName}`);
    } catch (error) {
      console.error("Error fetching image list for directory:", dir, error);
      return [];
    }
  };

  // シーン切り替え時に新しいシーン情報と画像リストを取得し、評価状態をリセットする
  const fetchRandomScene = async (shouldUpdateProgress: boolean = true) => {
    try {
      const response = await fetch(`${API_URL}/api/getRandomR`);
      console.log(`${API_URL}/api/getRandomR`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // { model1: string, model2: string, data: string }
      setSceneData(data);
      const dir1 = `/reconstructed/${data.data}/${data.model1}/`;
      const dir2 = `/reconstructed/${data.data}/${data.model2}/`;
      const dir_ori = `/reconstructed/${data.data}/GT/`;

      const [list1, list2, list_ori] = await Promise.all([
        fetchImageList(dir1),
        fetchImageList(dir2),
        fetchImageList(dir_ori),
      ]);

      setImageList1(list1);
      setImageList2(list2);
      setImageListOri(list_ori);
      // シーンが変わったらスライドインデックスと評価状態をリセット
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

  useEffect(() => {
    fetchRandomScene(false);
  }, []);

  // 中央の統一Prev/Nextボタンで全スライドショーの表示画像を切り替える
  const handleGlobalPrev = () => {
    setGlobalSlideIndex((prevIndex) =>
      imageList1.length > 0
        ? prevIndex === 0
          ? imageList1.length - 1
          : prevIndex - 1
        : 0
    );
  };

  const handleGlobalNext = () => {
    setGlobalSlideIndex((prevIndex) =>
      imageList1.length > 0
        ? prevIndex === imageList1.length - 1
          ? 0
          : prevIndex + 1
        : 0
    );
  };

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
        <ImagesWithEvaluation
          imageUrls={imageList1}
          imageTitle="Model A"
          evaluationLabels={evaluationLabels}
          currentSlideIndex={globalSlideIndex}
          // 更新された評価を受け取るコールバック
          onEvaluationChange={(criterionIndex, rating) => {
            const newRatings = [...ratingModelA];
            newRatings[criterionIndex] = rating;
            setRatingModelA(newRatings);
          }}
          resetTrigger={resetTrigger}
        />
      </div>
      <div style={centerSectionStyle}>
        <h2 style={titleStyle}>Reference Image</h2>
        <Slideshow imageUrls={imageListOri} currentIndex={globalSlideIndex} />
        <div style={controlsStyle}>
          <button onClick={handleGlobalPrev} style={buttonStyle}>
            Prev
          </button>
          <button onClick={handleGlobalNext} style={buttonStyle}>
            Next
          </button>
        </div>
        <h2 style={titleStyle}>Which model is better?</h2>
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
        <button onClick={handleNextScene} style={nextSceneButtonStyle}>
          Next Scene
        </button>
      </div>
      <div style={rightSectionStyle}>
        <ImagesWithEvaluation
          imageUrls={imageList2}
          imageTitle="Model B"
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

const controlsStyle: React.CSSProperties = {
  marginBottom: "10px",
};

const buttonStyle: React.CSSProperties = {
  margin: "0.5rem",
  padding: "0.5rem 1rem",
  fontSize: "16px",
};

const nextSceneButtonStyle: React.CSSProperties = {
  padding: "0.75rem 1.5rem",
  fontSize: "16px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "1rem",
};

const abTestControlsStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "10px",
};

const abButtonStyle: React.CSSProperties = {
  margin: "0 1rem",
  padding: "0.5rem 1rem",
  fontSize: "16px",
  border: "none",
  borderRadius: "5px",
  color: "#fff",
  cursor: "pointer",
};

const titleStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "0.5rem",
};

const originalImageStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "500px",
  height: "auto",
  borderRadius: "10px",
  marginBottom: "1rem",
};

export default EvaluationSectionR;
