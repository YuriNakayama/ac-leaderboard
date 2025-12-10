output "uploads_bucket_name" {
  description = "アップロード用S3バケットの名前"
  value       = aws_s3_bucket.uploads.id
}

output "uploads_bucket_arn" {
  description = "アップロード用S3バケットのARN"
  value       = aws_s3_bucket.uploads.arn
}

output "uploads_bucket_domain_name" {
  description = "アップロード用S3バケットのドメイン名"
  value       = aws_s3_bucket.uploads.bucket_domain_name
}

output "uploads_bucket_regional_domain_name" {
  description = "アップロード用S3バケットのリージョナルドメイン名"
  value       = aws_s3_bucket.uploads.bucket_regional_domain_name
}

output "results_bucket_name" {
  description = "結果保存用S3バケットの名前"
  value       = aws_s3_bucket.results.id
}

output "results_bucket_arn" {
  description = "結果保存用S3バケットのARN"
  value       = aws_s3_bucket.results.arn
}

output "results_bucket_domain_name" {
  description = "結果保存用S3バケットのドメイン名"
  value       = aws_s3_bucket.results.bucket_domain_name
}

output "results_bucket_regional_domain_name" {
  description = "結果保存用S3バケットのリージョナルドメイン名"
  value       = aws_s3_bucket.results.bucket_regional_domain_name
}
