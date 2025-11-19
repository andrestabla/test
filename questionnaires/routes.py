import json
import os

from flask import render_template, request, redirect, url_for, flash, g, current_app

from . import questionnaires_bp
from .data import QUESTION_BANK, DIMENSIONS
from auth.utils import login_required
from models import db, QuestionnaireResponse


@questionnaires_bp.route('/')
def landing():
    if g.user:
        return redirect(url_for('questionnaires.fill'))
    return redirect(url_for('auth.login'))


@questionnaires_bp.route('/questionnaire', methods=['GET', 'POST'])
@login_required
def fill():
    if request.method == 'POST':
        answers = {}
        missing = []
        for question in QUESTION_BANK:
            value = request.form.get(question['id'])
            if value is None:
                missing.append(question['id'])
            else:
                answers[question['id']] = int(value)
        if missing:
            flash('Responde todas las preguntas antes de enviar.', 'warning')
            return render_template('questionnaire.html', questions=QUESTION_BANK, dimensions=DIMENSIONS)
        dimension_totals = {dim: {'sum': 0, 'count': 0} for dim in DIMENSIONS}
        for question in QUESTION_BANK:
            dim = question['dimension']
            dimension_totals[dim]['sum'] += answers[question['id']]
            dimension_totals[dim]['count'] += 1
        dimension_scores = {}
        for dim, data in dimension_totals.items():
            avg = data['sum'] / max(data['count'], 1)
            dimension_scores[dim] = round(((avg - 1) / 4) * 100, 2)
        avg_answer = sum(answers.values()) / len(answers)
        overall_score = round(((avg_answer - 1) / 4) * 100, 2)
        response = QuestionnaireResponse(
            user_id=g.user.id,
            responses=json.dumps(answers),
            dimension_scores=json.dumps(dimension_scores),
            overall_score=overall_score,
            questionnaire_title='MD-IA Base'
        )
        db.session.add(response)
        db.session.commit()
        persist_response_file(response)
        flash('Cuestionario enviado y almacenado correctamente.', 'success')
        return redirect(url_for('results.dashboard'))
    return render_template('questionnaire.html', questions=QUESTION_BANK, dimensions=DIMENSIONS)


def persist_response_file(response: QuestionnaireResponse) -> None:
    os.makedirs(current_app.config['RESPONSE_DIR'], exist_ok=True)
    payload = {
        'user': response.user.email,
        'submitted_at': response.created_at.isoformat(),
        'dimension_scores': response.dimension_scores_dict(),
        'overall_score': response.overall_score,
        'responses': response.responses_as_dict(),
    }
    filename = f"response_{response.id}.json"
    path = os.path.join(current_app.config['RESPONSE_DIR'], filename)
    with open(path, 'w', encoding='utf-8') as fh:
        json.dump(payload, fh, ensure_ascii=False, indent=2)
