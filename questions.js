export const dimensions = [
  {
    id: 'strategy',
    title: 'Estrategia',
    short: 'Estrategia',
    icon: '🎯',
    color: '#2563eb',
    weightAIQ: 0.25,
    blocks: [
      {
        name: 'Gobernanza de IA',
        key: 'gob',
        questions: [
          '(Estrategia) ¿Existe una visión y misión que incluya transformación digital e IA?',
          '(Estrategia) ¿La estrategia digital está documentada y aprobada por la alta dirección?',
          '(Estrategia) ¿Se revisa y actualiza la estrategia digital e IA de forma periódica?',
          '(Estrategia) ¿Los objetivos digitales se alinean con metas de negocio claras?',
          '(Estrategia) ¿Hay un portafolio priorizado de iniciativas digitales basado en valor?',
          '(Estrategia) ¿La alta dirección patrocina activamente proyectos digitales e IA?',
          '(Estrategia) ¿Hay roles dedicados a la transformación (p.ej., CDO)?',
          '(Estrategia) ¿La hoja de ruta incluye adopción de IA en procesos clave?',
          '(Estrategia) ¿Existen KPIs para medir el avance de la estrategia digital?',
          '(Estrategia) ¿Hay presupuesto específico para proyectos digitales e IA?'
        ]
      },
      {
        name: 'Roles y Responsabilidades',
        key: 'roles',
        questions: [
          '(Estrategia) ¿Se usan alianzas externas para acelerar la transformación digital?',
          '(Estrategia) ¿Se exploran nuevos modelos de negocio digitales basados en datos?',
          '(Estrategia) ¿Se pilotan tecnologías emergentes (IoT, IA generativa, blockchain)?',
          '(Estrategia) ¿Se gestionan riesgos digitales y éticos como parte de la estrategia?',
          '(Estrategia) ¿La estrategia conecta con sostenibilidad y responsabilidad social?',
          '(Estrategia) ¿Existe roadmap de IA alineado a procesos y casos de uso prioritarios?',
          '(Estrategia) ¿Se calcula y comunica el ROI de los proyectos de IA?',
          '(Estrategia) ¿La estrategia contempla gobernanza y ética de datos/IA?',
          '(Estrategia) ¿Hay plan para escalar IA a otras áreas tras probar pilotos?',
          '(Estrategia) ¿La visión digital e IA se comunica a todos los niveles?'
        ]
      },
      {
        name: 'Riesgos',
        key: 'riesgos',
        questions: [
          '(Estrategia) ¿Se difunden logros y aprendizajes digitales internamente?',
          '(Estrategia) ¿Se gestiona el cambio cultural derivado de la digitalización?',
          '(Estrategia) ¿Clientes/usuarios participan en la estrategia (co-creación)?',
          '(Estrategia) ¿Se vigilan competidores y tendencias para ajustar la estrategia?',
          '(Estrategia) ¿La estrategia considera resiliencia y continuidad digital?',
          '(Estrategia) ¿Aprendizajes de proyectos previos se integran en nuevos planes?',
          '(Estrategia) ¿Se definen objetivos de madurez y metas de DQ/AIQ?',
          '(Estrategia) ¿La IA se usa para optimizar procesos internos y experiencia cliente?',
          '(Estrategia) ¿La estrategia digital está alineada con la de datos e infraestructura?',
          '(Estrategia) ¿Se actualiza la hoja de ruta tras medir avances y brechas?'
        ]
      }
    ]
  },
  {
    id: 'data',
    title: 'Infraestructura & Datos',
    short: 'Datos',
    icon: '🗄️',
    color: '#0ea5e9',
    weightAIQ: 0.3,
    blocks: [
      {
        name: 'Gobernanza de IA',
        key: 'gob',
        questions: [
          '(Datos) ¿La arquitectura tecnológica está documentada (nube/on-premise)?',
          '(Datos) ¿Se usan servicios en la nube para escalar rápido?',
          '(Datos) ¿Existe data lake o repositorio centralizado de datos?',
          '(Datos) ¿Se integran datos de diferentes fuentes en un repositorio único?',
          '(Datos) ¿Hay diccionarios y modelos de datos documentados?',
          '(Datos) ¿Existen políticas para asegurar la calidad de datos?',
          '(Datos) ¿Se audita periódicamente la calidad de los datos?',
          '(Datos) ¿Hay equipo responsable de gestión de datos (arquitecto, steward)?',
          '(Datos) ¿Se catalogan y clasifican datos con metadatos claros?',
          '(Datos) ¿Controles de ciberseguridad (firewalls, cifrado) están certificados?'
        ]
      },
      {
        name: 'Roles y Responsabilidades',
        key: 'roles',
        questions: [
          '(Datos) ¿Existe plan de continuidad y recuperación ante desastres?',
          '(Datos) ¿Accesos a sistemas se gestionan con IAM y privilegios mínimos?',
          '(Datos) ¿Se capacita al personal en seguridad de la información?',
          '(Datos) ¿Se usan herramientas BI para visualizar datos?',
          '(Datos) ¿Hay entornos accesibles para análisis avanzado y ML?',
          '(Datos) ¿Se cuenta con plataforma MLOps para desarrollar y desplegar IA?',
          '(Datos) ¿Pipelines de ingesta y preparación están automatizados?',
          '(Datos) ¿Se usan servicios de bases de datos en la nube eficientemente?',
          '(Datos) ¿Sistemas de TI están integrados mediante middleware o APIs?',
          '(Datos) ¿Existe catálogo de APIs internas/externas?'
        ]
      },
      {
        name: 'Riesgos',
        key: 'riesgos',
        questions: [
          '(Datos) ¿Licencias de software y datos están en regla?',
          '(Datos) ¿Se monitorea desempeño de infraestructura y tiempos de respuesta?',
          '(Datos) ¿Datos disponibles son suficientes para entrenar modelos de IA?',
          '(Datos) ¿Hay proceso de etiquetado de datos cuando se necesita?',
          '(Datos) ¿Se anonimizan o seudonimizan datos sensibles?',
          '(Datos) ¿Existen políticas de gobernanza de datos claras?',
          '(Datos) ¿SLAs para plataformas de datos están definidos y medidos?',
          '(Datos) ¿Se evalúan periódicamente proveedores de infraestructura?',
          '(Datos) ¿IAM incluye autenticación multifactor?',
          '(Datos) ¿Se sigue un marco de ciberseguridad (ISO 27001, NIST)?'
        ]
      }
    ]
  },
  {
    id: 'talent',
    title: 'Talento & Cultura',
    short: 'Talento',
    icon: '🧠',
    color: '#22c55e',
    weightAIQ: 0.1,
    blocks: [
      {
        name: 'Gobernanza de IA',
        key: 'gob',
        questions: [
          '(Talento) ¿La mayoría maneja herramientas digitales básicas?',
          '(Talento) ¿Hay formación continua en habilidades digitales y datos?',
          '(Talento) ¿Se ofrece capacitación en ágiles y design thinking?',
          '(Talento) ¿Empleados reciben upskilling en IA y analítica avanzada?',
          '(Talento) ¿Existen estrategias para atraer talento digital especializado?',
          '(Talento) ¿Se contratan científicos e ingenieros de datos y nube?',
          '(Talento) ¿Programas de carrera y reconocimiento retienen talento digital?',
          '(Talento) ¿Estructura salarial incentiva perfiles técnicos críticos?',
          '(Talento) ¿Equipos colaboran sin silos funcionales?',
          '(Talento) ¿Hay comunidades de práctica o capítulos de analítica?'
        ]
      },
      {
        name: 'Roles y Responsabilidades',
        key: 'roles',
        questions: [
          '(Talento) ¿Se fomenta aprendizaje continuo con cursos y certificaciones?',
          '(Talento) ¿Metodologías ágiles se usan en proyectos digitales?',
          '(Talento) ¿Squads multidisciplinarios son permanentes o frecuentes?',
          '(Talento) ¿Existe apertura a experimentar y tolerancia al fracaso?',
          '(Talento) ¿Se premian ideas y resolución creativa de problemas?',
          '(Talento) ¿Se impulsa diversidad e inclusión en equipos digitales?',
          '(Talento) ¿Programa de gestión del cambio acompaña la digitalización?',
          '(Talento) ¿Liderazgo comunica la importancia de la transformación?',
          '(Talento) ¿Participan en eventos o hackatones externos?',
          '(Talento) ¿Se detectan y gestionan barreras culturales al cambio?'
        ]
      },
      {
        name: 'Riesgos',
        key: 'riesgos',
        questions: [
          '(Talento) ¿Hay mentoría o coaching para habilidades digitales?',
          '(Talento) ¿Se cuida el bienestar y se evita burnout en proyectos digitales?',
          '(Talento) ¿Hay capacitación en ética digital y uso responsable de IA?',
          '(Talento) ¿Política abierta para reportar riesgos o malas prácticas digitales?',
          '(Talento) ¿La organización participa en comunidades de código abierto?',
          '(Talento) ¿Modalidades remotas/híbridas atraen talento digital?',
          '(Talento) ¿RR.HH. domina la gestión de talento digital?',
          '(Talento) ¿Modelos de IA se revisan para evitar sesgos con equipos diversos?',
          '(Talento) ¿Se miden tasas de rotación de perfiles digitales?',
          '(Talento) ¿Cultura digital se alinea con valores éticos y sociales?'
        ]
      }
    ]
  },
  {
    id: 'governance',
    title: 'Gobernanza & Liderazgo',
    short: 'Gobernanza',
    icon: '🧭',
    color: '#f59e0b',
    weightAIQ: 0.25,
    blocks: [
      {
        name: 'Gobernanza de IA',
        key: 'gob',
        questions: [
          '(Gobernanza) ¿Existe comité o consejo de transformación digital e IA?',
          '(Gobernanza) ¿Roles y responsabilidades de gobernanza digital están claros?',
          '(Gobernanza) ¿La gobernanza digital se integra al gobierno corporativo?',
          '(Gobernanza) ¿Inversiones digitales se aprueban con criterios definidos?',
          '(Gobernanza) ¿Políticas de datos (acceso, privacidad) están aprobadas?',
          '(Gobernanza) ¿Hay código ético para uso de IA y datos personales?',
          '(Gobernanza) ¿Políticas de TI incluyen alta/baja de sistemas?',
          '(Gobernanza) ¿Riesgos digitales se identifican y gestionan formalmente?',
          '(Gobernanza) ¿Equipo de continuidad de negocio y crisis digitales está activo?',
          '(Gobernanza) ¿KPIs de desempeño digital e IA se monitorean con regularidad?'
        ]
      },
      {
        name: 'Roles y Responsabilidades',
        key: 'roles',
        questions: [
          '(Gobernanza) ¿Reportes o dashboards de gobernanza llegan a la dirección?',
          '(Gobernanza) ¿Modelo financiero de proyectos digitales está definido?',
          '(Gobernanza) ¿Se realizan auditorías internas/externas de cumplimiento digital?',
          '(Gobernanza) ¿Comité específico revisa proyectos y ética de IA?',
          '(Gobernanza) ¿Cambios tecnológicos se controlan por impacto en procesos y roles?',
          '(Gobernanza) ¿PI y propiedad intelectual se protegen en desarrollos digitales?',
          '(Gobernanza) ¿Dirección recibe reportes frecuentes sobre transformación?',
          '(Gobernanza) ¿SLAs y contratos con proveedores tecnológicos están vigentes?',
          '(Gobernanza) ¿Gobernanza coordina con legal/regulatorio para alineación?',
          '(Gobernanza) ¿Talento digital se incluye en la agenda de gobernanza?'
        ]
      },
      {
        name: 'Riesgos',
        key: 'riesgos',
        questions: [
          '(Gobernanza) ¿Se revisan proyectos fallidos para extraer lecciones?',
          '(Gobernanza) ¿Hay inventario y registro de activos de datos críticos?',
          '(Gobernanza) ¿Cada dataset tiene un data owner asignado?',
          '(Gobernanza) ¿Decisiones de gobernanza se comunican con transparencia?',
          '(Gobernanza) ¿Decisores tienen información en tiempo real para deliberar?',
          '(Gobernanza) ¿Gobernanza fomenta coordinación entre áreas clave?',
          '(Gobernanza) ¿Políticas se actualizan según nuevas leyes de datos/IA/ciberseguridad?',
          '(Gobernanza) ¿Se contrata asesoría externa para temas críticos de gobernanza?',
          '(Gobernanza) ¿Alineación de IA con objetivos y riesgos se revisa periódicamente?',
          '(Gobernanza) ¿Alta dirección impulsa cultura data-driven con soporte de gobernanza?'
        ]
      }
    ]
  },
  {
    id: 'process',
    title: 'Procesos & Automatización',
    short: 'Procesos',
    icon: '🤖',
    color: '#8b5cf6',
    weightAIQ: 0.05,
    blocks: [
      {
        name: 'Gobernanza de IA',
        key: 'gob',
        questions: [
          '(Procesos) ¿Procesos clave están identificados y documentados?',
          '(Procesos) ¿Existe equipo de mejora continua de procesos?',
          '(Procesos) ¿Se usan herramientas BPMN o process mining para mapear?',
          '(Procesos) ¿Flujos están estandarizados en toda la organización?',
          '(Procesos) ¿Hay RPA u otras automatizaciones para tareas repetitivas?',
          '(Procesos) ¿Chatbots u asistentes digitales automatizan atención?',
          '(Procesos) ¿IA mejora eficiencia (predicción demanda, mantenimiento)?',
          '(Procesos) ¿Automatizaciones se integran con ERP/CRM/BPM existentes?',
          '(Procesos) ¿Pilotos de automatización se controlan antes de escalar?',
          '(Procesos) ¿ROI y ahorro tras automatizar se mide y reporta?'
        ]
      },
      {
        name: 'Roles y Responsabilidades',
        key: 'roles',
        questions: [
          '(Procesos) ¿Cambios en procesos se implementan de forma ágil?',
          '(Procesos) ¿Manual de procedimientos se mantiene actualizado?',
          '(Procesos) ¿Se miden KPIs de procesos (ciclo, errores, productividad)?',
          '(Procesos) ¿Procesos se revisan periódicamente para optimizarlos?',
          '(Procesos) ¿Automatizaciones están diseñadas para escalar a más áreas?',
          '(Procesos) ¿Automatización complementa al humano y se prepara al equipo?',
          '(Procesos) ¿Personal se capacita para trabajar con RPA e IA?',
          '(Procesos) ¿Se usan plataformas de orquestación de procesos inteligentes?',
          '(Procesos) ¿Resultados de procesos automatizados alimentan dashboards?',
          '(Procesos) ¿Bots tienen políticas de ciclo de vida y permisos claros?'
        ]
      },
      {
        name: 'Riesgos',
        key: 'riesgos',
        questions: [
          '(Procesos) ¿Priorización de procesos a automatizar sigue criterios de valor?',
          '(Procesos) ¿Riesgos operativos y de seguridad se evalúan antes de automatizar?',
          '(Procesos) ¿Se comunica qué tareas están automatizadas y su impacto?',
          '(Procesos) ¿Hay monitoreo y corrección cuando automatizaciones fallan?',
          '(Procesos) ¿Analítica avanzada detecta cuellos de botella y oportunidades?',
          '(Procesos) ¿Procesos incluyen recomendaciones de IA en tiempo real?',
          '(Procesos) ¿Reglas de negocio automatizadas gestionan decisiones?',
          '(Procesos) ¿Soluciones son interoperables con múltiples plataformas?',
          '(Procesos) ¿Se hace benchmarking interno/externo para mejores prácticas?',
          '(Procesos) ¿Existe roadmap de automatización con hitos y recursos definidos?'
        ]
      }
    ]
  },
  {
    id: 'cx',
    title: 'Experiencia del Cliente',
    short: 'Cliente',
    icon: '💬',
    color: '#ef4444',
    weightAIQ: 0.05,
    blocks: [
      {
        name: 'Gobernanza de IA',
        key: 'gob',
        questions: [
          '(Cliente) ¿Journeys del cliente están mapeados y actualizados?',
          '(Cliente) ¿Se recolectan datos en todos los puntos de contacto?',
          '(Cliente) ¿Se usan plataformas omnicanal (CRM/CDP) para gestionar clientes?',
          '(Cliente) ¿Experiencia digital es coherente con la física?',
          '(Cliente) ¿Se segmenta y personaliza ofertas y contenidos?',
          '(Cliente) ¿IA ofrece recomendaciones o marketing predictivo?',
          '(Cliente) ¿Se usan chatbots o asistentes virtuales en servicio?',
          '(Cliente) ¿Se mide satisfacción y desempeño de chatbots?',
          '(Cliente) ¿Se analiza feedback y sentimiento en redes y reseñas?',
          '(Cliente) ¿Existe programa formal de feedback (NPS, encuestas)?'
        ]
      },
      {
        name: 'Roles y Responsabilidades',
        key: 'roles',
        questions: [
          '(Cliente) ¿Tiempos de atención se monitorean y mejoran?',
          '(Cliente) ¿Interfaces cumplen estándares de accesibilidad (WCAG)?',
          '(Cliente) ¿Comunicaciones son consistentes y claras en todos los canales?',
          '(Cliente) ¿Omnicanalidad permite continuar en otro canal sin fricción?',
          '(Cliente) ¿Se usan modelos de churn para prevenir abandono?',
          '(Cliente) ¿Scoring o propensión guían campañas de marketing?',
          '(Cliente) ¿Marketing y atención tienen dashboards en tiempo real?',
          '(Cliente) ¿Se realizan pruebas de usabilidad con usuarios reales?',
          '(Cliente) ¿Diseño considera inclusividad y diversidad?',
          '(Cliente) ¿Canales digitales protegen datos del cliente (SSL, privacidad)?'
        ]
      },
      {
        name: 'Riesgos',
        key: 'riesgos',
        questions: [
          '(Cliente) ¿Uso de cookies es transparente y el usuario tiene control?',
          '(Cliente) ¿Se miden NPS/CES y se actúa sobre resultados?',
          '(Cliente) ¿Se ejecutan experimentos A/B para mejorar experiencia?',
          '(Cliente) ¿Ética de algoritmos que interactúan con cliente se revisa?',
          '(Cliente) ¿Modelos predictivos anticipan necesidades y son proactivos?',
          '(Cliente) ¿Modelos de IA están integrados en voz, texto y redes sociales?',
          '(Cliente) ¿Reputación en redes se monitorea en tiempo real?',
          '(Cliente) ¿Se calcula CLV y se usa para retención?',
          '(Cliente) ¿Programas de fidelización se basan en datos y analítica?',
          '(Cliente) ¿Servicios post-venta digitales reducen fricción tras la compra?'
        ]
      }
    ]
  }
];

export const benchmarks = {
  sector: { dq: 60, aiq: 50 },
  leaders: { dq: 75, aiq: 72 },
  previous: { dq: 58, aiq: 48 }
};

export const blockLabels = ['Gobernanza de IA', 'Roles y Responsabilidades', 'Riesgos'];
