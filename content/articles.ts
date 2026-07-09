import type { Article, SocialProfile } from "@/types";

/**
 * Technical articles / posts.
 *
 * Add a new entry to `articles` and it appears automatically — no component
 * changes needed. Newest first is recommended (the section does not re-sort).
 *
 * 現在は実在する記事URLが未提供のため空です（#31–36）。空のあいだ Articles
 * セクションは「準備中」表示になります。実記事を追加すると自動的にカード表示されます。
 *
 * 追加例:
 * {
 *   platform: "note",            // "x" | "linkedin" | "note" | "github"
 *   category: "技術解説",
 *   title: "記事タイトル",
 *   excerpt: "概要（任意）",
 *   date: "2025-01-01",          // YYYY-MM-DD
 *   tags: ["C#", "Azure"],
 *   url: "https://note.com/.../n/xxxx",
 * }
 */
export const articles: Article[] = [];

/**
 * Profiles shown in the "follow" row / Contact / Footer.
 *
 * `url` を設定したサービスだけが表示されます（未設定＝自動的に非表示）。
 * `handle` と `label` は content 側で管理し、URLからは自動生成しません。
 * X / LinkedIn / note は実URLが決まり次第、下のコメントを有効化してください。
 */
export const socialProfiles: SocialProfile[] = [
  {
    platform: "github",
    label: "GitHub",
    handle: "@Ai-Chanbo",
    url: "https://github.com/Ai-Chanbo",
  },
  // { platform: "x", label: "X", handle: "@your_handle", url: "https://x.com/your_handle" },
  // { platform: "linkedin", label: "LinkedIn", handle: "in/your-id", url: "https://www.linkedin.com/in/your-id/" },
  // { platform: "note", label: "note", handle: "@your_account", url: "https://note.com/your_account" },
];

/** Only profiles with a real URL are rendered anywhere on the site. */
export const visibleSocialProfiles = socialProfiles.filter(
  (p): p is SocialProfile & { url: string } => Boolean(p.url),
);
