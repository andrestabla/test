# Batería MD-IA (AlgoritmoT)

Cuestionario interactivo de 180 preguntas (30 por dimensión) para evaluar madurez digital e IA. Esta versión es totalmente estática (un solo `index.html`) y replica la última interfaz funcional compartida por el usuario.

## Características principales

- Pestañas para cada una de las seis dimensiones del modelo MD-IA.
- Progreso general, por dimensión y por bloque de preguntas.
- Envío independiente por dimensión, con cálculo automático del puntaje (0–100) y actualización del radar, barras DQ/AIQ, insights y líneas de acción.
- Descarga de paquete offline generada en el navegador mediante JSZip (sin binarios versionados).
- Recomendaciones automáticas según el nivel (bajo, intermedio, alto) alcanzado en cada dimensión.

## Cómo usar

1. Abre `index.html` en tu navegador moderno (Chrome, Edge, Firefox o Safari). No requiere servidor ni dependencias.
2. Recorre las pestañas y responde las 30 preguntas de cada dimensión utilizando la escala 1–5.
3. Cuando una dimensión tenga todas las respuestas, presiona **Enviar dimensión** para registrar el puntaje y actualizar los tableros.
4. Consulta las pestañas **Resultados** y **Líneas de acción** para revisar el radar, los índices DQ/AIQ y las recomendaciones.
5. Si necesitas trabajar sin conexión, pulsa **Generar paquete offline**. El ZIP se construye en tu navegador con `index.html` y un README de referencia.

## Estructura del repositorio

```
.
├─ index.html   # Aplicación web estática con el cuestionario completo
└─ README.md    # Este archivo
```

## Créditos y base metodológica

- Modelo de seis dimensiones de madurez digital / IA (AlgoritmoT, referencias DQ/AIQ y Digital Pivots).
- Preguntas y ponderaciones provistas por el usuario en conversaciones previas.

Si necesitas reintroducir funcionalidades adicionales (autenticación, base de datos, reportes PDF, etc.), parte de esta versión estable para evitar romper la experiencia solicitada.
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
