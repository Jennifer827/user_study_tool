from flask import Blueprint, jsonify
from flask_cors import CORS
import random

# Blueprint を定義
get_randomR = Blueprint('get_randomR', __name__)
CORS(get_randomR)

# モデルとデータの名前リスト（必要に応じて更新してください）
MODELS = ["INGP", "NerfStudio", "Mip-NeRF360", "3DGS"]
DATA_NAMES = ["bicycle", "bonsai", "counter", "garden", "kitchen", "room", "treehill"]

@get_randomR.route('/api/get_randomR', methods=['GET'])
def get_random_sceneR():
    # モデルは重複しない2個をランダムに選択
    selected_models = random.sample(MODELS, 2)
    # データは1個をランダムに選択
    selected_data = random.choice(DATA_NAMES)
    
    # 結果をJSON形式で返す
    result = {
        "model1": selected_models[0],
        "model2": selected_models[1],
        "data": selected_data
    }
    return jsonify(result)
