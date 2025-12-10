output "app_id" {
  description = "Amplify AppのID"
  value       = aws_amplify_app.main.id
}

output "app_arn" {
  description = "Amplify AppのARN"
  value       = aws_amplify_app.main.arn
}

output "default_domain" {
  description = "Amplifyのデフォルトドメイン"
  value       = aws_amplify_app.main.default_domain
}

output "branch_name" {
  description = "デプロイされたブランチ名"
  value       = aws_amplify_branch.main.branch_name
}

output "branch_url" {
  description = "ブランチのURL"
  value       = "https://${aws_amplify_branch.main.branch_name}.${aws_amplify_app.main.default_domain}"
}

output "custom_domain" {
  description = "カスタムドメイン (設定されている場合)"
  value       = var.custom_domain != null ? var.custom_domain : null
}

output "iam_role_arn" {
  description = "Amplify用IAMロールのARN"
  value       = aws_iam_role.amplify.arn
}
