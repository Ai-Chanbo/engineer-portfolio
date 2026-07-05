# Engineer Portfolio Platform

**玉置 大和 — Manufacturing DX Engineer** の技術ブランドサイト。

製造業の現場経験を土台に、C# / PLC / Azure / AI で製造DXを支援するエンジニアのポートフォリオです。「何ができるか・どんな技術を持つか・どんな実績があるか」を3分以内に伝えることを目的に、黒基調・近未来・高級感のあるUIで構築しています。

> 🎨 デザインコンセプト：Apple / Linear / OpenAI / Vercel を参照した、余白と動きのある“技術ブランドサイト”。

---

## ✨ 主な特徴

- **1ページ構成**：Hero → Profile → Work → Articles → Contact をスムーズにスクロール
- **リッチな作品ショウケース**：メイン画像・システム構成図・使用技術・機能・工夫を、データ駆動で表示（`/work/[slug]` の詳細ページを自動生成）
- **上品なアニメーション**：スクロールリビール、3Dチルト、マグネティックボタン、パーティクル背景（`prefers-reduced-motion` 対応）
- **お問い合わせフォーム**：Resend 連携（APIキー未設定時はモック動作）、Zod バリデーション、honeypot スパム対策、送信完了画面
- **フルレスポンシブ**：PC / タブレット / スマホに最適化
- **SEO / パフォーマンス重視**：メタデータ、動的OGP画像、sitemap、robots、JSON-LD、静的生成中心の高速表示
- **アクセシビリティ**：セマンティックHTML、aria 属性、キーボード操作、動き軽減対応

---

## 🛠 使用技術

| 分類 | 技術 |
|------|------|
| フレームワーク | [Next.js 16](https://nextjs.org/)（App Router / Turbopack） |
| 言語 | [TypeScript](https://www.typescriptlang.org/)（strict） |
| UI | [React 19](https://react.dev/) |
| スタイリング | [Tailwind CSS v4](https://tailwindcss.com/)（CSSベース設定） |
| アニメーション | [Motion](https://motion.dev/)（旧 Framer Motion） |
| アイコン | [Lucide](https://lucide.dev/) ＋ 自作ブランドアイコン |
| フォーム | [React Hook Form](https://react-hook-form.com/) ＋ [Zod](https://zod.dev/) |
| メール送信 | [Resend](https://resend.com/) |
| フォント | Geist / Geist Mono / Noto Sans JP（`next/font` で自己ホスト） |
| ホスティング | [Vercel](https://vercel.com/) |

---

## 🚀 セットアップ

### 前提

- Node.js 20 以上
- npm

### 手順

```bash
# 1. 依存関係のインストール
npm install

# 2. 環境変数ファイルを作成（任意）
cp .env.example .env.local

# 3. 開発サーバーを起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

> お問い合わせフォームは `RESEND_API_KEY` が未設定でも **モードモック** で動作します（送信内容はサーバーのコンソールに出力され、送信完了画面が表示されます）。実際にメールを送るには下記の環境変数を設定してください。

### 環境変数

`.env.example` を参照してください。

| 変数 | 必須 | 説明 |
|------|:---:|------|
| `RESEND_API_KEY` | 任意 | Resend の APIキー。未設定時はフォームがモック動作します。 |
| `CONTACT_TO_EMAIL` | 任意 | 問い合わせの送信先。未設定時は `content/site.ts` の `email` を使用。 |
| `CONTACT_FROM_EMAIL` | 任意 | 送信元アドレス（Resend で検証済みドメイン）。テストは `onboarding@resend.dev`。 |

---

## 📜 利用可能なスクリプト

```bash
npm run dev     # 開発サーバー（Turbopack）
npm run build   # 本番ビルド
npm run start   # 本番サーバー
npm run lint    # ESLint
```

---

## 📝 コンテンツの編集

コンテンツはすべて `content/` 配下に集約しており、**コンポーネントを触らずにデータ追加・編集**ができます。

| ファイル | 内容 |
|---------|------|
| `content/site.ts` | 氏名・キャッチコピー・URL・連絡先などのサイト共通情報 |
| `content/profile.ts` | 経歴・強み・スキル・資格 |
| `content/projects.ts` | 作品（追加すると Work セクションと詳細ページが自動生成） |
| `content/articles.ts` | 技術記事・SNSプロフィール |

例）作品を追加する場合は `content/projects.ts` の配列にオブジェクトを1件追加するだけです。

---

## 📁 ディレクトリ構成

```
engineer-portfolio/
├── app/
│   ├── layout.tsx            # ルートレイアウト・フォント・SEOメタ
│   ├── page.tsx              # トップページ（各セクションを合成）
│   ├── globals.css           # デザイントークン・ベース・ユーティリティ
│   ├── opengraph-image.tsx   # 動的OGP画像
│   ├── twitter-image.tsx     # Twitterカード画像
│   ├── apple-icon.tsx        # Appleタッチアイコン
│   ├── icon.svg              # favicon
│   ├── manifest.ts           # Webマニフェスト
│   ├── robots.ts             # robots.txt
│   ├── sitemap.ts            # sitemap.xml
│   ├── loading.tsx           # ローディングUI
│   ├── error.tsx             # エラーバウンダリ
│   ├── not-found.tsx         # 404ページ
│   ├── api/contact/route.ts  # お問い合わせ送信ハンドラ
│   └── work/[slug]/page.tsx  # 作品詳細ページ（SSG）
│
├── components/
│   ├── sections/             # Hero / Profile / Portfolio / Articles / Contact
│   ├── layout/               # Header / Footer
│   ├── background/           # AuroraBackground / ParticleField
│   ├── motion/               # FadeIn / Magnetic / SectionHeading
│   ├── portfolio/            # ProjectShowcase / TiltCard / ProjectVisual / ArchitectureDiagram
│   ├── articles/             # ArticleCard / platformMeta
│   ├── timeline/             # TimelineItem
│   ├── profile/              # SkillBar
│   ├── icons/                # brand.tsx（GitHub / X / LinkedIn / note）
│   ├── ui/                   # button / badge
│   └── JsonLd.tsx            # 構造化データ（Person / WebSite）
│
├── content/                  # サイト内容（型付きデータ）
├── hooks/                    # usePrefersReducedMotion
├── lib/                      # utils / validation / ogImage
├── types/                    # 共有型定義
├── public/                   # 静的アセット
├── .github/workflows/ci.yml  # Lint / Build CI
├── .env.example
├── next.config.ts
├── vercel.json
└── tailwind は globals.css で設定（v4）
```

---

## ☁️ デプロイ（Vercel）

本プロジェクトは Vercel にゼロコンフィグでデプロイできます。

1. GitHub にリポジトリを Push
2. [Vercel](https://vercel.com/new) で当該リポジトリを Import
3. **環境変数**（任意）を設定：`RESEND_API_KEY` / `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL`
4. Deploy

`content/site.ts` の `url` を本番ドメインに更新すると、OGP・sitemap・robots・JSON-LD に反映されます。

### CI

`.github/workflows/ci.yml` により、`main` への push / PR で **Lint と Build** が自動実行されます。

---

## 📄 ライセンス

個人のポートフォリオサイトです。コード構成は自由に参考にしていただけますが、氏名・経歴・実績・掲載文章などのコンテンツの転用はご遠慮ください。
