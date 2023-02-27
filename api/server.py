from flask import Flask

from config import Config


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    from jobs import bp as api_bp
    app.register_blueprint(api_bp, url_prefix='/api/jobs')

    return app


if __name__ == "__main__":
    create_app()
