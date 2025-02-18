# backend/submit_rating.py
from flask import Blueprint, request, jsonify
from flask_cors import CORS
import json
import os

submit_rating = Blueprint('submit_rating', __name__)
CORS(submit_rating)

RATINGS_FILE = "ratings.json"

@submit_rating.route('/api/submit_rating', methods=['POST'])
def submit_rating_endpoint():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data received"}), 400

    # 期待するペイロード: videoTitle, criterion, rating
    video_title = data.get("videoTitle", "Unknown")
    criterion = data.get("criterion")
    rating = data.get("rating")

    if criterion is None or rating is None:
        return jsonify({"error": "Missing fields"}), 400

    # 既存の評価データを読み込む（存在しなければ新規作成）
    if os.path.exists(RATINGS_FILE):
        try:
            with open(RATINGS_FILE, "r") as f:
                ratings_data = json.load(f)
                if not isinstance(ratings_data, list):
                    ratings_data = []
        except json.JSONDecodeError:
            ratings_data = []
    else:
        ratings_data = []

    new_entry = {
        "videoTitle": video_title,
        "criterion": criterion,
        "rating": rating
    }
    ratings_data.append(new_entry)

    with open(RATINGS_FILE, "w") as f:
        json.dump(ratings_data, f, indent=4)

    return jsonify({"message": "Rating saved successfully!", "entry": new_entry})
