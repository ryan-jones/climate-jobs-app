from flask import Blueprint, request
import api.services as services

bp = Blueprint('main', __name__)


@bp.post('/jobs')
def get_jobs_list():
    request_body = request.get_json()
    print('args', request_body)
    return services.get_jobs(request_body)


@bp.post('/jobs/update')
def update_list():
    return services.update_jobs_list()


@bp.get('/sectors')
def get_sectors():
    return services.get_sectors()
