#!/bin/bash

# Google Cloud Storage デプロイスクリプト
# 使用方法: ./deploy.sh [バケット名]

set -e

# 色付きの出力
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ログ関数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# バケット名の確認
if [ $# -eq 0 ]; then
    log_error "バケット名を指定してください"
    echo "使用方法: $0 [バケット名]"
    echo "例: $0 my-personality-quiz-app"
    exit 1
fi

BUCKET_NAME=$1
PROJECT_ID=$(gcloud config get-value project 2>/dev/null || echo "")

log_info "デプロイを開始します..."
log_info "バケット名: $BUCKET_NAME"
log_info "プロジェクトID: $PROJECT_ID"

# プロジェクトが設定されているか確認
if [ -z "$PROJECT_ID" ]; then
    log_error "Google Cloud プロジェクトが設定されていません"
    echo "以下のコマンドでプロジェクトを設定してください:"
    echo "gcloud config set project YOUR_PROJECT_ID"
    exit 1
fi

# gcloud CLIが利用可能か確認
if ! command -v gcloud &> /dev/null; then
    log_error "gcloud CLIがインストールされていません"
    echo "以下のコマンドでインストールしてください:"
    echo "macOS: brew install google-cloud-sdk"
    echo "その他: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# gsutilが利用可能か確認
if ! command -v gsutil &> /dev/null; then
    log_error "gsutilが利用できません"
    exit 1
fi

# 認証確認
log_info "認証状態を確認中..."
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    log_warning "Google Cloudにログインしていません"
    log_info "ログインを開始します..."
    gcloud auth login
fi

# バケットの存在確認
log_info "バケットの存在を確認中..."
if gsutil ls -b "gs://$BUCKET_NAME" &>/dev/null; then
    log_info "バケット '$BUCKET_NAME' は既に存在します"
else
    log_info "バケット '$BUCKET_NAME' を作成中..."
    gsutil mb "gs://$BUCKET_NAME"
    log_success "バケットが作成されました"
fi

# バケットを公開設定にする
log_info "バケットを公開設定に変更中..."
gsutil iam ch allUsers:objectViewer "gs://$BUCKET_NAME"
log_success "バケットが公開設定になりました"

# ウェブサイトとして設定
log_info "ウェブサイトとして設定中..."
gsutil web set -m index.html "gs://$BUCKET_NAME"
log_success "ウェブサイトとして設定されました"

# ファイルのアップロード
log_info "ファイルをアップロード中..."
gsutil -m cp -r . "gs://$BUCKET_NAME/"
log_success "ファイルのアップロードが完了しました"

# アップロードされたファイルの確認
log_info "アップロードされたファイルを確認中..."
gsutil ls "gs://$BUCKET_NAME/"

# 完了メッセージ
log_success "デプロイが完了しました！"
echo ""
echo "🌐 あなたのアプリは以下のURLでアクセスできます:"
echo "   https://storage.googleapis.com/$BUCKET_NAME/index.html"
echo ""
echo "📱 モバイルでも動作します"
echo "🔒 セキュリティ設定済み（公開読み取り専用）"
echo ""
echo "💡 カスタムドメインを設定したい場合は、Cloud Load Balancerを使用してください"
echo ""
echo "📊 使用量とコストは Google Cloud Console で確認できます:"
echo "   https://console.cloud.google.com/storage/browser/$BUCKET_NAME"
