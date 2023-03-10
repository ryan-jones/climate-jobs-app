from flask import Blueprint, request
import sectors.services as services

bp = Blueprint('sectors', __name__)


@bp.get('/')
def get_sectors():
    return services.get_sectors()
