import {
  Wrench,
  Code2,
  BrainCircuit,
  Cloud,
  type LucideIcon,
} from "lucide-react";
import type {
  TimelineEntry,
  Strength,
  SkillCategory,
  Certification,
} from "@/types";

/**
 * Profile content.
 *
 * ⚠️ PLACEHOLDER: The structure & UI are final, but the specific values below
 * (years, achievements, skill levels, certifications) are provisional and based
 * only on known facts. Replace with confirmed personal data before publishing.
 */

/** Short lead shown above the Profile heading. */
export const profileIntro =
  "製造現場の保全からキャリアを始め、現場で感じた課題をソフトウェアで解決する道へ。ハードとソフトの両面を理解するエンジニアです。";

/** Career timeline — oldest → newest. */
export const timeline: TimelineEntry[] = [
  {
    period: "2011 – 2022",
    title: "工場設備の保全エンジニア",
    org: "製造業（工場保全）",
    description:
      "製造ラインの設備保全・トラブル対応に11年間従事。稼働停止を最小化する予防保全と、現場オペレーションの改善を通じて、ものづくりの現場を深く理解しました。",
    tags: ["設備保全", "PLC", "現場改善", "トラブルシューティング"],
  },
  {
    period: "2022 – 現在",
    title: "システム開発への転身",
    org: "独学 / 実務",
    description:
      "現場課題をソフトウェアで解決するため、C# / .NET を中心に開発を学習。PLC と連携する業務改善ツールや監視アプリを内製し、現場と開発の橋渡しを実践しています。",
    tags: ["C#", ".NET", "PLC 連携", "業務改善"],
  },
  {
    period: "現在",
    title: "Manufacturing DX Engineer",
    org: "製造DX / フルスタック",
    description:
      "C#・PLC・Azure・AI を活用し、外観検査の自動化や設備データの可視化など、製造業のDXを支援。現場を知るエンジニアとして、実装から運用までを一気通貫で担います。",
    tags: ["製造DX", "AI 外観検査", "Azure IoT", "クラウド連携"],
  },
];

/** Core strengths surfaced as cards. */
export const strengths: Strength[] = [
  {
    icon: Wrench,
    title: "現場を知るエンジニア",
    description:
      "工場保全11年の実体験。現場のリアルな制約と運用を理解した上で、使われ続けるシステムを設計します。",
  },
  {
    icon: Code2,
    title: "設備 × ソフトの両輪",
    description:
      "PLC 制御とアプリケーション開発の双方を扱い、ハードとソフトの間に落ちがちな課題を橋渡しします。",
  },
  {
    icon: BrainCircuit,
    title: "AI・画像処理の実装力",
    description:
      "OpenCV / ONNX Runtime による外観検査など、AI をプロトタイプで終わらせず現場運用まで落とし込みます。",
  },
  {
    icon: Cloud,
    title: "クラウドで拡張",
    description:
      "Azure IoT Hub / Functions / Cosmos DB を用い、設備データの収集・可視化をスケールする形で構築します。",
  },
];

/** Skill groups with provisional proficiency levels. */
export const skillCategories: SkillCategory[] = [
  {
    name: "言語 / フレームワーク",
    skills: [
      { name: "C# / .NET", level: 88 },
      { name: "Python", level: 78 },
      { name: "FastAPI", level: 72 },
      { name: "TypeScript", level: 60 },
    ],
  },
  {
    name: "制御 / 現場",
    skills: [
      { name: "PLC 制御", level: 90 },
      { name: "Modbus TCP", level: 82 },
      { name: "設備保全", level: 92 },
    ],
  },
  {
    name: "クラウド",
    skills: [
      { name: "Azure IoT Hub", level: 74 },
      { name: "Azure Functions", level: 72 },
      { name: "Cosmos DB", level: 68 },
    ],
  },
  {
    name: "AI / 画像処理",
    skills: [
      { name: "OpenCV", level: 80 },
      { name: "ONNX Runtime", level: 76 },
      { name: "機械学習", level: 66 },
    ],
  },
];

/**
 * Certifications. 空配列のあいだ Certifications セクションは非表示になります（#13「なし」）。
 * 資格を追加すると自動的に表示されます。
 */
export const certifications: Certification[] = [];

/** Convenience re-export for icon typing checks. */
export type { LucideIcon };
