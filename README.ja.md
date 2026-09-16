# SculptBox — ZBrush ブラシ管理 & 3D アセット管理ツール

**SculptBox は macOS / Windows 向けの ZBrush ブラシ管理ツールです。ZBrush を起動しなくても、ブラシライブラリ（.ZBP / .ZBR / .MNU）の整理・検索・タグ付け・プレビューができます。**

**3D アセット管理ツール — ブラシライブラリを瞬時に。**

---

[English](README.md) · [中文](README.zh.md) · 日本語 · [한국어](README.ko.md)

---

## 📥 ダウンロード

| バージョン | ダウンロード | 備考 |
|:----------|:------------|:-----|
| macOS **V1.4** | [⬇️ GitHub Releases](https://github.com/skillshen-boop/zbrush-sculptbox/releases/latest) | 136 MB · ZBrush 2026+ |
| macOS **V1.4** | [☁️ Baidu Pan](https://pan.baidu.com/s/1BeFZfMoCmqbfOQDEYJQdSg?pwd=tayr) | コード: `tayr` |

> **無料・アカウント不要・体験版の期限なし。** ブラシフォルダは読み取り専用として扱われ、`.ZBP` ファイルが移動・改名・編集されることはありません。

---

## ⚠️ 初回インストール

macOS が **"SculptBox is damaged"** と表示する場合：

```bash
sudo xattr -rd com.apple.quarantine /Applications/SculptBox.app
```

または **システム設定 → プライバシーとセキュリティ** で許可。

---

## 🚀 クイックスタート

1. DMG をダウンロード、Applications にドラッグ
2. ブロックされたら上記のコマンドを実行
3. SculptBox を起動
4. Settings → Install で **Sculpt Bridge** をインストール
5. ZBrush を再起動

---

## ✨ 機能

### 彫刻モード — 邪魔をしないウィンドウ

<img src="promo/assets/screenshot_floatmini.png" width="760" alt="ZBrush の隣に開いた SculptBox 彫刻モード"/>

ZBrush の**隣**に置けるコンパクトなフローティングウィンドウ。3 段階の高さ、ドラッグで幅変更、位置も記憶します。

<img src="promo/assets/screenshot_mini_l3.png" width="160" alt="3 行レイアウト"/> <img src="promo/assets/screenshot_adjust_sizechange.png" width="230" alt="ドラッグで幅変更"/>

### ブラシ管理

<img src="promo/assets/screenshot_main.png" width="700" alt="メインウィンドウ"/>

- **ブラシ管理** — 検索、タグ、お気に入り、分類（ブラシ・アルファ・マテリアル・テクスチャ）
- **サムネイルプレビュー** — ネイティブ .ZBP 解析、S/M/L の 3 サイズ
- **Send to ZBrush** — 右クリックで送信（Sculpt Bridge 経由）
- **バッチ操作** — 一括送信、一括エクスポート、一括タグ付け
- **4 言語** — English · 中文 · 日本語 · 한국어
- **ワンクリックインストール** — 1 分で完了

---

## こんな用途・職種に

ZBrush を使う現場で広く使えます：

| 分野 | 主なユーザー |
|:--|:--|
| **ジュエリー・宝飾デザイン** | ジュエリーデザイナー、ジュエリー CAD デザイナー、指輪やペンダントを ZBrush で彫る方 |
| **映画・VFX** | キャラクターアーティスト、クリーチャーデザイナー、モデラー |
| **ゲームアート** | キャラクターアーティスト、ハードサーフェスアーティスト、背景・小物モデラー |
| **フィギュア・トイ・ミニチュア** | トイデザイナー、フィギュア原型師、ミニチュア製作者、3D プリント作家 |
| **コンセプトアート** | コンセプトアーティスト、クリーチャーデザイナー |
| **3D プリント** | 出力用モデルを制作する方 |

デジタル彫刻家、3D アーティスト、学生、フリーランス、スタジオ（ZBrush 2026 以降）。

## よくある質問

**ZBrush のブラシはどこに保存されますか？**
ZBrush のユーザーコンテンツフォルダ（ZStartup / ZBrushData）です。正確なパスはバージョンにより異なります。

**ブラシが多すぎて整理できません。**
SculptBox にフォルダを指定してください。.ZBP / .ZBR / .MNU をすべてインデックス化し、実際のサムネイル・即時検索・タグ・お気に入りを提供します。

**LightBox で探す代わりに名前で探せますか？**
SculptBox で検索し、そのまま ZBrush へ送れます。

**IMM ブラシ、アルファ、マットキャップに対応していますか？**
はい。IMM / インサートメッシュブラシ、アルファ、マットキャップ、通常ブラシをインデックス化します。

**ZBrush のアップデート後にブラシが消えました。**
新しい ZBrush ではユーザーアセットのディレクトリ構成が変更されました。SculptBox は指定したフォルダをスキャンするため、ZBrush 標準のブラウザに表示されないブラシも一覧できます。

**ZBrush がなくても使えますか？**
使えます。サムネイルは .ZBP から直接解析するため、ZBrush の起動・インストールは不要です。

## 🔗 リンク

- Webサイト: [sculptbox.net](https://sculptbox.net)
- ダウンロード: [GitHub Releases](https://github.com/skillshen-boop/zbrush-sculptbox/releases)

---

*SculptBox — 3D アセット管理ツール*
