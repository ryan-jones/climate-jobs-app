from flask import Blueprint, request
import api.services as services

bp = Blueprint('main', __name__)


@bp.get('/jobs')
def get_jobs_list():
    args = request.args.to_dict()
    offset = args.get('offset')
    return services.get_jobs(offset)


@bp.post('/jobs/update')
def update_list():
    return services.update_jobs_list()


@bp.get('/sectors')
def get_sectors():
    return services.get_sectors()
