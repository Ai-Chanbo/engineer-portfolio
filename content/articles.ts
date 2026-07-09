import type { Article, SocialProfile } from "@/types";

/**
 * Technical articles / posts.
 *
 * Add a new entry to `articles` and it appears automatically — no component
 * changes needed. Newest first is recommended (the section does not re-sort).
 */
export const articles: Article[] = [
  {
    platform: "note",
    category: "マインド",
    title: "可能性を0%から1%にする — 行動する人だけが可能性を手に入れる",
    excerpt:
      "成功する人は才能ではなく「0%を1%に変える人」。行動が可能性を生む理由を綴りました。",
    date: "2026-07-09",
    tags: ["挑戦", "行動", "成長"],
    url: "https://note.com/chanbo2201/n/nd577a855b2b5",
  },
  {
    platform: "note",
    category: "キャリア",
    title: "AI時代に必要な人材とは？AIと成果を生み出す人になるために",
    excerpt:
      "AIに仕事を奪われる人ではなく、AIと成果を生み出す人になるための視点をまとめました。",
    date: "2026-07-08",
    tags: ["AI", "キャリア", "スキル"],
    url: "https://note.com/chanbo2201/n/n31d01fd46c7d",
  },
  {
    platform: "note",
    category: "マインド",
    title: "継続できる人が最後に勝つ理由 — 才能よりも「続ける力」",
    excerpt:
      "才能よりも「続ける力」が人生を変える。継続がもたらす複利について書きました。",
    date: "2026-07-07",
    tags: ["継続", "習慣", "成長"],
    url: "https://note.com/chanbo2201/n/n85e2bd80fa30",
  },
  {
    platform: "note",
    category: "生成AI",
    title: "Claude Scienceとは何か？科学研究を変える「AI研究室」の誕生",
    excerpt:
      "科学研究を変える「AI研究室」Claude Science とは何かを解説します。",
    date: "2026-07-06",
    tags: ["Claude", "AI研究", "科学"],
    url: "https://note.com/chanbo2201/n/nbf72c6a66b2f",
  },
  {
    platform: "note",
    category: "AIトレンド",
    title: "フィジカルAIとは何か？2026年、製造業を変える「動くAI」の正体",
    excerpt:
      "2026年、製造業を大きく変える「動くAI」＝フィジカルAIの正体を徹底解説します。",
    date: "2026-07-05",
    tags: ["フィジカルAI", "製造業", "AI"],
    url: "https://note.com/chanbo2201/n/nc0b793d5430f",
  },
  {
    platform: "note",
    category: "イベントレポート",
    title: "東京ビッグサイトで確信した「フィジカルAI」が次の主役になる理由",
    excerpt:
      "展示会で確信した、AIが“考える”から“動く”時代へ向かう理由をレポートします。",
    date: "2026-07-04",
    tags: ["フィジカルAI", "展示会", "AI"],
    url: "https://note.com/chanbo2201/n/n658a7e359c5c",
  },
  {
    platform: "note",
    category: "キャリア",
    title: "SESは本当に悪なのか？現役エンジニアが語る後悔しない働き方",
    excerpt:
      "現役SESエンジニアが語るメリット・デメリットと、後悔しない働き方について。",
    date: "2026-07-03",
    tags: ["SES", "エンジニア", "働き方"],
    url: "https://note.com/chanbo2201/n/nbec795ca0b1c",
  },
  {
    platform: "note",
    category: "生成AI",
    title: "Claude Sonnet 5とは何か？AIが「答える」から「仕事を進める」時代へ",
    excerpt:
      "AIが「答える時代」から「仕事を進める時代」へ。Sonnet 5 の実力を解説します。",
    date: "2026-07-02",
    tags: ["Claude", "LLM", "AI活用"],
    url: "https://note.com/chanbo2201/n/nd657c46d62d0",
  },
];

/**
 * Profiles shown in the "follow" row / Contact / Footer.
 *
 * `url` を設定したサービスだけが表示されます（未設定＝自動的に非表示）。
 * `handle` と `label` は content 側で管理し、URLからは自動生成しません。
 * X / LinkedIn / note は実URLが決まり次第、下のコメントを有効化してください。
 */
export const socialProfiles: SocialProfile[] = [
  {
    platform: "x",
    label: "X",
    handle: "@linku0717",
    url: "https://x.com/linku0717",
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    handle: "in/大和-玉置",
    url: "https://www.linkedin.com/in/%E5%A4%A7%E5%92%8C-%E7%8E%89%E7%BD%AE-38444a335/",
  },
  {
    platform: "note",
    label: "note",
    handle: "@chanbo2201",
    url: "https://note.com/chanbo2201",
  },
  {
    platform: "github",
    label: "GitHub",
    handle: "@Ai-Chanbo",
    url: "https://github.com/Ai-Chanbo",
  },
];

/** Only profiles with a real URL are rendered anywhere on the site. */
export const visibleSocialProfiles = socialProfiles.filter(
  (p): p is SocialProfile & { url: string } => Boolean(p.url),
);
