from flask import Blueprint
import services

bp = Blueprint('main', __name__)


@bp.get('/')
def get_jobs_list():
    return services.get_jobs()


@bp.post('/update')
def update_list():
    return services.update_jobs_list()
