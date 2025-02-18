// src/components/EvaluationSectionR.tsx
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
  // const [imageDir1, setImageDir1] = useState<string>("");
  // const [imageDir2, setImageDir2] = useState<string>("");
  const [imageList1, setImageList1] = useState<string[]>([]);
  const [imageList2, setImageList2] = useState<string[]>([]);

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

  // 引数 shouldUpdateProgress により、進捗更新の有無を制御
  const fetchRandomScene = async (shouldUpdateProgress: boolean = true) => {
    try {
      const response = await fetch(`${API_URL}/api/getRandomR`, {});
      console.log(`${API_URL}/api/getRandomR`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // { model1: string, model2: string, data: string }
      const dir1 = `/reconstructed/${data.data}/${data.model1}/`;
      const dir2 = `/reconstructed/${data.data}/${data.model2}/`;

      // setImageDir1(`/reconstructed/${data.data}/${data.model1}/`);
      // setImageDir2(`/reconstructed/${data.data}/${data.model2}/`);
      // 両ディレクトリから画像リストを並列で取得
      const [list1, list2] = await Promise.all([
        fetchImageList(dir1),
        fetchImageList(dir2),
      ]);

      setImageList1(list1);
      setImageList2(list2);

      // Next ボタン押下時のみ進捗を更新する
      if (shouldUpdateProgress) {
        onNext && onNext(data);
      }
    } catch (error) {
      console.error("Error fetching random scene:", error);
    }
  };

  // 初回レンダリング時は進捗更新をしない
  useEffect(() => {
    fetchRandomScene(false);
  }, []);

  // Next ボタン押下時のみ進捗更新（fetchRandomScene内で onNext が呼ばれる）
  const handleNext = () => {
    fetchRandomScene(true);
  };

  return (
    <div style={videosContainerStyle}>
      <div style={leftSectionStyle}>
        <ImagesWithEvaluation
          imageUrls={imageList1}
          imageTitle="Model A"
          evaluationLabels={evaluationLabels}
        />
      </div>
      <div style={centerSectionStyle}>
        <button style={nextButtonStyle} onClick={handleNext}>
          Next
        </button>
      </div>
      <div style={rightSectionStyle}>
        <ImagesWithEvaluation
          imageUrls={imageList2}
          imageTitle="Model B"
          evaluationLabels={evaluationLabels}
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

export default EvaluationSectionR;
