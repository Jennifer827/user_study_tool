import React, { useState, useEffect } from "react";
import EvaluationSectionR from "./components/EvaluationSectionR";
import EvaluationSectionG from "./components/EvaluationSectionG";
import ProgressBar from "./components/ProgressBar";

const TOTAL_EVALUATIONS_PER_MODE = 2;
const TOTAL_EVALUATIONS = TOTAL_EVALUATIONS_PER_MODE * 2; // 30件

interface SelectedData {
  model1: string;
  model2: string;
  data: string;
}

const App: React.FC = () => {
  const [currentEvaluation, setCurrentEvaluation] = useState<number>(1); // 現在の評価番号（1～30）
  const [mode, setMode] = useState<"reconstruction" | "generation">( // モード：1～15は reconstruction、16～30は generation
    "reconstruction"
  );

  // 評価が完了したシーンのデータをまとめる（必要に応じて利用）
  const [evaluationData, setEvaluationData] = useState<any[]>([]);

  // 評価番号が変化したらモードを切り替える
  useEffect(() => {
    if (currentEvaluation > TOTAL_EVALUATIONS_PER_MODE) {
      setMode("generation");
    } else {
      setMode("reconstruction");
    }
  }, [currentEvaluation]);

  // シーン評価完了時に呼ばれるコールバック
  const handleNext = (sceneEvaluationData: any) => {
    // シーン評価データを保存（必要に応じてバックエンドに送信済みならこのローカル状態で管理）
    setEvaluationData((prev) => [...prev, sceneEvaluationData]);
    // 評価番号をインクリメント
    setCurrentEvaluation((prev) => prev + 1);
  };

  // すべての評価が完了したら終了画面を表示
  if (currentEvaluation > TOTAL_EVALUATIONS) {
    return (
      <div>
        <h1>ご協力いただき誠にありがとうございました。</h1>
        <h2>ブラウザ上部のタブを消して画面を閉じてください。</h2>
      </div>
    );
  }
  return (
    <div style={appContainerStyle}>
      {/* <h1>3D生成モデル評価実験</h1> */}
      <ProgressBar current={currentEvaluation} total={TOTAL_EVALUATIONS} />
      {mode === "reconstruction" ? (
        <EvaluationSectionR onNext={handleNext} />
      ) : (
        <EvaluationSectionG onNext={handleNext} />
      )}
    </div>
  );
};

const appContainerStyle: React.CSSProperties = {
  padding: "1rem",
  fontFamily: "sans-serif",
  display: "flex",
};

export default App;
