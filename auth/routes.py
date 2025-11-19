from werkzeug.security import check_password_hash, generate_password_hash
from flask import render_template, request, redirect, url_for, flash, session

from . import auth_bp
from models import db, User


@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')
        role = request.form.get('role', 'usuario')
        if not email or not password:
            flash('Completa correo y contraseña.', 'danger')
            return render_template('register.html')
        if User.query.filter_by(email=email).first():
            flash('El correo ya está registrado.', 'warning')
            return render_template('register.html')
        password_hash = generate_password_hash(password)
        user = User(email=email, password_hash=password_hash, role=role)
        db.session.add(user)
        db.session.commit()
        flash('Cuenta creada. Inicia sesión.', 'success')
        return redirect(url_for('auth.login'))
    return render_template('register.html')


@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')
        user = User.query.filter_by(email=email).first()
        if not user or not check_password_hash(user.password_hash, password):
            flash('Credenciales inválidas.', 'danger')
            return render_template('login.html')
        session['user_id'] = user.id
        flash('Bienvenido de nuevo.', 'success')
        return redirect(url_for('questionnaires.fill'))
    return render_template('login.html')


@auth_bp.route('/logout')
def logout():
    session.pop('user_id', None)
    flash('Sesión finalizada.', 'info')
    return redirect(url_for('auth.login'))
