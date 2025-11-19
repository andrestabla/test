import os

from flask import Flask, g, session, redirect, url_for

from config import Config
from models import db, User
from auth import auth_bp
from questionnaires import questionnaires_bp
from results import results_bp
from reports import reports_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    os.makedirs(os.path.join(app.root_path, 'instance'), exist_ok=True)
    os.makedirs(app.config['REPORT_DIR'], exist_ok=True)
    os.makedirs(app.config['RESPONSE_DIR'], exist_ok=True)

    db.init_app(app)

    with app.app_context():
        db.create_all()

    @app.before_request
    def load_user():
        user_id = session.get('user_id')
        g.user = User.query.get(user_id) if user_id else None

    @app.route('/')
    def index():
        if g.user:
            return redirect(url_for('questionnaires.fill'))
        return redirect(url_for('auth.login'))

    app.register_blueprint(auth_bp)
    app.register_blueprint(questionnaires_bp)
    app.register_blueprint(results_bp)
    app.register_blueprint(reports_bp)

    return app


if __name__ == '__main__':
    application = create_app()
    application.run(debug=True)
