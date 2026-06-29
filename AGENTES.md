# Plan de agentes del portafolio

> Estado: arquitectura futura, no implementada. Las instrucciones operativas vigentes están en `AGENTS.md`; la visión de producto está en `docs/product/PROJECT_CHARTER.md`. Ningún agente descrito aquí debe activarse antes de completar CI, contratos, evaluaciones y aprobación humana.

Este documento define agentes planeados, no funcionalidades ya implementadas. Su propósito es orientar una evolución segura desde un portafolio estático hacia un sistema que pueda analizar actividad, proponer contenido y automatizar tareas sin entregar control irrestricto a un modelo.

## Misión compartida por todos los agentes

El propósito principal del proyecto es ayudar a Pascal a conseguir empleo, clientes y oportunidades profesionales. Todos los agentes deben tratar esta misión como una restricción permanente y cuidar que el sitio convierta interés en conversaciones comerciales calificadas.

El portafolio debe proyectar una imagen profesional, elegante, moderna y confiable. Las decisiones de diseño, contenido y automatización deben servir a reclutadores, responsables de contratación, equipos técnicos y clientes potenciales. Ningún agente debe introducir efectos, textos, secciones o automatizaciones que distraigan del perfil profesional o reduzcan la claridad.

Antes de proponer un cambio, cada agente debe comprobar:

1. ¿Explica mejor el valor profesional de Pascal?
2. ¿Ayuda a encontrar rápidamente experiencia, proyectos, habilidades o contacto?
3. ¿Está respaldado por evidencia verificable?
4. ¿Mantiene una experiencia elegante, legible, accesible y rápida?
5. ¿Aumenta la probabilidad de iniciar una conversación laboral sin exagerar capacidades?

## Principio rector

Los workflows ejecutan reglas; los agentes toman decisiones acotadas.

- GitHub Actions debe encargarse de build, lint, pruebas, auditorías y despliegues reproducibles.
- Los agentes deben encargarse de clasificar, resumir, comparar, redactar o proponer.
- Toda acción de escritura debe pasar por herramientas con esquemas estrictos, permisos mínimos y registro de auditoría.
- Publicar, fusionar, borrar o contactar a terceros requiere aprobación humana.

## Agentes planeados

### 1. Agente coordinador

Función:

- Recibir una tarea o evento.
- Clasificar su intención y nivel de riesgo.
- Reunir el contexto mínimo necesario.
- Delegar al agente especialista adecuado.
- Consolidar la respuesta y solicitar aprobación cuando corresponda.

No debe editar repositorios directamente. Sus herramientas se limitan a lectura, enrutamiento y creación de solicitudes internas.

### 2. Agente de contenido del portafolio

Función:

- Comparar `src/data/projects.ts` con datos autorizados de GitHub.
- Proponer títulos, descripciones y casos de estudio.
- Detectar información obsoleta, enlaces rotos o campos incompletos.
- Preparar un parche o pull request para revisión humana.

Datos requeridos: esquema editorial, tono, idiomas, proyectos permitidos, métricas publicables y evidencia que respalde cada afirmación.

### 3. Agente de revisión técnica

Función:

- Interpretar resultados de TypeScript, ESLint, pruebas y build.
- Priorizar fallos por severidad.
- Revisar cambios en pull requests.
- Proponer correcciones pequeñas y verificables.

No debe sustituir las herramientas deterministas. Recibe sus resultados estructurados y explica o corrige lo que estas detectan.

### 4. Agente de GitHub

Función:

- Consultar repositorios, commits, pull requests, issues y checks autorizados.
- Convertir eventos de webhook en tareas internas idempotentes.
- Crear issues, comentarios o pull requests cuando una política y una aprobación lo permitan.
- Mantener enlaces entre una ejecución, el evento original y el cambio resultante.

Debe autenticarse mediante una GitHub App. Los tokens de instalación son preferibles a un personal access token para automatizaciones atribuibles a la aplicación y con acceso por instalación.

### 5. Agente de automatización y mantenimiento

Función:

- Proponer actualizaciones de dependencias y mantenimiento periódico.
- Revisar enlaces, metadata, sitemap, imágenes y contenido desactualizado.
- Crear borradores de tareas recurrentes.
- Lanzar workflows aprobados mediante `workflow_dispatch` o `repository_dispatch`.

No debe ejecutar automáticamente migraciones destructivas ni fusionar cambios.

### 6. Agente de oportunidades y contacto

Función:

- Clasificar mensajes legítimos después de pasar validación antispam.
- Extraer requerimientos, urgencia, presupuesto y próximos pasos.
- Preparar un borrador de respuesta o registrar una oportunidad.

Los mensajes pueden contener datos personales. Este agente requiere reglas explícitas de retención, cifrado, acceso y eliminación. No enviará respuestas sin aprobación humana.

### 7. Agente de seguridad y observabilidad

Función:

- Evaluar permisos solicitados por los demás agentes.
- Detectar patrones de abuso, reintentos anómalos y costos fuera de presupuesto.
- Verificar que cada acción tenga actor, motivo, entrada, resultado y aprobación.
- Suspender ejecuciones cuando una política o presupuesto se incumpla.

Este rol debe apoyarse principalmente en políticas deterministas; el modelo puede explicar señales, pero no reemplaza los controles de acceso.

### 8. Agente UI/UX y empleabilidad

Función:

- Proteger la identidad del sitio como portafolio profesional orientado a conseguir empleo.
- Revisar jerarquía visual, navegación, legibilidad, consistencia, accesibilidad y experiencia responsive.
- Evaluar el recorrido de un reclutador: presentación, habilidades, evidencia de proyectos, credibilidad y contacto.
- Proponer mejoras elegantes y modernas basadas en problemas observables, no en tendencias decorativas.
- Mantener un sistema coherente de tipografía, espaciado, color, componentes, estados y movimiento.
- Colaborar con el agente de contenido para que diseño y mensaje refuercen la misma propuesta profesional.
- Preparar especificaciones o pull requests borrador con criterios de aceptación verificables.

Debe evitar:

- Animaciones que dificulten la lectura o ralenticen la experiencia.
- Estética experimental que eclipse el contenido profesional.
- Jerga excesiva, textos genéricos o llamadas a la acción ambiguas.
- Cambios basados únicamente en gusto subjetivo.
- Ocultar información importante detrás de interacciones innecesarias.
- Publicar cambios visuales sin revisión humana y comprobación responsive.

Datos requeridos:

- Roles y tipos de empresa a los que Pascal desea aplicar.
- Idiomas y mercados objetivo.
- CV, experiencia, logros y proyectos que pueden publicarse.
- Guía visual: tipografía, color, espaciado, componentes y tono.
- Métricas de comportamiento respetuosas de la privacidad.
- Resultados de auditorías de accesibilidad, rendimiento y pruebas con usuarios.

Criterios de aceptación:

- La propuesta de valor se entiende rápidamente en la portada.
- Proyectos y habilidades aportan evidencia concreta y fácil de explorar.
- El contacto es visible y sencillo.
- No hay pérdida funcional entre móvil y escritorio.
- El contraste, foco, etiquetas y navegación por teclado son adecuados.
- Los efectos visuales respetan movimiento reducido y no perjudican rendimiento.
- El cambio mejora una necesidad profesional definida y puede verificarse.

Dirección visual obligatoria:

- El lenguaje debe sentirse como una empresa tecnológica boutique: oscuro, preciso, contemporáneo y de alta calidad.
- La referencia es el nivel de claridad y ejecución de productos como Vercel, sin copiar su marca ni convertir el portafolio en una plantilla genérica.
- La profundidad espacial, el 3D, las retículas, el vidrio y la luz pueden usarse como sistema visual cuando refuercen jerarquía y posicionamiento.
- La experiencia no debe sentirse infantil, gamer, antigua, plana ni corporativa sin personalidad.
- El contraste blanco y negro debe dominar; violeta, azul y cian funcionan como luz ambiental, no como neón decorativo permanente.
- Las animaciones deben ser suaves, físicas y contenidas. Se prohíben glitch, rebotes excesivos, texto tipo terminal y efectos que compitan con la propuesta profesional.
- El 3D debe cargarse de forma diferida, limitar resolución y detener o reducir movimiento según las preferencias del usuario.
- Toda escena visual necesita una alternativa estable: el contenido, navegación y llamadas a la acción nunca dependen de WebGL.

Tecnologías visuales autorizadas:

- Tailwind CSS para el sistema visual y composición responsive.
- Framer Motion para transiciones de interfaz y microinteracciones.
- Three.js con React Three Fiber para escenas espaciales 3D acotadas.
- SVG y CSS para retículas, haces de luz, profundidad y estados de carga.

La incorporación de una biblioteca adicional requiere justificar el valor visual, impacto en bundle, compatibilidad, accesibilidad y estrategia de carga.

Reglas de composición minimalista:

- La interfaz debe elegir un gesto visual dominante por sección; no acumular retícula, badges, cápsulas, etiquetas y tarjetas al mismo tiempo.
- El espacio negativo, la tipografía y el ritmo editorial tienen prioridad sobre contenedores decorativos.
- Evitar “card dentro de card”, esquinas redondeadas repetidas y subtítulos idénticos en cada elemento.
- El 3D debe sentirse como una escultura digital integrada, no como una demostración técnica añadida.
- Los proyectos deben presentarse como trabajo editorial, con imágenes amplias, controles mínimos y jerarquía clara.
- La dirección conceptual debe seguir siendo comprensible para un reclutador en pocos segundos.
- La identidad puede inspirarse en una atmósfera electrónica nórdica: superficies cromadas, azul glacial, luz cálida de horizonte y movimiento lento.
- La escultura principal es un cubo negro minimalista con un núcleo vivo. La envolvente debe permanecer geométrica y sobria; la transformación ocurre principalmente en el interior y responde al hover con moderación.
- La reactividad visual debe propagarse con moderación a botones, servicios y proyectos para construir un único lenguaje boutique, no una colección de efectos.
- La inspiración nunca autoriza copiar portadas, marcas, composiciones o activos de terceros; debe traducirse a un sistema original.
- La belleza debe apoyar conversión: propuesta de valor, servicios, inversión inicial, evidencia y contacto deben formar un recorrido continuo.
- El agente UI/UX debe revisar dos recorridos: reclutador que evalúa capacidad y cliente que evalúa confianza, alcance e inversión.

### 9. Agente PM de marca y empleabilidad

Función:

- Mantener el brief del producto y recordar que el objetivo principal es conseguir empleo y oportunidades profesionales.
- Definir prioridades según impacto para reclutadores, responsables de contratación y equipos técnicos.
- Convertir observaciones vagas como “se siente infantil” en problemas verificables de tono, jerarquía, confianza y conversión.
- Coordinar al agente UI/UX, al agente de contenido y al agente técnico mediante objetivos y criterios de aceptación compartidos.
- Proteger una dirección de marca profesional, moderna, elegante, sobria y humana.
- Mantener un backlog priorizado y evitar cambios visuales aislados que no mejoren empleabilidad.
- Solicitar evidencia antes de publicar métricas, seniority, resultados o afirmaciones profesionales.

Principios del producto que debe hacer cumplir:

- La experiencia profesional tiene prioridad sobre la decoración.
- La propuesta de valor debe entenderse en pocos segundos.
- El contenido debe ser concreto, demostrable y fácil de escanear.
- El diseño debe transmitir madurez sin sentirse genérico o corporativo en exceso.
- La interfaz debe funcionar con teclado, movimiento reducido y pantallas pequeñas.
- Ningún agente debe inventar experiencia, resultados, clientes o métricas.

Entregables:

- Brief actualizado con audiencia, problema, propuesta de valor y tono.
- Roadmap y backlog priorizados por impacto y esfuerzo.
- Criterios de aceptación para contenido, UI/UX y desarrollo.
- Registro de decisiones para conservar coherencia entre iteraciones.
- Recomendación de publicar, iterar o descartar cada cambio relevante.

El agente PM no diseña ni implementa por sí solo. Define el problema y valida el resultado; el agente UI/UX propone la experiencia y el agente técnico ejecuta cambios verificables.

## Arquitectura recomendada

```text
GitHub / formulario / tarea programada
                 |
                 v
      Endpoint de evento o webhook
      - verifica firma y esquema
      - registra delivery_id
      - responde rápidamente
                 |
                 v
          Cola de trabajos
                 |
                 v
      PM de marca y empleabilidad
                 |
        Coordinador de agentes
       /       |       |       \
Contenido  Revisión  UI/UX   GitHub
       \       |       |       /
                 v
      Política de aprobación
                 |
                 v
     PR, issue, comentario o reporte
```

Para la capa de agentes, el OpenAI Agents SDK para TypeScript encaja con el stack existente: permite definir agentes con instrucciones, herramientas, guardrails, handoffs y trazas. Los handoffs son útiles cuando un especialista debe asumir la tarea; un agente usado como herramienta conviene cuando el coordinador debe conservar el control del resultado.

## Tecnologías necesarias

### Base recomendada

- `@openai/agents`: coordinación, herramientas tipadas, handoffs, guardrails y tracing.
- OpenAI Responses API: ejecución del modelo y llamadas de herramientas.
- `octokit`: acceso tipado a GitHub REST API y utilidades para GitHub Apps.
- GitHub App: identidad, permisos por instalación, webhooks y tokens de corta duración.
- GitHub Actions: CI, tareas programadas y automatizaciones deterministas.
- Zod: validación de entradas, payloads y argumentos de herramientas.
- PostgreSQL: estado de ejecuciones, aprobaciones, eventos y auditoría.
- Una cola durable: por ejemplo, una cola administrada compatible con el proveedor de despliegue o Redis con un worker separado.
- Observabilidad: tracing del SDK más logs estructurados y métricas de aplicación.

### Cuándo no hace falta un agente

- Ejecutar `pnpm build`, TypeScript, ESLint o pruebas.
- Validar un esquema, una firma o una política de permisos.
- Detectar códigos HTTP rotos.
- Desplegar una versión ya aprobada.

Estas tareas son más seguras, económicas y repetibles como scripts o workflows.

## Datos que deben modelarse

### Catálogo de proyectos

- `slug`, título, descripción breve y descripción extensa.
- Repositorio y demo autorizados.
- Tecnologías, categoría e imágenes.
- Evidencia de resultados y fecha de verificación.
- Estado de publicación y aprobador.

Conviene migrar gradualmente los datos estáticos de `src/data/projects.ts` a un esquema validado. GitHub puede enriquecer el catálogo, pero no debe sobrescribir textos editoriales automáticamente.

### Perfil profesional y diseño

- Roles, seniority, modalidades y mercados objetivo.
- Propuesta de valor principal y llamadas a la acción.
- Experiencia, logros y evidencia autorizada.
- Tokens de diseño y versiones de componentes.
- Reglas de tono, idioma, accesibilidad y movimiento.
- Resultados de Lighthouse, Core Web Vitals y auditorías de accesibilidad.
- Hipótesis de mejora, criterio de éxito y aprobación de cada cambio visual.

Estos datos permiten que el agente UI/UX tome decisiones relacionadas con empleabilidad sin inventar experiencia ni perseguir tendencias sin contexto.

### Eventos de GitHub

- `delivery_id` para deduplicación.
- Tipo y acción del evento.
- Repositorio, instalación, actor y referencias afectadas.
- Hash o ubicación segura del payload original.
- Estado de procesamiento, intentos y error final.

### Ejecuciones de agentes

- ID de ejecución, agente y versión de instrucciones.
- Entrada normalizada y fuente.
- Herramientas llamadas y permisos utilizados.
- Trace ID, duración, tokens y costo estimado.
- Resultado, estado, errores y reintentos.
- Aprobación humana y acción externa resultante.

### Políticas y aprobaciones

- Acciones permitidas por agente y entorno.
- Repositorios y ramas autorizados.
- Límites de costo, frecuencia y duración.
- Reglas que exigen aprobación.
- Identidad del aprobador y fecha de expiración.

### Secretos

- `OPENAI_API_KEY`.
- ID y clave privada de la GitHub App.
- Secreto del webhook.
- Credenciales de base de datos y cola.
- Claves del proveedor de correo y despliegue.

Los secretos deben vivir en el gestor de secretos del entorno, nunca en prompts, logs, base de datos de contenido ni archivos versionados.

## Integración con GitHub

### Permisos iniciales sugeridos

Empezar solo con lectura:

- Metadata: lectura.
- Contents: lectura.
- Pull requests: lectura.
- Issues: lectura.
- Checks o Actions: lectura, únicamente si se analizarán resultados de CI.

Habilitar escritura por capacidad, no de forma global:

- Pull requests: escritura para crear borradores.
- Issues: escritura para crear o clasificar tareas.
- Contents: escritura solo si existe una necesidad demostrada; es preferible crear una rama y un pull request.

### Webhooks iniciales

- `installation` e `installation_repositories`.
- `push` para actualizar actividad autorizada.
- `pull_request` y `pull_request_review`.
- `issues` e `issue_comment` si se automatizará triage.
- `check_run` o `workflow_run` si se resumirá CI.

El receptor debe conservar el cuerpo crudo hasta validar `X-Hub-Signature-256`, usar comparación de tiempo constante, deduplicar por delivery ID y encolar el trabajo antes de ejecutar procesos largos.

## Automatizaciones propuestas

### CI de pull requests

1. Instalar con lockfile congelado.
2. Ejecutar `pnpm exec tsc --noEmit`.
3. Ejecutar ESLint sin interacción.
4. Ejecutar pruebas.
5. Ejecutar `pnpm build` sin omitir errores.
6. Publicar un resumen de checks.

### Revisión semanal

- Comprobar enlaces internos, demos y repositorios.
- Verificar que sitemap y metadata incluyan los proyectos publicados.
- Revisar dependencias y vulnerabilidades.
- Crear un issue consolidado; no abrir múltiples cambios ruidosos.

### Sincronización de proyectos

- Consultar únicamente repositorios permitidos.
- Calcular diferencias contra el catálogo.
- Pedir al agente de contenido un borrador sustentado en datos.
- Crear un pull request marcado como borrador.
- Exigir revisión humana para publicarlo.

### Triage de issues y pull requests

- Aplicar reglas deterministas primero.
- Pedir al agente clasificación, resumen y propuesta de etiquetas.
- Limitar las etiquetas a una lista autorizada.
- Registrar confianza y dejar casos ambiguos sin modificar.

## Controles de seguridad obligatorios

- Principio de privilegio mínimo para GitHub App y herramientas.
- Validación HMAC de webhooks antes de analizar el payload.
- Idempotencia para impedir ejecuciones duplicadas.
- Protección de rama y pull requests en lugar de commits directos.
- Esquemas estrictos en cada herramienta.
- Límites de frecuencia, costo, turnos y tiempo de ejecución.
- Aprobación humana para escritura, publicación, envío y eliminación.
- Sanitización de contenido externo frente a prompt injection.
- Redacción de secretos y datos personales en logs y trazas.
- Pruebas de políticas con eventos simulados antes de producción.

## Plan de implementación

### Fase 0 — Preparación

- Corregir lint, tipos, pruebas y seguridad del formulario.
- Elegir proveedor de despliegue, base de datos, cola y entornos.
- Definir qué repositorios y datos pueden ser públicos.
- Establecer presupuesto y política de aprobación.

### Fase 1 — CI sin agentes

- Crear `.github/workflows/ci.yml`.
- Proteger la rama principal.
- Añadir revisión de enlaces y una tarea programada.
- Medir duración y estabilidad del pipeline.

### Fase 2 — GitHub App en modo lectura

- Registrar una GitHub App privada.
- Configurar permisos y eventos mínimos.
- Implementar el endpoint de webhook, validación, deduplicación y cola.
- Guardar eventos y construir una vista de auditoría.

### Fase 3 — Primer agente

- Implementar solamente el agente de contenido o revisión.
- Exponer herramientas de lectura con Zod.
- Añadir conjuntos de evaluación con casos esperados y adversariales.
- Registrar trazas, latencia, tokens, costo y calidad.

El agente UI/UX puede operar inicialmente en modo auditoría: entrega observaciones y especificaciones, pero no modifica componentes hasta contar con objetivos laborales, guía visual y criterios de aceptación.

### Fase 4 — Escritura controlada

- Permitir que la GitHub App cree una rama y un pull request borrador.
- Incorporar aprobación humana explícita.
- Añadir rollback, límites y suspensión automática.
- Ampliar permisos solo después de observar resultados estables.

### Fase 5 — Orquestación múltiple

- Incorporar el coordinador y especialistas adicionales.
- Definir contratos de handoff y contexto mínimo.
- Evitar que distintos agentes posean permisos redundantes.
- Evaluar si la complejidad adicional mejora métricas reales.

## Recursos adicionales necesarios

- Cuenta y proyecto de OpenAI API con presupuesto y alertas.
- GitHub App privada instalada únicamente en repositorios seleccionados.
- Dominio HTTPS público para recibir webhooks.
- Base de datos PostgreSQL y sistema de migraciones.
- Cola o servicio de jobs que no dependa del ciclo de vida de una función serverless.
- Gestor de secretos por entorno.
- Dataset de evaluación con tareas correctas, ambiguas y maliciosas.
- Política escrita de aprobaciones, retención de datos y respuesta a incidentes.
- Responsable humano del contenido y responsable técnico de permisos.
- Definición de puestos, empresas, mercados e idiomas objetivo.
- CV actualizado y una guía visual mínima para el agente UI/UX.

## Criterio de éxito

La integración estará lista para ampliar autonomía cuando:

- CI sea obligatorio y estable.
- Los eventos sean verificables, idempotentes y auditables.
- El primer agente supere evaluaciones definidas previamente.
- No existan secretos ni datos personales en trazas.
- Los costos y tiempos se mantengan dentro del presupuesto.
- Toda escritura externa pueda atribuirse, revisarse y revertirse.

## Documentación oficial de referencia

- [Agentes en OpenAI Agents SDK](https://openai.github.io/openai-agents-js/guides/agents/)
- [Handoffs en OpenAI Agents SDK](https://openai.github.io/openai-agents-js/guides/handoffs/)
- [Tracing en OpenAI Agents SDK](https://openai.github.io/openai-agents-js/guides/tracing/)
- [Registro de una GitHub App](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app)
- [Autenticación de GitHub Apps](https://docs.github.com/apps/building-github-apps/authentication-options-for-github-apps)
- [Validación de webhooks](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries)
- [Workflows de GitHub Actions](https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows)
