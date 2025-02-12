from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

DATA_FILE = "data.json"  # 保存するファイル

# データを保存する関数
def save_data(new_data):
    try:
        with open(DATA_FILE, "r") as f:
            data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        data = []  # ファイルがない or JSONエラーなら新規作成
    
    data.append(new_data)  # 新しいデータを追加

    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)  # JSONファイルに保存

# エンドポイントの定義
@app.route('/api/submit', methods=['POST'])
def submit():
    data = request.json
    print(f"Received data: {data}")
    
    save_data(data)  # 受け取ったデータを保存

    return jsonify({"message": "Data received successfully!", "received": data})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
