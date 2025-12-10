output "scores_table_name" {
  description = "Scoresテーブルの名前"
  value       = aws_dynamodb_table.scores.name
}

output "scores_table_arn" {
  description = "ScoresテーブルのARN"
  value       = aws_dynamodb_table.scores.arn
}

output "scores_table_stream_arn" {
  description = "ScoresテーブルのStream ARN"
  value       = aws_dynamodb_table.scores.stream_arn
}

output "competitions_table_name" {
  description = "Competitionsテーブルの名前"
  value       = aws_dynamodb_table.competitions.name
}

output "competitions_table_arn" {
  description = "CompetitionsテーブルのARN"
  value       = aws_dynamodb_table.competitions.arn
}

output "submissions_table_name" {
  description = "Submissionsテーブルの名前"
  value       = aws_dynamodb_table.submissions.name
}

output "submissions_table_arn" {
  description = "SubmissionsテーブルのARN"
  value       = aws_dynamodb_table.submissions.arn
}

output "submissions_table_stream_arn" {
  description = "SubmissionsテーブルのStream ARN"
  value       = aws_dynamodb_table.submissions.stream_arn
}
