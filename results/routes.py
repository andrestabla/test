import json
from flask import render_template

from . import results_bp
from auth.utils import login_required
from models import QuestionnaireResponse
from questionnaires.data import DIMENSIONS


@results_bp.route('/results')
@login_required
def dashboard():
    responses = QuestionnaireResponse.query.filter_by(user_id=g.user.id).order_by(QuestionnaireResponse.created_at).all()
    latest = responses[-1] if responses else None
    timeline = [resp.created_at.strftime('%Y-%m-%d %H:%M') for resp in responses]
    datasets = []
    palette = ['#2563eb', '#22c55e', '#f97316', '#a855f7', '#0ea5e9', '#f43f5e']
    for idx, dim in enumerate(DIMENSIONS):
        datasets.append({
            'label': dim,
            'data': [resp.dimension_scores_dict().get(dim, 0) for resp in responses],
            'borderColor': palette[idx % len(palette)],
            'backgroundColor': palette[idx % len(palette)],
            'fill': False,
        })
    chart_data = json.dumps({'labels': timeline, 'datasets': datasets})
    return render_template('results.html', responses=responses, latest=latest, chart_data=chart_data, dimensions=DIMENSIONS)
