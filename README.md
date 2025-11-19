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
