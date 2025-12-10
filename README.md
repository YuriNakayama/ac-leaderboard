# AC Leaderboard

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
