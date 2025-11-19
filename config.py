import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
INSTANCE_DIR = os.path.join(BASE_DIR, 'instance')


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key-mdia')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(INSTANCE_DIR, 'cuestionarios.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    REPORT_DIR = os.path.join(INSTANCE_DIR, 'reports')
    RESPONSE_DIR = os.path.join(INSTANCE_DIR, 'responses')
