from flask import Blueprint, request, current_app

import jobs.services as services


bp = Blueprint('jobs', __name__)


@bp.post('/')
def get_jobs_list():
    request_body = request.get_json()
    return services.get_jobs(request_body)


@bp.post('/update')
def update_list():
    with current_app.app_context():
        return services.update_jobs_list(app=current_app._get_current_object())


@bp.get('/total')
def get_job_total_count():
    return services.get_job_total_count()
