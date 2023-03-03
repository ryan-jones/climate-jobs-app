from api import bp as api_bp
from flask import Flask, render_template
from flask_cors import CORS
import os

from dotenv import load_dotenv

load_dotenv()
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    DATABASE_URL = os.getenv("DATABASE_URL")
    SECRET_KEY = os.getenv("SECRET_KEY")


app = Flask(__name__, static_folder='../client/build/static',
            template_folder='../client/build')
CORS(app)

app.config.from_object(Config)

app.register_blueprint(api_bp, url_prefix='/api')


@app.route('/')
def index():
    return render_template("index.html", flask_token="hello world")
