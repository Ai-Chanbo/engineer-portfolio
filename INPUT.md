# 公開前 実データ入力シート

`content/*.ts` のプレースホルダーを実データへ差し替えるための一覧です。
**凡例**: ✅=反映済み / 🔴=公開前に必須 / 🟡=任意で後日調整

入力は「**番号: 値**」形式でまとめて渡してください。
（例）`7: https://tamaki-yamato.dev` / `27: https://x.com/tamaki_dev`

---

## ■ content/site.ts

| # | 項目 | 現在値 | 入力値 | 状態 |
|---|------|--------|--------|:---:|
| 1 | 氏名 `name` | 玉置 大和 | | ✅ |
| 2 | 肩書き `role` | Manufacturing DX Engineer | | ✅ |
| 3 | キャッチコピー `headline` | 「現場の課題を、」+「技術で解く。」 | | ✅ |
| 4 | タグライン `tagline` | 製造業 × システム開発 × AI | | ✅ |
| 5 | 説明文 `description` | 工場保全11年の現場経験を土台に、C#・PLC・Azure・AIを活用して、製造業のDXと業務改善を支援するエンジニアです。 | | ✅ |
| 6 | メール `email` | tamayama2201@gmail.com | | 🔴 |
| 7 | サイトURL `url` | https://your-domain.com | | 🔴 |

## ■ content/profile.ts

| # | 項目 | 現在値 | 入力値 | 状態 |
|---|------|--------|--------|:---:|
| 8 | ①保全 期間 | 2013 – 2024 | | 🔴 |
| 9 | ①保全 所属 | 製造業（工場保全） | | 🟡 |
| 10 | ②転身 期間 | 2023 – | | 🔴 |
| 11 | ③現在 肩書き | Manufacturing DX Engineer | | ✅ |
| 12 | 各説明文（3件） | 現状の文章あり | | 🟡 |
| 13 | 資格 | 「（保有資格を記載）」×2 | | 🔴 |
| 14 | スキル 言語/FW | C#/.NET 88・Python 78・FastAPI 72・TS 60 | | 🟡 |
| 15 | スキル 制御/現場 | PLC制御 90・Modbus TCP 82・設備保全 92 | | 🟡 |
| 16 | スキル クラウド | Azure IoT Hub 74・Functions 72・Cosmos DB 68 | | 🟡 |
| 17 | スキル AI/画像 | OpenCV 80・ONNX Runtime 76・機械学習 66 | | 🟡 |
| 18 | スキル項目 増減 | 上記構成 | | 🟡 |

## ■ content/projects.ts

| # | 項目 | 現在値 | 入力値 | 状態 |
|---|------|--------|--------|:---:|
| 19 | ① GitHub URL | https://github.com/yourname/ai-visual-inspection | | 🔴 |
| 20 | ① メイン画像 | コード描画モック(inspection) | | 🟡 |
| 21 | ① 説明文 overview | 現状の文章あり | | 🟡 |
| 22 | ① 解決した課題 problem | 現状の文章あり | | 🟡 |
| 23 | ② GitHub URL | https://github.com/yourname/plc-temperature-monitoring | | 🔴 |
| 24 | ② メイン画像 | コード描画モック(monitoring) | | 🟡 |
| 25 | ② 説明文 overview | 現状の文章あり | | 🟡 |
| 26 | ② 解決した課題 problem | 現状の文章あり | | 🟡 |

## ■ content/articles.ts

### SNSプロフィール（socialProfiles）
| # | 媒体 | 現在の handle / URL | 入力値 | 状態 |
|---|------|--------------------|--------|:---:|
| 27 | X | @yourname / https://x.com/yourname | | 🔴 |
| 28 | LinkedIn | in/yourname / https://www.linkedin.com/in/yourname/ | | 🔴 |
| 29 | note | @yourname / https://note.com/yourname | | 🔴 |
| 30 | GitHub | yourname / https://github.com/yourname | | 🔴 |

### 記事カード（articles・現在ダミー6件）
| # | 媒体 | 現在のタイトル（要点） | 入力値（URL・タイトル・日付・タグ） | 状態 |
|---|------|----------------------|-----------------------------------|:---:|
| 31 | note | C#とPython(FastAPI)で外観検査を分離設計した理由 | | 🔴 |
| 32 | X | ONNX RuntimeのGPUプロバイダ自動フォールバック | | 🔴 |
| 33 | LinkedIn | 温度監視をAzure IoT Hubでクラウド化した話 | | 🔴 |
| 34 | note | 工場保全11年のエンジニアがなぜ開発を始めたか | | 🔴 |
| 35 | X | PLCとModbus TCPをC#で扱うハマりどころ | | 🔴 |
| 36 | LinkedIn | 「使われ続けるシステム」を届けるために | | 🔴 |
| 37 | — | 記事の増減（実在数に合わせる） | | 🟡 |

---

## 今回反映する🔴項目
6, 7, 8, 10, 13, 19, 23, 27, 28, 29, 30, 31–36

🟡項目（9, 12, 14–18, 20–22, 24–26, 37）は後日調整。
