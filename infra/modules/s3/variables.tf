variable "project_name" {
  description = "プロジェクト名"
  type        = string
}

variable "environment" {
  description = "環境名 (dev, prod)"
  type        = string
}

variable "enable_versioning" {
  description = "バージョニングを有効にするかどうか"
  type        = bool
  default     = true
}

variable "kms_key_arn" {
  description = "暗号化に使用するKMSキーのARN (nullの場合はAWSマネージドキーを使用)"
  type        = string
  default     = null
}

variable "allowed_origins" {
  description = "CORS設定で許可するオリジンのリスト"
  type        = list(string)
  default     = ["*"]
}

variable "enable_lifecycle_rules" {
  description = "ライフサイクルルールを有効にするかどうか"
  type        = bool
  default     = true
}

variable "noncurrent_version_expiration_days" {
  description = "非現行バージョンの有効期限 (日数)"
  type        = number
  default     = 90
}

variable "transition_to_ia_days" {
  description = "Intelligent Tieringへ移行する日数"
  type        = number
  default     = 30
}

variable "transition_to_glacier_days" {
  description = "Glacierへ移行する日数"
  type        = number
  default     = 180
}

variable "tags" {
  description = "リソースに付与する共通タグ"
  type        = map(string)
  default     = {}
}
