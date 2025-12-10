# Cognito User Pool
resource "aws_cognito_user_pool" "main" {
  name = "${var.project_name}-${var.environment}-user-pool"

  # パスワードポリシー
  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }

  # アカウント回復設定
  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

  # 自動検証属性
  auto_verified_attributes = ["email"]

  # ユーザー名属性
  username_attributes = ["email"]

  # ユーザー名の大文字小文字を区別しない
  username_configuration {
    case_sensitive = false
  }

  # MFA設定
  mfa_configuration = var.mfa_configuration == "OPTIONAL" || var.mfa_configuration == "ON" ? "OFF" : var.mfa_configuration

  # スキーマ
  schema {
    name                = "email"
    attribute_data_type = "String"
    required            = true
    mutable             = true
  }

  tags = merge(
    var.tags,
    {
      Name        = "${var.project_name}-${var.environment}-user-pool"
      Environment = var.environment
    }
  )
}

# Cognito User Pool Client
resource "aws_cognito_user_pool_client" "main" {
  name         = "${var.project_name}-${var.environment}-client"
  user_pool_id = aws_cognito_user_pool.main.id

  # 認証フロー
  explicit_auth_flows = [
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_SRP_AUTH"
  ]

  # トークン有効期限
  refresh_token_validity = var.refresh_token_validity
  access_token_validity  = var.access_token_validity
  id_token_validity      = var.id_token_validity

  token_validity_units {
    refresh_token = "days"
    access_token  = "hours"
    id_token      = "hours"
  }

  # OAuth設定
  generate_secret               = false
  prevent_user_existence_errors = "ENABLED"

  read_attributes  = ["email", "email_verified"]
  write_attributes = ["email"]
}

# 管理者グループ
resource "aws_cognito_user_group" "admin" {
  name         = "admin"
  user_pool_id = aws_cognito_user_pool.main.id
  description  = "Administrator group with full access"
  precedence   = 1
}

# 一般ユーザーグループ
resource "aws_cognito_user_group" "user" {
  name         = "user"
  user_pool_id = aws_cognito_user_pool.main.id
  description  = "Regular user group"
  precedence   = 2
}

# Identity Pool
resource "aws_cognito_identity_pool" "main" {
  identity_pool_name               = "${var.project_name}-${var.environment}-identity-pool"
  allow_unauthenticated_identities = false

  cognito_identity_providers {
    client_id               = aws_cognito_user_pool_client.main.id
    provider_name           = aws_cognito_user_pool.main.endpoint
    server_side_token_check = false
  }

  tags = merge(
    var.tags,
    {
      Name        = "${var.project_name}-${var.environment}-identity-pool"
      Environment = var.environment
    }
  )
}
