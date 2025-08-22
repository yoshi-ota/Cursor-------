# 性格診断アンケートアプリ

3つの質問で性格診断ができるシンプルなWebアプリケーションです。

## 機能

- 3つの質問による性格診断
- 4つの性格タイプの判定
- レスポンシブデザイン
- プログレスバー付き
- 結果の詳細表示

## Google Cloud Storageでの公開手順

### 1. Google Cloud プロジェクトの準備

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. 新しいプロジェクトを作成（または既存のプロジェクトを選択）
3. Cloud Storage APIを有効化

### 2. Cloud Storage バケットの作成

```bash
# gcloud CLIがインストールされていない場合は、まずインストール
# macOS: brew install google-cloud-sdk

# プロジェクトの設定
gcloud config set project YOUR_PROJECT_ID

# バケットの作成（一意の名前が必要）
gsutil mb gs://your-unique-bucket-name

# バケットを公開設定にする
gsutil iam ch allUsers:objectViewer gs://your-unique-bucket-name

# ウェブサイトとして設定
gsutil web set -m index.html gs://your-unique-bucket-name
```

### 3. ファイルのアップロード

```bash
# アンケートアプリのディレクトリに移動
cd "Cursorで作ってみた/アンケートアプリ"

# すべてのファイルをバケットにアップロード
gsutil -m cp -r . gs://your-unique-bucket-name/

# または個別にアップロード
gsutil cp index.html gs://your-unique-bucket-name/
gsutil cp style.css gs://your-unique-bucket-name/
gsutil cp script.js gs://your-unique-bucket-name/
```

### 4. アクセス確認

アップロード後、以下のURLでアクセスできます：
```
https://storage.googleapis.com/your-unique-bucket-name/index.html
```

### 5. カスタムドメインの設定（オプション）

1. Cloud Load Balancerでカスタムドメインを設定
2. または、CloudflareなどのCDNサービスを使用

## ファイル構成

```
アンケートアプリ/
├── index.html      # メインのHTMLファイル
├── style.css       # スタイルシート
├── script.js       # JavaScriptロジック
└── README.md       # このファイル
```

## 技術仕様

- HTML5
- CSS3（レスポンシブデザイン）
- バニラJavaScript（フレームワーク不要）
- モダンブラウザ対応

## カスタマイズ

- `script.js`の`questions`配列を編集して質問を変更
- `personalityTypes`オブジェクトで性格タイプを追加・編集
- `style.css`でデザインをカスタマイズ

## トラブルシューティング

### よくある問題

1. **バケット名が重複している**
   - よりユニークな名前を使用してください

2. **ファイルが表示されない**
   - バケットの公開設定を確認してください
   - ファイルのアップロードが完了しているか確認してください

3. **CSSやJSが読み込まれない**
   - ファイルパスが正しいか確認してください
   - ファイルが正しくアップロードされているか確認してください

## コスト

- Cloud Storage: 約$0.02/GB/月（小規模なWebサイトなら月数セント程度）
- 転送料: 約$0.12/GB（月100GB未満なら無料）

## サポート

問題が発生した場合は、Google Cloud Consoleのログを確認するか、Google Cloud サポートにお問い合わせください。
