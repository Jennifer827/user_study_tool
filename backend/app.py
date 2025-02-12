# from flask import Flask
# from flask_cors import CORS

# # ルートをインポート
# from routes.submit import submit_bp
# from routes.export import export_bp

# app = Flask(__name__)
# CORS(app)  # CORSの設定

# # ブループリントを登録
# app.register_blueprint(submit_bp)
# app.register_blueprint(export_bp)

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)
# backend/app.py
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import json
import os
import csv

app = Flask(__name__)
CORS(app)  # 異なるオリジンからのアクセスを許可

DATA_FILE = "data.json"         # 送信されたデータを保存するJSONファイル
CSV_FILE = "exported_data.csv"    # CSVに変換したファイル

@app.route('/api/submit', methods=['POST'])
def submit():
    """
    フロントエンドからのJSONデータ（ユーザー入力）を受け取り、
    data.jsonに保存し、受信内容をレスポンスとして返す。
    """
    data = request.json
    if data is None:
        return jsonify({"error": "Invalid JSON data"}), 400

    # 既存のデータを読み込む（存在しなければ空のリスト）
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, "r") as f:
                existing_data = json.load(f)
                if not isinstance(existing_data, list):
                    existing_data = []
        except json.JSONDecodeError:
            existing_data = []
    else:
        existing_data = []

    # 新しいデータを追加
    existing_data.append(data)
    # JSONファイルに保存
    with open(DATA_FILE, "w") as f:
        json.dump(existing_data, f, indent=4)

    return jsonify({"message": "Data received successfully!", "received": data})

@app.route('/api/export_csv', methods=['GET'])
def export_csv():
    """
    data.jsonの内容をCSVに変換し、ファイルをダウンロードさせる。
    """
    if not os.path.exists(DATA_FILE):
        return jsonify({"error": "No data available"}), 404

    try:
        with open(DATA_FILE, "r") as f:
            data = json.load(f)
    except json.JSONDecodeError:
        return jsonify({"error": "Invalid JSON data"}), 500

    if not data:
        return jsonify({"error": "No valid data to export"}), 400

    # CSVのヘッダーは最初のオブジェクトのキーを利用する
    keys = data[0].keys()
    with open(CSV_FILE, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=keys)
        writer.writeheader()
        writer.writerows(data)

    return send_file(CSV_FILE, as_attachment=True, download_name="data.csv", mimetype="text/csv")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
