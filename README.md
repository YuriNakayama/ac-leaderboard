# AC Leaderboard

機械学習コンペティションのためのリーダーボードアプリケーション。Kaggleのようなリアルタイムスコア更新機能を提供します。

## 機能

- **ユーザー認証**: AWS Cognitoを使用した認証機能
  - サインアップとログイン
  - メール検証
  - パスワードリセット
  - ユーザーグループ管理（管理者・一般ユーザー）
- **リーダーボード**: リアルタイムでスコアを表示
- **スコアアップロード**: CSVファイルからスコアをアップロード
- **管理機能**: 管理者によるスコア編集

## 技術スタック

- **フロントエンド**: Next.js 15.4+, React 19, TypeScript 5+, Tailwind CSS 4
- **認証**: AWS Cognito (User Pool + Identity Pool)
- **インフラ**: AWS (ECS Fargate, ALB, ECR, Amplify), Terraform, Docker

## セットアップ

### 前提条件

- Node.js 22+
- npm
- AWS CLI (設定済み)
- Terraform

### 1. インフラのデプロイ

```bash
cd infra/environments/dev
terraform init
terraform plan
terraform apply
```

**注意**: Cognito関連の環境変数は、TerraformによってAmplifyに自動的に設定されます。手動での環境変数設定は不要です。

### 2. フロントエンドの起動（ローカル開発の場合）

ローカルで開発する場合は、以下の手順で環境変数を設定してください：

```bash
cd frontend
cp .env.example .env.local
```

`.env.local`に、Terraformの出力値を設定してください：

```env
NEXT_PUBLIC_COGNITO_USER_POOL_ID=<cognito_user_pool_id>
NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID=<cognito_user_pool_client_id>
NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID=<cognito_identity_pool_id>
NEXT_PUBLIC_AWS_REGION=ap-northeast-1
```

Terraformのアウトプットから値を取得：

```bash
cd infra/environments/dev

# 個別に取得する場合
terraform output cognito_user_pool_id
terraform output cognito_user_pool_client_id
terraform output cognito_identity_pool_id

# または、すべての環境変数を一度に取得
terraform output frontend_env_variables
```

`.env.local`に設定する値は、以下のコマンドで確認できます：

```bash
# JSON形式で出力
terraform output -json frontend_env_variables
```

フロントエンドを起動：

```bash
npm install
npm run dev
```

アプリケーションは <http://localhost:3000> で起動します。

## 認証機能の使い方

### 新規ユーザー登録

1. `/auth/signup` にアクセス
2. メールアドレスとパスワードを入力
3. メールに送信された確認コードを入力

### ログイン

1. `/auth/signin` にアクセス
2. メールアドレスとパスワードを入力

### パスワードリセット

1. `/auth/reset-password` にアクセス
2. メールアドレスを入力
3. メールに送信されたリセットコードと新しいパスワードを入力

### 管理者権限の付与

AWS Cognitoコンソールから、ユーザーを`admin`グループに追加してください。

## How to run

## Commands

リモートに存在しないブランチを削除

```bash
git fetch --prune && git branch -vv | grep ': gone]' | awk '{print $1}' | xargs -r git branch -d
```

## development rules

### branch prefix

[GitHub Branching Name Best Practices](https://dev.to/jps27cse/github-branching-name-best-practices-49ei)

| Prefix   | Description |
|----------|-------------|
| feature/ | For new features or functionalities. |
| bugfix/  | For fixing bugs in the code. |
| hotfix/  | For urgent patches, usually applied to production. |

### commit message

[gitmoji.dev](https://gitmoji.dev/)

#### 機能開発・改善

|       Emoji       | code             | Mean                                    |
| :---------------: | :--------------- | :-------------------------------------- |
|   :sparkles:      | `:sparkles:`     | Introduce new features.                 |
|     :zap:         | `:zap:`          | Improve performance                     |
|     :art:         | `:art:`          | Improve structure / format of the code. |
|   :recycle:       | `:recycle:`      | Refactor code.                          |

#### テスト

|         Emoji         | code                 | Mean                        |
| :-------------------: | :------------------- | :-------------------------- |
| :white_check_mark:    | `:white_check_mark:` | Add, update, or pass tests. |

#### バグ修正

|     Emoji     | code          | Mean            |
| :-----------: | :------------ | :-------------- |
|    :bug:      | `:bug:`       | Fix a bug.      |
| :ambulance:   | `:ambulance:` | Critical hotfix |

#### ドキュメント

|   Emoji   | code      | Mean                         |
| :-------: | :-------- | :--------------------------- |
| :books:   | `:books:` | Add or update documentation. |

#### インフラ・設定

|         Emoji         | code                    | Mean                              |
| :-------------------: | :---------------------- | :-------------------------------- |
| :construction_worker: | `:construction_worker:` | Add or update CI build system.    |
|       :bricks:        | `:bricks:`              | Infrastructure related changes    |
|       :wrench:        | `:wrench:`              | Add or update configuration files.|
|   :heavy_plus_sign:   | `:heavy_plus_sign:`     | Add a dependency.                 |
