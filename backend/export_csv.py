from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import json
import csv

app = Flask(__name__)
CORS(app)

DATA_FILE = "data.json"
CSV_FILE = "data.csv"

# JSONからCSVに変換する関数
def json_to_csv():
    try:
        with open(DATA_FILE, "r") as f:
            data = json.load(f)
        
        if not data:
            return False  # データが空なら変換しない
        
        # CSVのヘッダーを取得（JSONのキーをそのまま使う）
        keys = data[0].keys()
        
        with open(CSV_FILE, "w", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=keys)
            writer.writeheader()
            writer.writerows(data)
        
        return True
    except (FileNotFoundError, json.JSONDecodeError):
        return False

@app.route('/api/export_csv', methods=['GET'])
def export_csv():
    if json_to_csv():
        return send_file(CSV_FILE, as_attachment=True, mimetype="text/csv")
    else:
        return jsonify({"error": "No data available"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
