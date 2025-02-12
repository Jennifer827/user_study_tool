# フロントエンドから受け取ったデータをJSONに保存し, 受信内容をレスポンスとして返す. 
from flask import Blueprint, request, jsonify
import json
import os

submit_data = Blueprint('submit', __name__)

DATA_FILE = "data.json"

@submit_data.route('/api/submit', methods=['POST'])
def submit():
    data = request.json  # フロントエンドからの JSON データを取得
    if data is None:
        return jsonify({"error": "Invalid JSON data"}), 400
    print(f"Received data: {data}")

    # 既存の JSON データを読み込む
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r") as file:
            try:
                existing_data = json.load(file)
                if not isinstance(existing_data, list):
                    existing_data = []
            except json.JSONDecodeError:
                existing_data = []
    else:
        existing_data = []

    # 新しいデータを追加
    existing_data.append(data)

    # JSON に保存
    with open(DATA_FILE, "w") as file:
        json.dump(existing_data, file, indent=4)

    return jsonify({"message": "Data received successfully!", "received": data})