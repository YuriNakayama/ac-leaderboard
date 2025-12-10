# 基本設定
variable "aws_region" {
  description = "AWSリージョン"
  type        = string
  default     = "ap-northeast-1"
}

variable "project_name" {
  description = "プロジェクト名"
  type        = string
  default     = "ac-leaderboard"
}

variable "environment" {
  description = "環境名"
  type        = string
  default     = "dev"
}

variable "common_tags" {
  description = "すべてのリソースに適用する共通タグ"
  type        = map(string)
  default = {
    Project     = "ac-leaderboard"
    Environment = "dev"
  }
}

# Cognito設定
variable "cognito_mfa_configuration" {
  description = "MFA設定"
  type        = string
  default     = "OPTIONAL"
}

variable "cognito_refresh_token_validity" {
  description = "リフレッシュトークンの有効期限 (日数)"
  type        = number
  default     = 30
}

variable "cognito_access_token_validity" {
  description = "アクセストークンの有効期限 (時間)"
  type        = number
  default     = 1
}

variable "cognito_id_token_validity" {
  description = "IDトークンの有効期限 (時間)"
  type        = number
  default     = 1
}

# DynamoDB設定
variable "dynamodb_billing_mode" {
  description = "DynamoDBの課金モード"
  type        = string
  default     = "PAY_PER_REQUEST"
}

variable "dynamodb_stream_enabled" {
  description = "DynamoDB Streamを有効にするかどうか"
  type        = bool
  default     = true
}

variable "dynamodb_enable_pitr" {
  description = "ポイントインタイムリカバリを有効にするかどうか"
  type        = bool
  default     = true
}

variable "dynamodb_enable_ttl" {
  description = "TTLを有効にするかどうか"
  type        = bool
  default     = false
}

# S3設定
variable "s3_enable_versioning" {
  description = "S3バージョニングを有効にするかどうか"
  type        = bool
  default     = true
}

variable "s3_allowed_origins" {
  description = "CORS設定で許可するオリジン"
  type        = list(string)
  default     = ["*"]
}

variable "s3_enable_lifecycle_rules" {
  description = "ライフサイクルルールを有効にするかどうか"
  type        = bool
  default     = true
}

# Amplify設定
variable "amplify_repository_url" {
  description = "GitHubリポジトリのURL"
  type        = string
}

variable "amplify_branch_name" {
  description = "デプロイするブランチ名"
  type        = string
  default     = "develop"
}

variable "amplify_app_root" {
  description = "アプリケーションのルートディレクトリ"
  type        = string
  default     = "frontend"
}

variable "amplify_enable_auto_build" {
  description = "自動ビルドを有効にするかどうか"
  type        = bool
  default     = true
}

variable "amplify_environment_variables" {
  description = "Amplifyの環境変数"
  type        = map(string)
  default     = {}
}
