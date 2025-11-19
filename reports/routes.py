from flask import render_template, g, abort, Response

from . import reports_bp
from auth.utils import login_required
from models import QuestionnaireResponse


@reports_bp.route('/reports/download/<int:response_id>')
@login_required
def download_report(response_id: int):
    response = QuestionnaireResponse.query.get_or_404(response_id)
    if response.user_id != g.user.id and not g.user.is_admin:
        abort(403)
    html = render_template('report.html', response=response)
    headers = {'Content-Disposition': f'attachment; filename=report_{response.id}.html'}
    return Response(html, headers=headers, mimetype='text/html')
