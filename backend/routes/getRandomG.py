from flask import Blueprint, jsonify
from flask_cors import CORS
import random
import json
import os

# Blueprint を定義
getRandomG = Blueprint('getRandomG', __name__)
CORS(getRandomG)

RATINGS_FILE = "ratings.json"

MODELS = ["DG", "TGS"]
DATA_NAMES = ["airplane", "bird"]

@getRandomG.route('/api/getRandomG', methods=['GET'])
def get_random_sceneG():
    # モデルは重複しない2個をランダムに選択
    selected_models = random.sample(MODELS, 2)
    # データは1個をランダムに選択
    selected_data = random.choice(DATA_NAMES)
    
    # ここから
    # if os.path.exists(RATINGS_FILE):
    #     try:
    #         with open(RATINGS_FILE, "r") as f:
    #             ratings_data = json.load(f)
    #             if not isinstance(ratings_data, list):
    #                 ratings_data = []
    #     except json.JSONDecodeError:
    #         ratings_data = []
    # else:
    #     ratings_data = []
        
    # 結果をJSON形式で返す
    result = {
        "model1": selected_models[0],
        "model2": selected_models[1],
        "data": selected_data
    }
    # ratings_data.append(result)
    # with open(RATINGS_FILE, "w") as f:
    #     json.dump(ratings_data, f, indent=4)
    # ここまで
    
    return jsonify(result)
