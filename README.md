# Plataforma modular MD-IA (Flask)

Aplicación web modular para gestionar usuarios, aplicar cuestionarios MD-IA, almacenar respuestas por usuario, visualizar resultados y descargar reportes individuales.

## Requisitos

- Python 3.10+
- Pip

## Instalación

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Los paquetes listados cubren Flask y la extensión de base de datos utilizada en la aplicación.
pip install flask flask_sqlalchemy
```

*(Incluye `werkzeug` desde Flask. Agrega extensiones adicionales si lo deseas.)*

## Ejecución

```bash
export FLASK_APP=app.py
flask run
```

o bien:

```bash
python app.py
```

La base de datos SQLite (`instance/cuestionarios.db`) y las carpetas `instance/responses` y `instance/reports` se generan automáticamente.

## Estructura de carpetas

```
proyecto_cuestionarios/
├─ app.py                # crea la app Flask y registra blueprints
├─ config.py             # configuración (DB, rutas de reportes)
├─ models.py             # modelos SQLAlchemy (User, QuestionnaireResponse)
├─ auth/
│  ├─ __init__.py
│  ├─ routes.py          # login, registro, logout
│  └─ utils.py           # decoradores login_required / role_required
├─ questionnaires/
│  ├─ __init__.py
│  ├─ data.py            # preguntas y dimensiones
│  └─ routes.py          # captura de respuestas y guardado
├─ results/
│  ├─ __init__.py
│  └─ routes.py          # visualizaciones por usuario
├─ reports/
│  ├─ __init__.py
│  └─ routes.py          # descarga HTML por respuesta
└─ templates/
   ├─ base.html
   ├─ login.html
   ├─ register.html
   ├─ questionnaire.html
   ├─ results.html
   └─ report.html
```

## Flujo funcional

1. **Registro / Login:** usuarios se crean con correo y contraseña (hash). Se admite rol `usuario` o `admin` y se guarda en la sesión.
2. **Cuestionario:** cuestionario MD-IA compacto (12 preguntas) basado en seis dimensiones. Se almacena cada respuesta, puntaje global y desglose por dimensión.
3. **Persistencia:** las respuestas quedan en SQLite y en un archivo JSON independiente dentro de `instance/responses/`.
4. **Resultados:** cada usuario solo visualiza sus envíos. Se grafica la evolución por dimensión mediante Chart.js y se listan envíos.
5. **Informes:** cada envío puede descargarse como HTML (`report.html`) con datos del usuario, fecha, puntajes y respuestas. Solo el dueño o un admin pueden descargarlo.

## Extensiones sugeridas

- Añadir nuevos cuestionarios replicando la estructura del módulo `questionnaires`.
- Cambiar la base de datos a PostgreSQL editando `SQLALCHEMY_DATABASE_URI` en `config.py`.
- Implementar módulos adicionales (por ejemplo, dashboards administrativos) usando `role_required('admin')` para proteger rutas.
