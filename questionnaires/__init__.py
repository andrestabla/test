from flask import Blueprint

questionnaires_bp = Blueprint('questionnaires', __name__, template_folder='../templates')

from . import routes  # noqa: E402,F401
