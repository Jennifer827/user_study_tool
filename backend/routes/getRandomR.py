from flask import Blueprint, jsonify
from flask_cors import CORS
import random

# Blueprint を定義
getRandomR = Blueprint('getRandomR', __name__)
CORS(getRandomR)

# モデルとデータの名前リスト（必要に応じて更新してください）
MODELS = ["2DGS", "3DGS", "3DGS-MCMC", "COLMAP", "GOF", "INGP", "Mip-NeRF360", "Mip-splatting", "NerfStudio", "Scaffold-GS", "Zip-NeRF", "gsplat"]
DATA_NAMES = ["bicycle", "bonsai", "counter", "garden", "kitchen", "room", "treehill"]

@getRandomR.route('/api/getRandomR', methods=['GET'])
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
