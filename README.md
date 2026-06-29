# Pascal.dev — Plataforma profesional y portafolio

Este repositorio contiene el portafolio profesional de Pascal. Su objetivo principal es ayudarle a conseguir empleo, clientes, proyectos y oportunidades de colaboración mostrando con claridad su experiencia, criterio y capacidad para construir productos digitales. También funciona como una plataforma comercial: debe transformar visitas calificadas en conversaciones, propuestas y proyectos sostenibles.

El sitio debe sentirse profesional, elegante, moderno y confiable. Cada decisión de contenido, interfaz o automatización debe reforzar esa percepción ante reclutadores, responsables de contratación, equipos técnicos y clientes potenciales. No es únicamente una vitrina estática: la evolución prevista lo convierte gradualmente en una plataforma verificable, automatizada y asistida por agentes sin perder su propósito laboral.

## Objetivo profesional y criterio visual

El portafolio debe:

- Explicar en pocos segundos quién es Pascal, qué sabe hacer y qué valor puede aportar.
- Facilitar que un reclutador encuentre proyectos, tecnologías, experiencia y formas de contacto.
- Demostrar criterio de producto y calidad técnica, no solamente enumerar herramientas.
- Mantener una estética elegante y contemporánea sin sacrificar legibilidad ni credibilidad.
- Proyectar el nivel visual de una empresa tecnológica boutique: oscuro, espacial, preciso y moderno.
- Utilizar 3D, profundidad, luz y movimiento como recursos de marca, nunca como decoración infantil o gamer.
- Mantener una composición minimalista y editorial: un gesto visual dominante por sección, mucho espacio negativo y controles mínimos.
- Presentar proyectos y capacidades como una landing conceptual de tecnología, no como un dashboard de tarjetas repetidas.
- Utilizar una atmósfera digital nórdica: cromo frío, luz de horizonte y movimiento sereno, sin copiar identidades visuales externas.
- Usar un cubo negro conceptual como símbolo principal: una envolvente geométrica, precisa y sobria contiene un núcleo que cambia de forma con fluidez y reacciona al cursor.
- Extender ese comportamiento al sistema completo mediante reflejos, gradientes espectrales y microinteracciones coherentes en servicios, proyectos y llamadas a la acción.
- Comunicar servicios, formas de colaboración, inversión inicial y siguiente paso sin ambigüedad.
- Funcionar correctamente en móvil y escritorio, con buena accesibilidad y rendimiento.
- Usar animaciones y efectos visuales con intención; nunca deben competir con el contenido.
- Respetar `prefers-reduced-motion` y ofrecer una composición estable cuando la animación esté limitada o WebGL no esté disponible.
- Evitar textos genéricos, afirmaciones sin evidencia y complejidad visual innecesaria.

Toda propuesta automatizada debe evaluarse con una pregunta sencilla: **¿hace que Pascal resulte más claro, competente y atractivo para una oportunidad profesional o comercial?**

## Qué comunica el portafolio

- Perfil profesional y propuesta de valor.
- Tecnologías y áreas de especialización.
- Casos de estudio con contexto, retos, soluciones y resultados.
- Enlaces a demostraciones y repositorios.
- Un canal de contacto para nuevas oportunidades y proyectos.

## Estado actual

El sitio está construido con:

- Next.js 14 y React 18.
- TypeScript.
- Tailwind CSS y componentes basados en Radix UI.
- Framer Motion para animaciones.
- Three.js y React Three Fiber para la experiencia espacial 3D de la portada.
- Resend para el formulario de contacto.
- Datos locales en `src/data/` para perfil, habilidades y proyectos.

La aplicación usa App Router, genera páginas estáticas para los proyectos y expone un endpoint de contacto en `src/app/api/contact/route.ts`.

## Baseline arquitectónico

- El repositorio se mantiene inicialmente como monolito modular.
- pnpm 10 y Node.js 20 forman el toolchain oficial.
- TypeScript, ESLint y build son checks obligatorios de CI.
- Scripts, workflows, agentes futuros y aprobación humana tienen responsabilidades separadas.
- La evolución se registra mediante ADRs y una auditoría técnica versionada.

Documentación principal:

- [Project Charter](./docs/product/PROJECT_CHARTER.md)
- [Arquitectura](./docs/architecture/README.md)
- [ADRs](./docs/architecture/adr/)
- [Auditoría inicial](./docs/architecture/AUDIT-2026-06-28.md)
- [Runbook de CI](./docs/operations/ci.md)
- [Instrucciones operativas](./AGENTS.md)
- [Arquitectura futura de agentes](./AGENTES.md)

## Ejecución local

Requisitos:

- Node.js 20.
- pnpm 10, según la versión declarada en `package.json`.

```bash
pnpm install
pnpm dev
```

La aplicación estará disponible normalmente en `http://localhost:3000`.

Comandos principales:

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm typecheck
pnpm check
```

ESLint y TypeScript forman parte obligatoria del build y del workflow de CI.

## Variables de entorno

El formulario de contacto utiliza estas variables:

```dotenv
RESEND_API_KEY=
FROM_EMAIL=
CONTACT_TO=
NEXT_PUBLIC_SITE_URL=
```

No deben almacenarse secretos reales en el repositorio. Las variables se configuran en el entorno local y en el proveedor de despliegue.

## Cómo evoluciona el proyecto

### Etapa 1 — Portafolio confiable

- Configurar ESLint y activar la validación de tipos durante el build.
- Añadir pruebas mínimas para navegación, páginas de proyectos y formulario.
- Proteger el endpoint de contacto con límites de frecuencia, validación de tamaño y medidas antispam.
- Corregir enlaces y completar activos públicos, incluido el CV.
- Añadir un workflow de CI que ejecute instalación reproducible, tipos, lint, pruebas y build.
- Definir una guía visual y editorial orientada a la búsqueda de empleo.
- Probar la jerarquía de información con recorridos de reclutador en móvil y escritorio.

### Etapa 2 — Integración con GitHub

- Convertir GitHub en la fuente verificable de actividad técnica.
- Sincronizar proyectos seleccionados, lenguajes, temas, enlaces y fechas de actualización.
- Mostrar el estado de build o despliegue cuando aporte contexto al caso de estudio.
- Utilizar una GitHub App con permisos mínimos para integraciones permanentes; evitar tokens personales de larga duración.
- Recibir webhooks firmados para reaccionar a cambios de repositorios, issues y pull requests.

### Etapa 3 — Automatización editorial y técnica

- Detectar enlaces rotos, datos desactualizados y proyectos sin descripción suficiente.
- Crear borradores de actualización mediante pull requests, nunca cambios directos sobre la rama protegida.
- Resumir actividad relevante y proponer actualizaciones de casos de estudio.
- Automatizar etiquetado, validación de contenido, auditorías de dependencias y revisiones programadas.

### Etapa 4 — Agentes especializados

- Incorporar un coordinador que clasifique cada tarea y delegue en especialistas.
- Dar a cada agente herramientas y permisos limitados a su función.
- Mantener trazas, métricas, presupuestos y un registro de auditoría por ejecución.
- Exigir aprobación humana para publicar contenido, abrir cambios sensibles o realizar operaciones externas.
- Incorporar un agente UI/UX que proteja el objetivo profesional y revise coherencia, claridad, accesibilidad y presentación visual.

Los agentes propuestos, sus límites y la arquitectura necesaria se describen en [AGENTES.md](./AGENTES.md). Es un diseño futuro; no existen agentes funcionales en la aplicación actual.

## Principios de evolución

1. Automatizar con scripts y workflows todo lo determinista.
2. Usar agentes únicamente cuando la tarea requiere interpretación o síntesis.
3. Aplicar privilegio mínimo y aprobación humana a cualquier escritura externa.
4. Mantener los datos públicos separados de secretos, contactos privados y credenciales.
5. Medir calidad, costo, latencia y tasa de éxito antes de ampliar autonomía.
6. Priorizar la claridad profesional y la conversión de visitas en conversaciones laborales.

## Estructura principal

```text
src/app/                 Rutas, páginas, metadata y API
src/components/          Componentes y secciones visuales
src/data/                Perfil, habilidades y proyectos
src/lib/                 Utilidades compartidas
public/                  Imágenes y activos públicos
.github/workflows/       CI reproducible
docs/                    Charter, arquitectura, ADRs y runbooks
```

## Referencias para la evolución

- [OpenAI Agents SDK para JavaScript](https://openai.github.io/openai-agents-js/)
- [GitHub Apps](https://docs.github.com/en/apps/creating-github-apps)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Validación de entregas de webhooks](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries)
