# Batería MD-IA (AlgoritmoT)

Cuestionario interactivo de 180 preguntas (30 por dimensión) para evaluar madurez digital e IA con flujo wizard, autoguardado local y tableros de resultados bajo demanda.

## Uso rápido

1. **Generar paquete offline**: el botón crea `mdia-offline.zip` en tu navegador (JSZip) con todos los archivos estáticos.
2. Extrae el ZIP y abre `index.html` en un navegador moderno. No se requiere backend ni conexión tras la descarga.
3. Completa cada dimensión en el wizard paso a paso (bloques de 10 preguntas). Usa atajos 1–5/↔️ para responder rápido.
4. Presiona **Enviar dimensión** para ver el modal de confirmación, radar mini, termómetro, insights por subdimensión y actualizar DQ/AIQ.
5. Visita **Líneas de acción** para recomendaciones dinámicas y **Descargar reporte PDF** si necesitas un informe inmediato.

## Contenido del paquete

- `index.html`: interfaz principal, menú lateral, instrucciones ancladas y tableros.
- `questions.js`: banco de 180 preguntas agrupadas en bloques de 10 por subdimensión.
- `state.js`: gestión de estado, autoguardado localStorage y cálculo de puntuaciones.
- `charts.js`: carga diferida de gráficos (Chart.js) y mini-radares/termómetros.
- `main.js`: lógica del wizard, accesibilidad, gamificación y generación de ZIP/PDF.
- `README.md`: esta guía de uso.

## Características clave

- Breadcrumbs, menú lateral con iconos y progreso por bloque/dimensión.
- Escala Likert visual con color por nivel, atajos de teclado y hover explicativo.
- Autoguardado y recuperación desde localStorage; badges y confeti al completar.
- Tablero de resultados que carga gráficos solo tras el primer envío; actualiza datasets sin recrearlos.
- Insights consultivos por subdimensión, líneas de acción dinámicas y exportación PDF.
