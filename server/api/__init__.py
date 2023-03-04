from flask import Blueprint, request
import api.services as services

bp = Blueprint('main', __name__)


@bp.post('/jobs')
def get_jobs_list():
    request_body = request.get_json()
    return services.get_jobs(request_body)


@bp.post('/jobs/update')
def update_list():
    return services.update_jobs_list()


@bp.get('/jobs/total')
def get_job_total_count():
    return services.get_job_total_count()


@bp.get('/sectors')
def get_sectors():
    return services.get_sectors()
