# from flask import Blueprint, jsonify, request
# import os
# from flask_cors import CORS

# listImages = Blueprint('listImages', __name__)
# CORS(listImages)

# FRONTEND_PUBLIC_PATH = "/app/frontend/public"

# @listImages.route('/api/listImages', methods=['GET'])
# def list_images():
#     dir_path = request.args.get('dir')
#     if not dir_path:
#         return jsonify([])
    
#     # full_dir_path = os.path.join(FRONTEND_PUBLIC_PATH, dir_path.lstrip("/"))
#     full_dir_path = os.path.join(FRONTEND_PUBLIC_PATH, dir_path.lstrip("/"))

#     # ディレクトリが存在しない場合は空のリストを返す
#     if not os.path.exists(full_dir_path):
#         return jsonify([full_dir_path])

#     # 指定ディレクトリ内の画像ファイルのみフィルタリング（例: .png, .jpg, .jpeg）
#     valid_extensions = ('.png', '.jpg', '.jpeg', '.gif')
#     files = [
#         f for f in os.listdir(full_dir_path)
#         if os.path.isfile(os.path.join(full_dir_path, f)) and f.lower().endswith(valid_extensions)
#     ]
#     return jsonify(files)
from flask import Blueprint, jsonify, request
import os
from flask_cors import CORS

listImages = Blueprint('listImages', __name__)
CORS(listImages)

# FRONTEND_PUBLIC_PATH はローカルの実際の public ディレクトリの絶対パス
FRONTEND_PUBLIC_PATH = "/app/frontend/public"

@listImages.route('/api/listImages', methods=['GET'])
def list_images():
    dir_path = request.args.get('dir')
    if not dir_path:
        return jsonify([])
    
    # FRONTEND_PUBLIC_PATHと渡されたディレクトリパスを結合
    full_dir_path = os.path.join(FRONTEND_PUBLIC_PATH, dir_path.lstrip("/"))
    
    # ディレクトリが存在しない場合は空のリストを返す
    if not os.path.exists(full_dir_path):
        return jsonify([full_dir_path])
    
    # 指定ディレクトリ内の画像ファイルのみフィルタリング（例: .png, .jpg, .jpeg, .gif）
    valid_extensions = ('.png', '.jpg', '.jpeg', '.gif')
    files = [
        f for f in os.listdir(full_dir_path)
        if os.path.isfile(os.path.join(full_dir_path, f)) and f.lower().endswith(valid_extensions)
    ]
    return jsonify(files)
