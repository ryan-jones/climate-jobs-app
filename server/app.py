from jobs import bp as jobs_bp
from jobs.services import update_jobs_list
from sectors import bp as sectors_bp
from flask import Flask, request, jsonify
from flask_cors import CORS
from apscheduler.schedulers.background import BackgroundScheduler
import logging
from flask.logging import default_handler
from logging.handlers import RotatingFileHandler

from config import Config


def configure_logging(app):
    # Deactivate the default flask logger so that log messages don't get duplicated
    app.logger.removeHandler(default_handler)
    file_handler = RotatingFileHandler(
        'app.log', maxBytes=16384, backupCount=20)
    # Set the logging level to INFO and above
    file_handler.setLevel(logging.INFO)
    file_formatter = logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(filename)s: %(lineno)d]')
    file_handler.setFormatter(file_formatter)
    app.logger.addHandler(file_handler)


def initialize_scheduler(app):
    scheduler = BackgroundScheduler()
    scheduler.add_job(
        func=lambda: update_jobs_list(app),
        trigger='interval',
        minutes=30,
    )
    scheduler.start()


def create_app(test_config=None):
    app = Flask(__name__)

    CORS(app, origins=['http://localhost:3000',
         'https://climate-jobs-app.vercel.app'])
    if test_config:
        app.config.from_mapping(test_config)
    else:
        app.config.from_object(Config)

    app.register_blueprint(jobs_bp, url_prefix='/api/jobs')
    app.register_blueprint(sectors_bp, url_prefix='/api/sectors')

    configure_logging(app)

    initialize_scheduler(app)

    return app


if __name__ == '__main__':
    my_app = create_app()
    my_app.run()
