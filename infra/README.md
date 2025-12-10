# AC Leaderboard Infrastructure

このディレクトリには、AC LeaderboardアプリケーションのためのTerraformインフラストラクチャコードが含まれています。

## 概要

このインフラは、Kaggleのようなリーダーボードシステムをホスティングするために必要なAWSリソースを提供します。以下のサービスを使用しています:

- **AWS Amplify**: Next.jsアプリケーションのホスティング
- **Amazon Cognito**: ユーザー認証と権限管理
- **Amazon DynamoDB**: スコアデータの保存
- **Amazon S3**: CSVファイルのアップロードと結果の保存

## ディレクトリ構造

```
infra/
├── modules/              # 再利用可能なTerraformモジュール
│   ├── cognito/         # ユーザー認証モジュール
│   ├── dynamodb/        # データベースモジュール
│   ├── s3/              # ストレージモジュール
│   └── amplify/         # フロントエンドホスティングモジュール
└── environments/         # 環境固有の設定
    ├── dev/             # 開発環境
    └── prod/            # 本番環境
```

## 前提条件

- [Terraform](https://www.terraform.io/downloads.html) >= 1.5.0
- [AWS CLI](https://aws.amazon.com/cli/) >= 2.0
- AWSアカウントと適切な権限
- GitHubアカウント（Amplifyとの連携用）

## セットアップ手順

### 1. AWS認証情報の設定

```bash
aws configure
```

または、環境変数を設定:

```bash
export AWS_ACCESS_KEY_ID="your-access-key"
export AWS_SECRET_ACCESS_KEY="your-secret-key"
export AWS_DEFAULT_REGION="ap-northeast-1"
```

### 2. terraform.tfvarsファイルの作成

各環境ディレクトリで、`terraform.tfvars.example`をコピーして`terraform.tfvars`を作成:

```bash
# 開発環境
cd environments/dev
cp terraform.tfvars.example terraform.tfvars
# terraform.tfvarsを編集して、適切な値を設定

# 本番環境
cd ../prod
cp terraform.tfvars.example terraform.tfvars
# terraform.tfvarsを編集して、適切な値を設定
```

### 3. Terraformの初期化

```bash
cd environments/dev  # または environments/prod
terraform init
```

## デプロイ手順

### 開発環境へのデプロイ

```bash
cd environments/dev
terraform plan
terraform apply
```

### 本番環境へのデプロイ

```bash
cd environments/prod
terraform plan
terraform apply
```

## モジュール説明

### Cognitoモジュール

ユーザー認証とアクセス管理を提供します。

**作成されるリソース:**

- User Pool: ユーザー管理
- User Pool Client: アプリケーション用クライアント
- Identity Pool: AWS認証情報の提供
- User Groups: adminとuserグループ

**主要な設定:**

- MFA設定（dev: OPTIONAL, prod: ON推奨）
- パスワードポリシー
- トークン有効期限

### DynamoDBモジュール

スコアとコンペティションデータを保存します。

**作成されるテーブル:**

- `scores`: ユーザーのスコア情報
- `competitions`: コンペティション情報
- `submissions`: 提出履歴

**主要な設定:**

- 課金モード（PAY_PER_REQUEST推奨）
- DynamoDB Stream（リアルタイム更新用）
- Point-in-time Recovery（本番環境推奨）

### S3モジュール

CSVファイルのアップロードと処理結果の保存を提供します。

**作成されるバケット:**

- `uploads`: CSVファイルアップロード用
- `results`: 処理結果保存用

**主要な設定:**

- バージョニング
- サーバーサイド暗号化
- ライフサイクルポリシー
- CORS設定

### Amplifyモジュール

Next.jsアプリケーションのホスティングとCI/CDを提供します。

**主要な設定:**

- GitHubリポジトリ連携
- 自動ビルド・デプロイ
- 環境変数管理
- カスタムドメイン（オプション）

## 環境変数

各モジュールで使用される主要な環境変数については、`terraform.tfvars.example`を参照してください。

### 必須変数

- `aws_region`: AWSリージョン
- `project_name`: プロジェクト名
- `environment`: 環境名（dev/prod）
- `amplify_repository_url`: GitHubリポジトリURL

## 出力値

デプロイ後、以下の情報が出力されます:

```bash
terraform output
```

主要な出力値:

- Cognito User Pool ID
- Cognito Client ID
- DynamoDBテーブル名
- S3バケット名
- Amplify App URL

これらの値はフロントエンドアプリケーションの設定に使用します。

## トラブルシューティング

### エラー: "bucket already exists"

S3バケット名はグローバルに一意である必要があります。`project_name`変数を変更するか、既存のバケットを削除してください。

### エラー: "Access Denied"

AWS認証情報と権限を確認してください。必要な権限:

- IAM
- Cognito
- DynamoDB
- S3
- Amplify

### Amplifyビルドが失敗する

- GitHubリポジトリのアクセス権限を確認
- ビルド設定（build_spec）を確認
- 環境変数が正しく設定されているか確認

## クリーンアップ

リソースを削除する場合:

```bash
cd environments/dev  # または environments/prod
terraform destroy
```

**注意**: 本番環境では慎重に実行してください。データは復元できません。

## セキュリティ上の注意

- `terraform.tfvars`ファイルはGitにコミットしないでください
- AWS認証情報は環境変数やAWS Vaultを使用して管理してください
- 本番環境ではMFAを必ずONにしてください
- S3バケットのCORS設定は必要最小限に制限してください

## 参考資料

- [Terraform AWS Provider Documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [AWS Amplify Documentation](https://docs.aws.amazon.com/amplify/)
- [Amazon Cognito Documentation](https://docs.aws.amazon.com/cognito/)
- [Amazon DynamoDB Documentation](https://docs.aws.amazon.com/dynamodb/)
- [Google Cloud Terraform Best Practices](https://cloud.google.com/docs/terraform/best-practices/general-style-structure)

## サポート

問題が発生した場合は、GitHubのIssueを作成してください。
