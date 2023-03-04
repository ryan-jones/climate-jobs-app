from api import bp as api_bp
from flask import Flask, render_template
from flask_cors import CORS

from config import Config

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000',
     'https://climate-jobs-app.vercel.app'])

app.config.from_object(Config)

app.register_blueprint(api_bp, url_prefix='/api')
