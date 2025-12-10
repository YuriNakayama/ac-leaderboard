## フロントエンド実装

<instruction>
Kaggleのリーダーボードのように、リアルタイムでスコアが更新される仕組みをNext.jsとReact 18、TypeScriptを使用して実装してください。以下の要件を満たすようにしてください。
</instruction>

<requirements>
- ユーザーはログイン後にスコアボードページにアクセスできる
- スコアボードページでは、参加者の名前とスコアが一覧表示される
- スコアボードページからアップロードページに遷移できる
- アップロードページでは、参加者がCSVファイルをアップロードできる
- アップロードページでは、CSVファイルのフォーマットが正しいかどうかを検証する
- アップロードされたCSVファイルには、参加者の名前とスコアが含まれている
- CSVファイルがアップロードされると、スコアボードがリアルタイムで更新される
- スコアボードページとは別に、管理者用のページを作成し、管理者は参加者のスコアを手動で更新できる
</requirements>

<development-rule>
- 実装の増加量が小さくなるよう、大規模なクラスの実装はしない
- 後方互換性への配慮は不要。不要になったコードは削除
- 小さすぎるクラスやメソッドは実装しない
</development-rule>

## インフラ実装

<instruction>
Kaggleのリーダーボードのように、リアルタイムでスコアが更新される仕組みをホスティングするために、AWSを使用してインフラを構築してください。以下の要件を満たすようにしてください。
また、referenceに記載されたベストプラクティスに従い、Terraformを使用してインフラをコードとして管理してください。
</instruction>

<requirements>
- terraformを使用してインフラをコードとして管理する
- devとprodの2つの環境を構築する
- environmentsディレクトリを作成し、その中にdevとprodのサブディレクトリを作成する
- modulesに必要なAWSリソースを定義する
- Next.jsアプリケーションをホスティングするために、AWS Amplifyを使用する
- ユーザー認証にはAWS Cognitoを使用する
- スコアデータの保存にはAWS DynamoDBを使用する
- CSVファイルのアップロードにはAWS S3を使用する
- 管理者用のページには、特別な認証と権限管理を実装する
</requirements>

<development-rule>
- 実装の増加量が小さくなるよう、大規模なクラスの実装はしない
- 後方互換性への配慮は不要。不要になったコードは削除
- 小さすぎるクラスやメソッドは実装しない
</development-rule>

<reference>
https://docs.cloud.google.com/docs/terraform/best-practices/general-style-structure
</reference>
