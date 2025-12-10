variable "project_name" {
  description = "プロジェクト名"
  type        = string
}

variable "environment" {
  description = "環境名 (dev, prod)"
  type        = string
}

variable "mfa_configuration" {
  description = "MFA設定 (OFF, ON, OPTIONAL)"
  type        = string
  default     = "OPTIONAL"

  validation {
    condition     = contains(["OFF", "ON", "OPTIONAL"], var.mfa_configuration)
    error_message = "mfa_configurationはOFF、ON、OPTIONALのいずれかである必要があります。"
  }
}

variable "refresh_token_validity" {
  description = "リフレッシュトークンの有効期限 (日数)"
  type        = number
  default     = 30
}

variable "access_token_validity" {
  description = "アクセストークンの有効期限 (時間)"
  type        = number
  default     = 1
}

variable "id_token_validity" {
  description = "IDトークンの有効期限 (時間)"
  type        = number
  default     = 1
}

variable "tags" {
  description = "リソースに付与する共通タグ"
  type        = map(string)
  default     = {}
}
