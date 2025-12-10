variable "project_name" {
  description = "プロジェクト名"
  type        = string
}

variable "environment" {
  description = "環境名 (dev, prod)"
  type        = string
}

variable "repository_url" {
  description = "GitHubリポジトリのURL"
  type        = string
}

variable "branch_name" {
  description = "デプロイするブランチ名"
  type        = string
  default     = "main"
}

variable "build_spec" {
  description = "カスタムビルド設定 (nullの場合はデフォルト設定を使用)"
  type        = string
  default     = null
}

variable "app_root" {
  description = "モノレポの場合のアプリケーションルート"
  type        = string
  default     = "frontend"
}

variable "environment_variables" {
  description = "環境変数のマップ"
  type        = map(string)
  default     = {}
}

variable "branch_environment_variables" {
  description = "ブランチ固有の環境変数"
  type        = map(string)
  default     = {}
}

variable "enable_auto_branch_creation" {
  description = "自動ブランチ作成を有効にするかどうか"
  type        = bool
  default     = false
}

variable "auto_branch_creation_patterns" {
  description = "自動ブランチ作成のパターン"
  type        = list(string)
  default     = []
}

variable "enable_auto_build" {
  description = "自動ビルドを有効にするかどうか"
  type        = bool
  default     = true
}

variable "custom_domain" {
  description = "カスタムドメイン名 (nullの場合は設定しない)"
  type        = string
  default     = null
}

variable "wait_for_domain_verification" {
  description = "ドメイン検証を待つかどうか"
  type        = bool
  default     = true
}

variable "uploads_bucket_arn" {
  description = "アップロード用S3バケットのARN"
  type        = string
}

variable "results_bucket_arn" {
  description = "結果保存用S3バケットのARN"
  type        = string
}

variable "scores_table_arn" {
  description = "ScoresテーブルのARN"
  type        = string
}

variable "competitions_table_arn" {
  description = "CompetitionsテーブルのARN"
  type        = string
}

variable "submissions_table_arn" {
  description = "SubmissionsテーブルのARN"
  type        = string
}

variable "user_pool_arn" {
  description = "Cognito User PoolのARN"
  type        = string
}

variable "tags" {
  description = "リソースに付与する共通タグ"
  type        = map(string)
  default     = {}
}
