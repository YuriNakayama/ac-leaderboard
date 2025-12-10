output "user_pool_id" {
  description = "Cognito User PoolのID"
  value       = aws_cognito_user_pool.main.id
}

output "user_pool_arn" {
  description = "Cognito User PoolのARN"
  value       = aws_cognito_user_pool.main.arn
}

output "user_pool_endpoint" {
  description = "Cognito User Poolのエンドポイント"
  value       = aws_cognito_user_pool.main.endpoint
}

output "user_pool_client_id" {
  description = "Cognito User Pool ClientのID"
  value       = aws_cognito_user_pool_client.main.id
}

output "identity_pool_id" {
  description = "Cognito Identity PoolのID"
  value       = aws_cognito_identity_pool.main.id
}

output "admin_group_name" {
  description = "管理者グループ名"
  value       = aws_cognito_user_group.admin.name
}

output "user_group_name" {
  description = "一般ユーザーグループ名"
  value       = aws_cognito_user_group.user.name
}
