# jsonをcsvに変換し, ダウンロード可能にする. 
from flask import Blueprint, jsonify, send_file
import json
import csv
import os

export_bp = Blueprint('export', __name__)

DATA_FILE = "data.json"
CSV_FILE = "exported_data.csv"

@export_bp.route('/api/export_csv', methods=['GET'])
def export_csv():
    if not os.path.exists(DATA_FILE):
        return jsonify({"error": "No data available"}), 404

    # JSON をロード
    with open(DATA_FILE, "r") as file:
        try:
            data = json.load(file)
            if not isinstance(data, list) or len(data) == 0:
                return jsonify({"error": "No valid data to export"}), 400
        except json.JSONDecodeError:
            return jsonify({"error": "Failed to read JSON data"}), 500

    # CSV に変換
    keys = data[0].keys()  # JSON のキーを取得（すべてのオブジェクトが同じキーを持っている前提）
    with open(CSV_FILE, "w", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=keys)
        writer.writeheader()
        writer.writerows(data)

    return send_file(CSV_FILE, as_attachment=True, download_name="data.csv", mimetype="text/csv")
