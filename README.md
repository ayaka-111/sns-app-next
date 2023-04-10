## プロジェクトタイトル
firstgram

## プロジェクトの概要
snsの画像投稿アプリを作成(instagram参考)

## 使用言語
- Next.js
- TypeScript
- Tailwind CSS
- Firebase(Authentication, Storage)
- PostgreSQL
- Docker

### 機能一覧
- 画像・キャプションの投稿機能
- 投稿された画像・キャプションの閲覧機能
- 新規ユーザー登録機能
- ログイン/ログアウト機能
- 投稿に対するいいね機能
- 投稿に対するコメント機能
- ダイレクトメッセージ機能
- フォロー/フォロー解除機能
- 登録ユーザーの検索機能
- 投稿の保存機能
- プロフィール編集機能

## ブランチ運用
- main          : リリース用のソースコード
- develop       : 開発中のソースコード
- feather/機能名 : 各機能のソースコード


## ディレクトリ構造
<pre>
.
├── Dockerfile
├── README.md
├── data
│   └── db
├── docker-compose.yaml
├── firebase.js
├── firebase.json
├── lib
├── modules
├── next-env.d.ts
├── next.config.js
├── node_modules
├── package-lock.json
├── package.json
├── pages
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── api
│   ├── dmPage.module.css
│   ├── dmPage.tsx
│   ├── followLength.tsx
│   ├── followPage.tsx
│   ├── followerLength.tsx
│   ├── followerPage.tsx
│   ├── index.tsx
│   ├── login.tsx
│   ├── myPage.tsx
│   ├── passwordChange.module.css
│   ├── passwordChange.tsx
│   ├── postLength.tsx
│   ├── postList.tsx
│   ├── postPage.tsx
│   ├── profile.tsx
│   ├── profileChange.module.css
│   ├── profileChange.tsx
│   ├── register.tsx
│   └── searchPage.tsx
├── postcss.config.js
├── public
├── src
│   ├── components
│   │   ├── atoms
│   │   ├── molecules
│   │   ├── organisms
│   │   ├── templates
│   │   └── utils
│   └── styles
├── styles
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.server.json
├── types
└── yarn.lock
</pre>

## プロジェクトのスクリーンショット

トップページ
<img src="./public/top.png" />

新規投稿画面
<img src="./public/newPost.png" />

マイページ
<img src="./public/profile.png" />

検索ページ
<img src="./public/searchPage.png" />
