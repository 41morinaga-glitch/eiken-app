# 英検 要約練習アプリ

英検1級・2級の英文要約ライティングを練習できるWebアプリです。  
Claude AI による添削機能付き（Anthropic APIキーが必要）。

---

## GitHub Pages への公開手順（5ステップ）

### 1. GitHubリポジトリを作成する
1. [github.com/new](https://github.com/new) を開く
2. Repository name に `eiken-summary-app` と入力
3. **Public** を選択
4. 「Create repository」をクリック

### 2. ファイルをアップロードする
1. 作成したリポジトリのページで **「uploading an existing file」** をクリック
2. このZIPを展開したフォルダの中身を**すべて**ドラッグ＆ドロップ
   - ⚠️ `.github` フォルダも含めてください（隠しフォルダの場合は手動で追加）
3. 「Commit changes」をクリック

### 3. GitHub Pages を有効にする
1. リポジトリの **Settings** タブを開く
2. 左メニューの **Pages** をクリック
3. **Source** を **「GitHub Actions」** に変更して保存

### 4. デプロイを確認する
1. **Actions** タブを開く
2. ワークフローが緑のチェックマークになるまで待つ（2〜3分）
3. Pages の URL（`https://あなたのID.github.io/eiken-summary-app/`）でアクセスできます

### 5. AI添削機能を使う場合
1. [console.anthropic.com](https://console.anthropic.com/) でAPIキーを取得
2. アプリ右上の🔑アイコンからAPIキーを入力
3. キーはお使いのデバイスにのみ保存されます

---

## ローカルで動かす場合

```bash
npm install
npm run dev
```

Node.js 20以上が必要です。

---

## ⚠️ セキュリティについて

APIキーはブラウザの localStorage に保存されます。  
**個人のデバイスのみでご使用ください。**  
他者と共有するPCには保存しないでください。
