# 基本設定
aws_region   = "ap-northeast-1"
project_name = "ac-leaderboard"
environment  = "dev"

# 共通タグ
common_tags = {
  Project     = "ac-leaderboard"
  Environment = "dev"
  ManagedBy   = "Terraform"
}

# Cognito設定
cognito_mfa_configuration      = "OPTIONAL"
cognito_refresh_token_validity = 30
cognito_access_token_validity  = 1
cognito_id_token_validity      = 1

# DynamoDB設定
dynamodb_billing_mode   = "PAY_PER_REQUEST"
dynamodb_stream_enabled = true
dynamodb_enable_pitr    = true
dynamodb_enable_ttl     = false

# S3設定
s3_enable_versioning      = true
s3_allowed_origins        = ["http://localhost:3000", "https://*.amplifyapp.com"]
s3_enable_lifecycle_rules = true

# Amplify設定
amplify_repository_url    = "https://github.com/YuriNakayama/ac-leaderboard"
amplify_branch_name       = "main"
amplify_app_root          = "frontend"
amplify_enable_auto_build = true

# Amplify環境変数
amplify_environment_variables = {
  NODE_ENV = "production"
}
