from flask import Flask, jsonify, request, send_file
from flask_cors import CORS

# ルートをインポート
from routes.submit import submit_data
from routes.export import export_csv
from routes.submit_rating import submit_rating
from routes.submit_AB import submit_AB
from routes.getRandomR import getRandomR
from routes.getRandomG import getRandomG
from routes.listImages import listImages

app = Flask(__name__)
CORS(app)  # CORSの設定

# ブループリントを登録
app.register_blueprint(submit_data)
app.register_blueprint(export_csv)
app.register_blueprint(submit_rating)
app.register_blueprint(submit_AB)
app.register_blueprint(getRandomR)
app.register_blueprint(getRandomG)
app.register_blueprint(listImages)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
