from flask import Blueprint
import api.services

bp = Blueprint('main', __name__)


@bp.get('/jobs')
def get_jobs_list():
    return services.get_jobs()


@bp.post('/jobs/update')
def update_list():
    return services.update_jobs_list()
