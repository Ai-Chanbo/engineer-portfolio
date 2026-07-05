/**
 * Central site identity & metadata.
 * Placeholder values — replace name / handles / URL before publishing.
 */
export const site = {
  name: "玉置 大和",
  /** Short latin wordmark shown in the header. */
  wordmark: "YAMATO TAMAKI",
  role: "Manufacturing DX Engineer",
  /** One-line role summary shown as the hero eyebrow. */
  tagline: "製造業 × システム開発 × AI",
  /** Hero headline (impact copy). */
  headline: {
    lead: "現場の課題を、",
    highlight: "技術で解く。",
  },
  /** Hero supporting sentence. */
  description:
    "工場保全11年の現場経験を土台に、C#・PLC・Azure・AIを活用して、製造業のDXと業務改善を支援するエンジニアです。",
  // TODO: 本番ドメイン確定後に差し替え
  url: "https://your-domain.com",
  // TODO: 公開前に最終確認（プレースホルダー）
  email: "tamayama2201@gmail.com",
  location: "Japan",
  /** Availability flag shown in the hero badge. */
  available: true,
} as const;

/** Primary navigation (in-page anchors). */
export const nav = [
  { label: "Profile", href: "#profile" },
  { label: "Work", href: "#portfolio" },
  { label: "Articles", href: "#articles" },
  { label: "Contact", href: "#contact" },
] as const;

/** Tech keywords surfaced in the hero marquee / chips. */
export const heroStack = [
  "C#",
  ".NET",
  "PLC",
  "Azure",
  "Azure IoT Hub",
  "Azure Functions",
  "Cosmos DB",
  "Python",
  "OpenCV",
  "ONNX Runtime",
  "FastAPI",
] as const;
