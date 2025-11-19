from flask import Blueprint

results_bp = Blueprint('results', __name__, template_folder='../templates')

from . import routes  # noqa: E402,F401
