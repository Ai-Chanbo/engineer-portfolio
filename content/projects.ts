import type { Project } from "@/types";

/**
 * Portfolio projects.
 *
 * Add a new project by appending an object here — the Portfolio section and the
 * /work/[slug] detail pages are generated automatically from this array.
 *
 * ⚠️ Screenshots are rendered as on-topic mock visuals for now (`visual`).
 * Replace with real screenshots (public/images/projects/…) before publishing.
 * GitHub URLs are placeholders (TODO).
 */
export const projects: Project[] = [
  {
    slug: "ai-visual-inspection",
    index: "01",
    title: "AI外観検査システム",
    github: "https://github.com/Ai-Chanbo/manufacturing-ai-vision-inspection",
    subtitle: "PLC連携 × ONNX推論で、製造ラインの検査を自動化",
    year: "2024",
    visual: "inspection",
    overview:
      "製造ラインの外観検査を自動化するシステム。PLCからのトリガー信号で撮像・検査を開始し、AIモデル（ONNX）が製品のOK/NGを瞬時に判定します。C#製HMIとPython製の推論APIを分離し、現場運用に耐える構成にしました。",
    problem:
      "目視検査は検査員によって基準がばらつき、見逃しや疲労による品質低下が課題でした。判定基準を標準化し、24時間安定した検査品質と検査記録のトレーサビリティを実現する必要がありました。",
    architecture: {
      caption: "PLCトリガー → 撮像 → 前処理 → ONNX推論 → 判定・記録",
      stages: [
        { name: "現場", nodes: ["PLC", "Modbus TCP", "カメラ"] },
        { name: "HMI", nodes: ["C# WinForms", "検査UI"] },
        { name: "推論API", nodes: ["FastAPI", "OpenCV", "ONNX Runtime"] },
        { name: "記録 / 連携", nodes: ["SQLite", "CSV", "Azure"] },
      ],
    },
    tech: ["C#", "Python", "OpenCV", "ONNX Runtime", "FastAPI", "Azure"],
    features: [
      "PLCトリガー（Modbus TCP）による自動検査開始",
      "ONNX Runtimeによる高速なOK/NG推論判定",
      "GPU対応（CUDA → DirectML → CPU の自動フォールバック）",
      "検査結果のCSV/SQLite保存とトレーサビリティ",
      "日付別の画像保存・検査ログ管理",
    ],
    highlights: [
      "HMI（C#）と推論API（Python）を分離し、保守性とスケールを両立",
      "モデル未配置でもルールベースで動作するフォールバック設計",
      "推論プロバイダを自動選択し、環境を問わず安定稼働",
      "現場の稼働を止めない自動再接続・エラーハンドリング",
    ],
    // github 未設定 → GitHubボタンは非表示（#19 未提供）。URLを入れると自動表示。
  },
  {
    slug: "plc-temperature-monitoring",
    index: "02",
    title: "PLC温度監視システム",
    github: "https://github.com/Ai-Chanbo/ai-business-solutions",
    subtitle: "設備の温度データをクラウドで収集・可視化",
    year: "2024",
    visual: "monitoring",
    overview:
      "PLCが取得する設備の温度データを、Azure IoT Hub 経由でクラウドに集約し、リアルタイムに可視化するシステム。C# / .NET のエッジアプリで収集し、Azure Functions で処理、Cosmos DB に蓄積、ScottPlot でダッシュボード表示します。",
    problem:
      "設備温度の異常は現場でしか把握できず、記録も紙・ローカル管理で分散していました。遠隔からの常時監視と、異常の早期検知・履歴分析を可能にするデータ基盤が求められていました。",
    architecture: {
      caption: "PLC → エッジ収集 → Azure IoT Hub → Functions → 蓄積・可視化",
      stages: [
        { name: "現場", nodes: ["PLC", "温度センサ"] },
        { name: "エッジ", nodes: ["C# / .NET", "収集アプリ"] },
        { name: "クラウド", nodes: ["Azure IoT Hub", "Azure Functions"] },
        { name: "蓄積 / 可視化", nodes: ["Cosmos DB", "ScottPlot"] },
      ],
    },
    tech: [
      "C#",
      ".NET",
      "PLC",
      "Azure IoT Hub",
      "Azure Functions",
      "Cosmos DB",
      "ScottPlot",
    ],
    features: [
      "PLCからの温度データを一定周期で収集",
      "Azure IoT Hub経由でクラウドへセキュアに送信",
      "Azure Functionsによるサーバーレス処理・閾値判定",
      "Cosmos DBへの時系列データ蓄積",
      "ScottPlotによるリアルタイムグラフ表示",
    ],
    highlights: [
      "エッジ（現場）とクラウドの役割分担でスケーラブルに構成",
      "サーバーレス構成で運用コストと保守負荷を最小化",
      "時系列データを蓄積し、異常検知・傾向分析の基盤に",
      "自動再接続で通信断が起きても収集を継続",
    ],
    // github 未設定 → GitHubボタンは非表示（#23 未提供）。URLを入れると自動表示。
  },
];

/** Lookup helper used by the detail route. */
export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
