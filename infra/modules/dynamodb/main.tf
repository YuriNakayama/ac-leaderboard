# DynamoDB Table for Scores
resource "aws_dynamodb_table" "scores" {
  name             = "${var.project_name}-${var.environment}-scores"
  billing_mode     = var.billing_mode
  hash_key         = "user_id"
  range_key        = "timestamp"
  stream_enabled   = var.stream_enabled
  stream_view_type = var.stream_enabled ? var.stream_view_type : null

  # プロビジョンドモードの場合のキャパシティ設定
  read_capacity  = var.billing_mode == "PROVISIONED" ? var.read_capacity : null
  write_capacity = var.billing_mode == "PROVISIONED" ? var.write_capacity : null

  # 属性定義
  attribute {
    name = "user_id"
    type = "S"
  }

  attribute {
    name = "timestamp"
    type = "N"
  }

  attribute {
    name = "competition_id"
    type = "S"
  }

  attribute {
    name = "score"
    type = "N"
  }

  # GSI: コンペティションIDでクエリ
  global_secondary_index {
    name            = "CompetitionIndex"
    hash_key        = "competition_id"
    range_key       = "score"
    projection_type = "ALL"
    read_capacity   = var.billing_mode == "PROVISIONED" ? var.gsi_read_capacity : null
    write_capacity  = var.billing_mode == "PROVISIONED" ? var.gsi_write_capacity : null
  }

  # GSI: タイムスタンプでクエリ（最新のスコア取得用）
  global_secondary_index {
    name            = "TimestampIndex"
    hash_key        = "competition_id"
    range_key       = "timestamp"
    projection_type = "ALL"
    read_capacity   = var.billing_mode == "PROVISIONED" ? var.gsi_read_capacity : null
    write_capacity  = var.billing_mode == "PROVISIONED" ? var.gsi_write_capacity : null
  }

  # Point-in-time recovery
  point_in_time_recovery {
    enabled = var.enable_point_in_time_recovery
  }

  # サーバーサイド暗号化
  server_side_encryption {
    enabled     = true
    kms_key_arn = var.kms_key_arn
  }

  # TTL設定
  ttl {
    enabled        = var.enable_ttl
    attribute_name = "ttl"
  }

  tags = merge(
    var.tags,
    {
      Name        = "${var.project_name}-${var.environment}-scores"
      Environment = var.environment
    }
  )
}

# DynamoDB Table for Competitions
resource "aws_dynamodb_table" "competitions" {
  name         = "${var.project_name}-${var.environment}-competitions"
  billing_mode = var.billing_mode
  hash_key     = "competition_id"

  read_capacity  = var.billing_mode == "PROVISIONED" ? var.read_capacity : null
  write_capacity = var.billing_mode == "PROVISIONED" ? var.write_capacity : null

  attribute {
    name = "competition_id"
    type = "S"
  }

  attribute {
    name = "status"
    type = "S"
  }

  # GSI: ステータスでフィルタリング
  global_secondary_index {
    name            = "StatusIndex"
    hash_key        = "status"
    projection_type = "ALL"
    read_capacity   = var.billing_mode == "PROVISIONED" ? var.gsi_read_capacity : null
    write_capacity  = var.billing_mode == "PROVISIONED" ? var.gsi_write_capacity : null
  }

  point_in_time_recovery {
    enabled = var.enable_point_in_time_recovery
  }

  server_side_encryption {
    enabled     = true
    kms_key_arn = var.kms_key_arn
  }

  tags = merge(
    var.tags,
    {
      Name        = "${var.project_name}-${var.environment}-competitions"
      Environment = var.environment
    }
  )
}

# DynamoDB Table for User Submissions
resource "aws_dynamodb_table" "submissions" {
  name         = "${var.project_name}-${var.environment}-submissions"
  billing_mode = var.billing_mode
  hash_key     = "submission_id"

  read_capacity  = var.billing_mode == "PROVISIONED" ? var.read_capacity : null
  write_capacity = var.billing_mode == "PROVISIONED" ? var.write_capacity : null

  attribute {
    name = "submission_id"
    type = "S"
  }

  attribute {
    name = "user_id"
    type = "S"
  }

  attribute {
    name = "competition_id"
    type = "S"
  }

  # GSI: ユーザーIDで提出履歴を取得
  global_secondary_index {
    name            = "UserSubmissionsIndex"
    hash_key        = "user_id"
    range_key       = "competition_id"
    projection_type = "ALL"
    read_capacity   = var.billing_mode == "PROVISIONED" ? var.gsi_read_capacity : null
    write_capacity  = var.billing_mode == "PROVISIONED" ? var.gsi_write_capacity : null
  }

  point_in_time_recovery {
    enabled = var.enable_point_in_time_recovery
  }

  server_side_encryption {
    enabled     = true
    kms_key_arn = var.kms_key_arn
  }

  ttl {
    enabled        = var.enable_ttl
    attribute_name = "ttl"
  }

  tags = merge(
    var.tags,
    {
      Name        = "${var.project_name}-${var.environment}-submissions"
      Environment = var.environment
    }
  )
}
