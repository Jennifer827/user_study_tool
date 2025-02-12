from flask import Flask
from flask_cors import CORS

# ルートをインポート
from routes.submit import submit_bp
from routes.export import export_bp

app = Flask(__name__)
CORS(app)  # CORSの設定

# ブループリントを登録
app.register_blueprint(submit_bp)
app.register_blueprint(export_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
