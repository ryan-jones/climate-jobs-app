from jobs import bp as jobs_bp
from sectors import bp as sectors_bp
from jobs.services import update_jobs_list
from flask import Flask, render_template
from flask_cors import CORS
from flask_crontab import Crontab

from config import Config


def configure_logging(app):
    import logging
    from flask.logging import default_handler
    from logging.handlers import RotatingFileHandler
    # Deactivate the default flask logger so that log messages don't get duplicated
    app.logger.removeHandler(default_handler)
    # Create a file handler object
    file_handler = RotatingFileHandler(
        'app.log', maxBytes=16384, backupCount=20)
    # Set the logging level of the file handler object so that it logs INFO and up
    file_handler.setLevel(logging.INFO)
    # Create a file formatter object
    file_formatter = logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(filename)s: %(lineno)d]')

    # Apply the file formatter object to the file handler object
    file_handler.setFormatter(file_formatter)

    # Add file handler object to the logger
    app.logger.addHandler(file_handler)


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

    crontab = Crontab(app)

    @crontab.job(minute="1")
    def schedule_update_jobs_list():
        print('Scheduled update started')
        update_jobs_list()
        print('Scheduled update completed')

    return app


if __name__ == '__main__':
    create_app().run()
