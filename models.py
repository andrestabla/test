from datetime import datetime
import json

from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default='usuario', nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    responses = db.relationship('QuestionnaireResponse', backref='user', lazy=True)

    @property
    def is_admin(self) -> bool:
        return self.role == 'admin'


class QuestionnaireResponse(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    questionnaire_title = db.Column(db.String(120), default='MD-IA Base', nullable=False)
    responses = db.Column(db.Text, nullable=False)
    dimension_scores = db.Column(db.Text, nullable=False)
    overall_score = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def responses_as_dict(self):
        return json.loads(self.responses)

    def dimension_scores_dict(self):
        return json.loads(self.dimension_scores)
