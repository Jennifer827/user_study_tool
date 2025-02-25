# backend/submit_rating.py
from flask import Blueprint, request, jsonify
from flask_cors import CORS
import json
import os

submit_rating = Blueprint('submit_rating', __name__)
CORS(submit_rating)

DATA_DIR = "ratings"  # 保存ディレクトリを指定
os.makedirs(DATA_DIR, exist_ok=True)  # ディレクトリがなければ作成
RATINGS_FILE = "ratings.json"

def get_client_ip():
    return request.remote_addr

@submit_rating.route('/api/submit_rating', methods=['POST'])
def submit_rating_endpoint():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data received"}), 400

    ip = get_client_ip()
    file_path = os.path.join(DATA_DIR, f"{ip}_ratings_prod.json")
    
    # 既存の評価データを読み込む（存在しなければ新規作成）
    if os.path.exists(file_path):
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                ratings_data = json.load(f)
                if not isinstance(ratings_data, list):
                    ratings_data = []
        except json.JSONDecodeError:
            ratings_data = []
    else:
        ratings_data = []

    ratings_data.append(data)

    with open(file_path, "w") as f:
        json.dump(ratings_data, f, indent=4)

    return jsonify({"message": "Rating saved successfully!", "entry": data})
