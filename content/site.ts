/**
 * Central site identity & metadata.
 * Placeholder values — replace name / handles / URL before publishing.
 */
type SiteConfig = {
  name: string;
  /** Short latin wordmark shown in the header. */
  wordmark: string;
  role: string;
  /** One-line role summary shown as the hero eyebrow. */
  tagline: string;
  /** Hero headline (impact copy). */
  headline: { lead: string; highlight: string };
  /** Hero supporting sentence. */
  description: string;
  url: string;
  /** Optional — omitted when not yet provided; hidden everywhere it would show. */
  email?: string;
  location: string;
  /** Availability flag shown in the hero badge. */
  available: boolean;
};

export const site: SiteConfig = {
  name: "玉置 大和",
  wordmark: "YAMATO TAMAKI",
  role: "Manufacturing DX Engineer",
  tagline: "製造業 × システム開発 × AI",
  headline: {
    lead: "現場の課題を、",
    highlight: "技術で解く。",
  },
  description:
    "工場保全11年の現場経験を土台に、C#・PLC・Azure・AIを活用して、製造業のDXと業務改善を支援するエンジニアです。",
  // TODO(#7): Vercel公開後に本番URLへ差し替え（OGP/sitemap/canonical に使用・構造上必須）
  url: "https://engineer-portfolio-virid.vercel.app",
  // email は未設定のため省略。設定すると Contact / JSON-LD に自動表示されます。
  location: "Japan",
  available: true,
};

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
