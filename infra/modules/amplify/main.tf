# Amplify App
resource "aws_amplify_app" "main" {
  name         = "${var.project_name}-${var.environment}"
  repository   = var.access_token != null ? var.repository_url : null
  access_token = var.access_token

  # ビルド設定
  build_spec = var.build_spec != null ? var.build_spec : <<-EOT
    version: 1
    applications:
      - appRoot: frontend
        frontend:
          phases:
            preBuild:
              commands:
                - npm ci
            build:
              commands:
                - npm run build
          artifacts:
            baseDirectory: .next
            files:
              - '**/*'
          cache:
            paths:
              - node_modules/**/*
              - .next/cache/**/*
  EOT

  # 環境変数
  environment_variables = merge(
    var.environment_variables,
    {
      AMPLIFY_MONOREPO_APP_ROOT = var.app_root
      NEXT_PUBLIC_ENV           = var.environment
    }
  )

  # カスタムルール
  custom_rule {
    source = "/<*>"
    status = "404"
    target = "/index.html"
  }

  # 自動ブランチ作成設定
  enable_auto_branch_creation   = var.enable_auto_branch_creation
  auto_branch_creation_patterns = var.auto_branch_creation_patterns

  auto_branch_creation_config {
    enable_auto_build = true
    framework         = "Next.js - SSR"
    stage             = "DEVELOPMENT"
  }

  # プラットフォーム設定
  platform = "WEB_COMPUTE"

  # IAMサービスロール
  iam_service_role_arn = aws_iam_role.amplify.arn

  tags = merge(
    var.tags,
    {
      Name        = "${var.project_name}-${var.environment}"
      Environment = var.environment
    }
  )
}

# Amplify Branch
resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.main.id
  branch_name = var.branch_name

  framework = "Next.js - SSR"
  stage     = var.environment == "prod" ? "PRODUCTION" : "DEVELOPMENT"

  enable_auto_build = var.enable_auto_build

  environment_variables = var.branch_environment_variables

  tags = merge(
    var.tags,
    {
      Name        = "${var.project_name}-${var.environment}-${var.branch_name}"
      Environment = var.environment
    }
  )
}

# IAM Role for Amplify
resource "aws_iam_role" "amplify" {
  name = "${var.project_name}-${var.environment}-amplify-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "amplify.amazonaws.com"
        }
      }
    ]
  })

  tags = merge(
    var.tags,
    {
      Name        = "${var.project_name}-${var.environment}-amplify-role"
      Environment = var.environment
    }
  )
}

# IAM Policy for Amplify
resource "aws_iam_role_policy" "amplify" {
  name = "${var.project_name}-${var.environment}-amplify-policy"
  role = aws_iam_role.amplify.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      },
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:ListBucket"
        ]
        Resource = [
          var.uploads_bucket_arn,
          "${var.uploads_bucket_arn}/*",
          var.results_bucket_arn,
          "${var.results_bucket_arn}/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan"
        ]
        Resource = [
          var.scores_table_arn,
          "${var.scores_table_arn}/*",
          var.competitions_table_arn,
          "${var.competitions_table_arn}/*",
          var.submissions_table_arn,
          "${var.submissions_table_arn}/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "cognito-idp:AdminGetUser",
          "cognito-idp:AdminListGroupsForUser",
          "cognito-idp:ListUsers"
        ]
        Resource = var.user_pool_arn
      }
    ]
  })
}

# カスタムドメイン設定（オプション）
resource "aws_amplify_domain_association" "main" {
  count = var.custom_domain != null ? 1 : 0

  app_id      = aws_amplify_app.main.id
  domain_name = var.custom_domain

  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = var.environment == "prod" ? "" : var.environment
  }

  wait_for_verification = var.wait_for_domain_verification
}
