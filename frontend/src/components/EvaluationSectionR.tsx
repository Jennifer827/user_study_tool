// export default EvaluationSectionR;
import React, { useEffect, useState } from "react";
import ImagesWithEvaluation from "./ImagesWithEvaluation";
import API_URL from "../config";

const evaluationLabels = [
  "Visual Quality",
  "Semantic Quality",
  "Structural Quality",
  "Objectness",
  "Overall Quality",
];

interface EvaluationSectionRProps {
  onNext: (sceneEvaluationData?: any) => void;
}

const EvaluationSectionR: React.FC<EvaluationSectionRProps> = ({ onNext }) => {
  const [imageList1, setImageList1] = useState<string[]>([]);
  const [imageList2, setImageList2] = useState<string[]>([]);
  // グローバルなスライドインデックス
  const [globalSlideIndex, setGlobalSlideIndex] = useState<number>(0);

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

  // シーン切り替え時（Next Scene）にディレクトリパスを取得し、画像リストを更新する
  const fetchRandomScene = async (shouldUpdateProgress: boolean = true) => {
    try {
      const response = await fetch(`${API_URL}/api/getRandomR`);
      console.log(`${API_URL}/api/getRandomR`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // { model1: string, model2: string, data: string }
      const dir1 = `/reconstructed/${data.data}/${data.model1}/`;
      const dir2 = `/reconstructed/${data.data}/${data.model2}/`;

      const [list1, list2] = await Promise.all([
        fetchImageList(dir1),
        fetchImageList(dir2),
      ]);

      setImageList1(list1);
      setImageList2(list2);
      // シーンが変わったらスライドインデックスをリセット
      setGlobalSlideIndex(0);

      if (shouldUpdateProgress) {
        onNext && onNext(data);
      }
    } catch (error) {
      console.error("Error fetching random scene:", error);
    }
  };

  useEffect(() => {
    fetchRandomScene(false);
  }, []);

  // シーン切り替えボタン
  const handleNextScene = () => {
    fetchRandomScene(true);
  };

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

  return (
    <div style={videosContainerStyle}>
      <div style={leftSectionStyle}>
        <ImagesWithEvaluation
          imageUrls={imageList1}
          imageTitle="Model A"
          evaluationLabels={evaluationLabels}
          currentSlideIndex={globalSlideIndex}
        />
      </div>
      <div style={centerSectionStyle}>
        <div style={controlsStyle}>
          <button onClick={handleGlobalPrev} style={buttonStyle}>
            Prev
          </button>
          <button onClick={handleGlobalNext} style={buttonStyle}>
            Next
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
        />
      </div>
    </div>
  );
};

const videosContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "flex-start",
  flexWrap: "wrap",
  width: "100%",
  maxWidth: "2000px",
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

const buttonStyle: React.CSSProperties = {
  margin: "0.5rem",
  padding: "0.5rem 1rem",
  fontSize: "16px",
};
const controlsStyle: React.CSSProperties = {
  marginBottom: "10px",
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

export default EvaluationSectionR;
