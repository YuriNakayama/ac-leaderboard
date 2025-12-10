variable "project_name" {
  description = "プロジェクト名"
  type        = string
}

variable "environment" {
  description = "環境名 (dev, prod)"
  type        = string
}

variable "billing_mode" {
  description = "課金モード (PROVISIONED, PAY_PER_REQUEST)"
  type        = string
  default     = "PAY_PER_REQUEST"

  validation {
    condition     = contains(["PROVISIONED", "PAY_PER_REQUEST"], var.billing_mode)
    error_message = "billing_modeはPROVISIONEDまたはPAY_PER_REQUESTである必要があります。"
  }
}

variable "read_capacity" {
  description = "プロビジョンドモードの読み込みキャパシティユニット"
  type        = number
  default     = 5
}

variable "write_capacity" {
  description = "プロビジョンドモードの書き込みキャパシティユニット"
  type        = number
  default     = 5
}

variable "gsi_read_capacity" {
  description = "GSIの読み込みキャパシティユニット"
  type        = number
  default     = 5
}

variable "gsi_write_capacity" {
  description = "GSIの書き込みキャパシティユニット"
  type        = number
  default     = 5
}

variable "stream_enabled" {
  description = "DynamoDB Streamを有効にするかどうか"
  type        = bool
  default     = true
}

variable "stream_view_type" {
  description = "DynamoDB Streamのビュータイプ"
  type        = string
  default     = "NEW_AND_OLD_IMAGES"

  validation {
    condition     = contains(["KEYS_ONLY", "NEW_IMAGE", "OLD_IMAGE", "NEW_AND_OLD_IMAGES"], var.stream_view_type)
    error_message = "stream_view_typeは有効な値である必要があります。"
  }
}

variable "enable_point_in_time_recovery" {
  description = "ポイントインタイムリカバリを有効にするかどうか"
  type        = bool
  default     = true
}

variable "kms_key_arn" {
  description = "暗号化に使用するKMSキーのARN (nullの場合はAWSマネージドキーを使用)"
  type        = string
  default     = null
}

variable "enable_ttl" {
  description = "TTLを有効にするかどうか"
  type        = bool
  default     = false
}

variable "tags" {
  description = "リソースに付与する共通タグ"
  type        = map(string)
  default     = {}
}
