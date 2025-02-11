FROM python:3.10.12-slim

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係ファイルをコピーしてインストール
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションのソースコードをコピー
COPY . .

# コンテナ内でFlaskが外部アクセスできるようにポートを開放
EXPOSE 5000

# Flaskの実行（環境変数でホストを0.0.0.0に設定）
ENV FLASK_APP=app:app
CMD ["flask", "run", "--host=0.0.0.0"]
