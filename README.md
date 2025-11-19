# Batería MD-IA (AlgoritmoT)

Cuestionario interactivo de 180 preguntas (30 por dimensión) para evaluar madurez digital e IA con flujo wizard, autoguardado local y tableros de resultados bajo demanda.

## Uso rápido

1. **Generar paquete offline**: el botón crea `mdia-offline.zip` en tu navegador (JSZip) con todos los archivos estáticos.
2. Extrae el ZIP y abre `index.html` en un navegador moderno. No se requiere backend ni conexión tras la descarga.
3. Arranca en la **Pantalla de bienvenida (Tab 0)** con instrucciones claras. Inicia la evaluación y usa el menú lateral para saltar entre dimensiones.
4. Completa cada dimensión en el wizard paso a paso (3 bloques de 10 preguntas) con breadcrumbs “Pregunta X/30”, feedback por bloque y mensajes motivadores.
5. Presiona **Enviar dimensión** (se habilita cuando respondes las 30) para ver modal de confirmación, micro-radar, termómetro, insights profundizados y actualizar DQ/AIQ.
6. Visita **Resultados** y **Líneas de acción** para ver radar global, DQ/AIQ + benchmark (sector, líderes, histórico) y recomendaciones dinámicas; descarga el PDF cuando completes todo.

## Contenido del paquete

- `index.html`: interfaz principal, menú lateral, instrucciones ancladas y tableros.
- `questions.js`: banco de 180 preguntas agrupadas en bloques de 10 por subdimensión.
- `state.js`: gestión de estado, autoguardado localStorage y cálculo de puntuaciones.
- `charts.js`: carga diferida de gráficos (Chart.js) y mini-radares/termómetros.
- `main.js`: lógica del wizard, accesibilidad, gamificación y generación de ZIP/PDF.
- `README.md`: esta guía de uso.

## Características clave

- Pantalla inicial con instrucciones, breadcrumbs actualizados por pregunta, menú lateral con iconos y progreso por bloque/dimensión.
- Escala Likert visual con color por nivel, atajos de teclado y hover explicativo.
- Autoguardado y recuperación desde localStorage; badges, confeti y mensajes motivadores por bloque/completitud.
- Tablero de resultados que carga gráficos solo tras el primer envío; actualiza datasets sin recrearlos y añade benchmark sector/líderes/histórico.
- Insights consultivos profundizados por subdimensión, líneas de acción dinámicas y exportación PDF.
