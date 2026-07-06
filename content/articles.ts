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
 * 現在は実アカウント未提供のため空です（#27–30）。空のあいだ関連UIは非表示。
 * 追加例: { platform: "x", handle: "@handle", url: "https://x.com/handle" }
 */
export const socialProfiles: SocialProfile[] = [];
