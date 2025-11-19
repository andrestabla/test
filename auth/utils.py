from functools import wraps
from flask import g, redirect, url_for, flash, abort


def login_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if g.user is None:
            flash('Inicia sesión para continuar.', 'warning')
            return redirect(url_for('auth.login'))
        return view(*args, **kwargs)
    return wrapped


def role_required(role):
    def decorator(view):
        @wraps(view)
        def wrapped(*args, **kwargs):
            if g.user is None:
                flash('Inicia sesión para continuar.', 'warning')
                return redirect(url_for('auth.login'))
            if g.user.role != role:
                abort(403)
            return view(*args, **kwargs)
        return wrapped
    return decorator
