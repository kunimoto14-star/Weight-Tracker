# デプロイ手順書 (Web公開ガイド)

この React (Vite) アプリケーションをインターネット上に公開するための主な方法をいくつか紹介します。このアプリはバックエンド不要の静的サイト（SPA）として動作するため、多くの無料ホスティングサービスで簡単に公開できます。

## 1. Vercel (おすすめ)
Vercel は Vite プロジェクトと非常に相性が良く、設定が最も簡単です。

1. [Vercel](https://vercel.com/) にサインアップし、GitHub 等と連携します。
2. GitHub にこのプロジェクトをプッシュします。
3. Vercel のダッシュボードで 「Add New」 -> 「Project」 を選択します。
4. 対象のリポジトリを選択し、「Deploy」 ボタンを押すだけで完了です。
   - Vite の設定（Build Command: `npm run build`, Output Directory: `dist`）は自動で認識されます。

## 2. Netlify
Netlify も人気のある選択肢で、ドラッグ＆ドロップでのデプロイも可能です。

### GitHub 連携の場合
1. [Netlify](https://www.netlify.com/) にサインアップし、GitHub と連携します。
2. 「Add new site」 -> 「Import an existing project」 から対象のリポジトリを選択します。
3. デプロイ設定を確認（Build Command: `npm run build`, Publish directory: `dist`）してデプロイします。

### 手動デプロイ（ドラッグ＆ドロップ）の場合
1. ターミナルで `npm run build` を実行します。
2. プロジェクト内に `dist` フォルダが作成されます。
3. Netlify のダッシュボードにある 「Add new site」 -> 「Deploy manually」 エリアに、その `dist` フォルダを丸ごとドラッグ＆ドロップします。

## 3. GitHub Pages
GitHub の無料機能を使って公開する方法です。

1. `gh-pages` パッケージをインストールします。
   ```powershell
   npm install --save-dev gh-pages
   ```
2. `vite.config.js` に `base: '/リポジトリ名/'` を追記します。
3. `package.json` の `scripts` に以下を追加します。
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
4. `npm run deploy` を実行します。

## 4. 環境変数の設定 (重要)
セキュリティ対策として API キーを GitHub に公開しない設定にしたため、デプロイ先の管理画面で以下の環境変数を登録する必要があります。

- `VITE_FIREBASE_API_KEY`: (APIキー)
- `VITE_FIREBASE_AUTH_DOMAIN`: `weight-tracker-d851c.firebaseapp.com`
- `VITE_FIREBASE_PROJECT_ID`: `weight-tracker-d851c`
- `VITE_FIREBASE_STORAGE_BUCKET`: `weight-tracker-d851c.firebasestorage.app`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`: `403522202862`
- `VITE_FIREBASE_APP_ID`: `1:403522202862:web:5579c951a3bfa9378357ff`
- `VITE_FIREBASE_MEASUREMENT_ID`: `G-DNRM78LJ2Y`

---

**注意点:**
- **データの同期について**: このアプリは Firebase クラウドデータベースを使用しているため、同じアカウントでログインすれば、PCでもスマホでも同じデータが表示・同期されます。
- **セキュリティ**: Google から API キーに関する警告メールが届くことがありますが、環境変数の設定と API キーの制限（Google Cloud 管理画面）を行うことで安全に運用できます。
