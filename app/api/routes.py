import app.api.services as services
from app.api import bp


@bp.route('/')
def index():
    return 'This is the api blueprint'


@bp.get('/jobs')
def get_jobs_list():
    return services.get_jobs()


@bp.post('/update_list')
def update_list():
    return services.update_jobs_list()
