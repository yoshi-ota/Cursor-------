# 🚀 クイックスタート - Google Cloud Storageで公開

このガイドでは、性格診断アンケートアプリをGoogle Cloud Storageで公開する手順を説明します。

## 📋 前提条件

- Googleアカウント
- Google Cloud プロジェクト（無料枠でOK）
- macOS（Homebrewがインストール済み）

## ⚡ 5分でデプロイ

### 1. Google Cloud SDKのインストール

```bash
# Homebrewでインストール
brew install google-cloud-sdk

# 初期化
gcloud init
```

### 2. プロジェクトの設定

```bash
# プロジェクトIDを設定（Google Cloud Consoleで確認）
gcloud config set project YOUR_PROJECT_ID
```

### 3. デプロイの実行

```bash
# アンケートアプリのディレクトリに移動
cd "アンケートアプリ"

# デプロイスクリプトを実行
./deploy.sh your-unique-bucket-name
```

### 4. アクセス確認

デプロイ完了後、以下のURLでアクセスできます：
```
https://storage.googleapis.com/your-unique-bucket-name/index.html
```

## 🔧 手動デプロイ（スクリプトを使わない場合）

### 1. バケットの作成

```bash
gsutil mb gs://your-unique-bucket-name
```

### 2. 公開設定

```bash
gsutil iam ch allUsers:objectViewer gs://your-unique-bucket-name
gsutil web set -m index.html gs://your-unique-bucket-name
```

### 3. ファイルのアップロード

```bash
gsutil -m cp -r . gs://your-unique-bucket-name/
```

## 💰 コスト

- **Cloud Storage**: 約$0.02/GB/月
- **転送料**: 月100GB未満なら無料
- **小規模サイト**: 月数セント程度

## 🌐 カスタムドメイン

カスタムドメインを使用したい場合：

1. **Cloudflare（推奨）**: 無料でCDNとSSL証明書を提供
2. **Cloud Load Balancer**: Google Cloudのネイティブソリューション（有料）

## 🐛 トラブルシューティング

### よくある問題

1. **バケット名が重複**
   - よりユニークな名前を使用（例：`my-quiz-app-2024-12-19`）

2. **認証エラー**
   - `gcloud auth login` で再ログイン

3. **プロジェクトが設定されていない**
   - `gcloud config set project YOUR_PROJECT_ID`

4. **ファイルが表示されない**
   - バケットの公開設定を確認
   - ファイルのアップロード状況を確認

## 📱 モバイル対応

- レスポンシブデザイン済み
- PWA対応可能（manifest.jsonを追加）
- オフライン対応可能（Service Workerを追加）

## 🔒 セキュリティ

- バケットは読み取り専用で公開
- 書き込み権限は付与されていない
- HTTPSでアクセス可能

## 📊 監視と分析

- Google Cloud Consoleでアクセスログを確認
- Google Analyticsを追加可能
- パフォーマンス監視可能

## 🎯 次のステップ

1. **カスタムドメインの設定**
2. **Google Analyticsの追加**
3. **CDNの設定**
4. **バックアップの設定**
5. **自動デプロイの設定**

## 📞 サポート

- [Google Cloud ドキュメント](https://cloud.google.com/storage/docs)
- [Google Cloud サポート](https://cloud.google.com/support)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/google-cloud-storage)

---

**🎉 おめでとうございます！** あなたの性格診断アンケートアプリがGoogle Cloudで公開されました！
