## 実装

<instruction>
frontend をリファクタリングします。

@/frontend/src/hooks/useVoiceChat.ts では@/frontend/src/app/api/ephemeral-key/route.ts を利用していますが、@/backend/src/presentation/endpoint/websocket.py で提供されているWebSocketエンドポイントを直接利用するように変更します。
まずreferenceを確認して、必要な実装を洗い出してください。
</instruction>

<requirements>
- WebSocketエンドポイントを直接利用するように変更する
- javascriptではなくtypescriptで実装する
- 現在の@/frontend/src のフォルダ構成に合わせるよう、次のフォルダで整理する
  - app
  - components
  - contexts
  - hooks
  - services
  - types
</requirements>
