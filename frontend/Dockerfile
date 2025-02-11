# ベースイメージとして Node.js を指定
FROM node:22-slim

# 作業ディレクトリを設定
WORKDIR /app

# package.json と package-lock.json をコピーして依存関係をインストール
COPY package*.json ./
RUN npm install

# アプリの全ソースコードをコピー
COPY . .

# 開発サーバーが使うポートを開放
EXPOSE 5173

# Vite の開発サーバーを起動
CMD ["npm", "run", "dev"]
