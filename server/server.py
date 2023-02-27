from flask import Flask, render_template
from flask_cors import CORS

from config import Config


def create_app(config_class=Config):
    app = Flask(__name__, static_folder='../client/build/static',
                template_folder='../client/build')
    CORS(app)

    app.config.from_object(config_class)

    from api import bp as api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    @app.route('/')
    def index():
        return render_template("index.html", flask_token="hello world")

    return app


if __name__ == "__main__":
    create_app()
