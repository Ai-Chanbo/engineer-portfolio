import type { Article, SocialProfile } from "@/types";

/**
 * Technical articles / posts.
 *
 * Add a new entry to `articles` and it appears automatically — no component
 * changes needed. Newest first is recommended (the section does not re-sort).
 *
 * ⚠️ PLACEHOLDER: titles/dates/tags are provisional and URLs are placeholders
 * (TODO). Replace `url`, `handle` and the entries with real posts before publishing.
 */
export const articles: Article[] = [
  {
    platform: "note",
    category: "技術解説",
    title: "C#とPython(FastAPI)で外観検査システムを分離設計した理由",
    excerpt:
      "HMIと推論APIを分離することで得られる保守性・スケーラビリティのメリットを、実装例とともに解説します。",
    date: "2024-11-18",
    tags: ["C#", "FastAPI", "アーキテクチャ"],
    url: "https://note.com/yourname/n/xxxxxxxx", // TODO: 実URL
  },
  {
    platform: "x",
    category: "技術Tips",
    title: "ONNX RuntimeのGPU実行プロバイダをCUDA→DirectML→CPUで自動フォールバック",
    excerpt:
      "環境を問わず動かすためのプロバイダ選択の実装メモ。現場PCでも安定して推論できます。",
    date: "2024-10-30",
    tags: ["ONNX", "推論", "GPU"],
    url: "https://x.com/yourname/status/xxxxxxxx", // TODO: 実URL
  },
  {
    platform: "linkedin",
    category: "実績 / 事例",
    title: "製造現場の温度監視をAzure IoT Hubでクラウド化した話",
    excerpt:
      "PLCの温度データをエッジで収集し、サーバーレスで可視化する構成の設計ポイントを紹介。",
    date: "2024-10-12",
    tags: ["Azure", "IoT", "製造DX"],
    url: "https://www.linkedin.com/in/yourname/", // TODO: 実URL
  },
  {
    platform: "note",
    category: "現場×開発",
    title: "工場保全11年のエンジニアが、なぜソフトウェア開発を始めたのか",
    excerpt:
      "現場で感じた課題と、それをコードで解決していく過程で得た学びを綴りました。",
    date: "2024-09-24",
    tags: ["キャリア", "製造業", "DX"],
    url: "https://note.com/yourname/n/yyyyyyyy", // TODO: 実URL
  },
  {
    platform: "x",
    category: "学習ログ",
    title: "PLCとModbus TCPをC#(HslCommunication)で扱うときのハマりどころ",
    excerpt:
      "設備通信の実装で詰まりやすいポイントと、安定運用のための再接続設計について。",
    date: "2024-09-05",
    tags: ["PLC", "Modbus", "C#"],
    url: "https://x.com/yourname/status/yyyyyyyy", // TODO: 実URL
  },
  {
    platform: "linkedin",
    category: "考察",
    title: "「使われ続けるシステム」を現場に届けるために意識していること",
    excerpt:
      "作って終わりにしないための、運用・保守・現場コミュニケーションの視点をまとめました。",
    date: "2024-08-20",
    tags: ["運用", "現場改善", "設計"],
    url: "https://www.linkedin.com/in/yourname/", // TODO: 実URL
  },
];

/** Profiles shown in the "follow" row. */
export const socialProfiles: SocialProfile[] = [
  { platform: "x", handle: "@yourname", url: "https://x.com/yourname" }, // TODO
  {
    platform: "linkedin",
    handle: "in/yourname",
    url: "https://www.linkedin.com/in/yourname/",
  }, // TODO
  { platform: "note", handle: "@yourname", url: "https://note.com/yourname" }, // TODO
  {
    platform: "github",
    handle: "yourname",
    url: "https://github.com/yourname",
  }, // TODO
];
