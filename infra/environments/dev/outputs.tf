# Cognito Outputs
output "cognito_user_pool_id" {
  description = "Cognito User PoolのID"
  value       = module.cognito.user_pool_id
}

output "cognito_user_pool_client_id" {
  description = "Cognito User Pool ClientのID"
  value       = module.cognito.user_pool_client_id
}

output "cognito_identity_pool_id" {
  description = "Cognito Identity PoolのID"
  value       = module.cognito.identity_pool_id
}

# DynamoDB Outputs
output "dynamodb_scores_table_name" {
  description = "Scoresテーブルの名前"
  value       = module.dynamodb.scores_table_name
}

output "dynamodb_competitions_table_name" {
  description = "Competitionsテーブルの名前"
  value       = module.dynamodb.competitions_table_name
}

output "dynamodb_submissions_table_name" {
  description = "Submissionsテーブルの名前"
  value       = module.dynamodb.submissions_table_name
}

# S3 Outputs
output "s3_uploads_bucket_name" {
  description = "アップロード用S3バケットの名前"
  value       = module.s3.uploads_bucket_name
}

output "s3_results_bucket_name" {
  description = "結果保存用S3バケットの名前"
  value       = module.s3.results_bucket_name
}

# Amplify Outputs
output "amplify_app_id" {
  description = "Amplify AppのID"
  value       = module.amplify.app_id
}

output "amplify_default_domain" {
  description = "Amplifyのデフォルトドメイン"
  value       = module.amplify.default_domain
}

output "amplify_branch_url" {
  description = "デプロイされたブランチのURL"
  value       = module.amplify.branch_url
}

# 環境情報
output "environment" {
  description = "環境名"
  value       = var.environment
}

output "aws_region" {
  description = "デプロイされたAWSリージョン"
  value       = var.aws_region
}
