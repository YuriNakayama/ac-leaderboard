terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

locals {
  env_file = file("${path.root}/../../.env")
  env_vars = {
    for line in split("\n", local.env_file) :
    split("=", line)[0] => join("=", slice(split("=", line), 1, length(split("=", line))))
    if length(split("=", line)) >= 2 && !startswith(line, "#") && trimspace(line) != ""
  }
  github_access_token_raw = lookup(local.env_vars, "GITHUB_ACCESS_TOKEN", null)

  # GITHUB_ACCESS_TOKENが見つからない、または空の場合はエラー
  github_access_token = (
    local.github_access_token_raw != null && trimspace(local.github_access_token_raw) != ""
    ? local.github_access_token_raw
    : tobool("Error: GITHUB_ACCESS_TOKEN not found or empty in infra/.env file. Please set a valid GitHub Personal Access Token.")
  )
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

# Cognito モジュール
module "cognito" {
  source = "../../modules/cognito"

  project_name = var.project_name
  environment  = var.environment

  mfa_configuration      = var.cognito_mfa_configuration
  refresh_token_validity = var.cognito_refresh_token_validity
  access_token_validity  = var.cognito_access_token_validity
  id_token_validity      = var.cognito_id_token_validity

  tags = var.common_tags
}

# DynamoDB モジュール
module "dynamodb" {
  source = "../../modules/dynamodb"

  project_name = var.project_name
  environment  = var.environment

  billing_mode                  = var.dynamodb_billing_mode
  stream_enabled                = var.dynamodb_stream_enabled
  enable_point_in_time_recovery = var.dynamodb_enable_pitr
  enable_ttl                    = var.dynamodb_enable_ttl

  tags = var.common_tags
}

# S3 モジュール
module "s3" {
  source = "../../modules/s3"

  project_name = var.project_name
  environment  = var.environment

  enable_versioning      = var.s3_enable_versioning
  allowed_origins        = var.s3_allowed_origins
  enable_lifecycle_rules = var.s3_enable_lifecycle_rules

  tags = var.common_tags
}

# Amplify モジュール
module "amplify" {
  source = "../../modules/amplify"

  project_name   = var.project_name
  environment    = var.environment
  repository_url = var.amplify_repository_url
  branch_name    = var.amplify_branch_name

  app_root              = var.amplify_app_root
  enable_auto_build     = var.amplify_enable_auto_build
  environment_variables = var.amplify_environment_variables

  # 他のモジュールからの依存関係
  uploads_bucket_arn     = module.s3.uploads_bucket_arn
  results_bucket_arn     = module.s3.results_bucket_arn
  scores_table_arn       = module.dynamodb.scores_table_arn
  competitions_table_arn = module.dynamodb.competitions_table_arn
  submissions_table_arn  = module.dynamodb.submissions_table_arn
  user_pool_arn          = module.cognito.user_pool_arn

  # Cognito設定
  user_pool_id        = module.cognito.user_pool_id
  user_pool_client_id = module.cognito.user_pool_client_id
  identity_pool_id    = module.cognito.identity_pool_id
  aws_region          = var.aws_region

  # Secrets
  access_token = local.github_access_token

  tags = var.common_tags
}
