# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Pascal.dev atiende a dos audiencias con una prioridad explícita:

- **Audiencia primaria:** fundadores, equipos pequeños y negocios que necesitan contratar el diseño y la construcción de un producto o sistema digital.
- **Audiencia secundaria:** reclutadores y equipos que evalúan a Pascal para una oportunidad laboral o colaboración profesional.

Ambas audiencias necesitan entender rápidamente qué sabe construir Pascal, cómo trabaja, qué evidencia respalda su experiencia y cómo iniciar una conversación.

## Product Purpose

Pascal.dev es el portafolio público y producto profesional de Pascal. Existe para demostrar capacidad de ingeniería mediante proyectos, decisiones y evidencia verificable, y para convertir visitas calificadas en conversaciones sobre empleo, colaboraciones o proyectos.

El producto presenta experiencia en producto digital, arquitectura full-stack e IA aplicada. El éxito significa que una persona puede comprender la propuesta profesional, revisar trabajo real y contactar a Pascal con suficiente contexto para evaluar una oportunidad.

## Positioning

Pascal.dev conecta criterio de producto, arquitectura y ejecución técnica en casos reales. No se presenta como una agencia de marketing ni como un currículum estático: muestra cómo una necesidad se convierte en un sistema claro, mantenible, publicado y preparado para evolucionar.

Hoy la marca representa el trabajo de una sola persona. Puede describirse como un estudio de ingeniería de producto liderado por su fundador únicamente cuando el mismo contexto deja claro que Pascal dirige y ejecuta personalmente el trabajo. Su estructura y lenguaje deben permitir una evolución gradual sin afirmar que ya existe un equipo o empresa.

## Operating Context

La experiencia pública permite:

- Entender la propuesta profesional desde la portada.
- Explorar servicios, capacidades, proceso de trabajo y casos de estudio.
- Revisar tecnologías, decisiones, resultados y enlaces disponibles de cada proyecto.
- Acceder a GitHub y LinkedIn o solicitar el CV.
- Preparar una consulta y continuarla en WhatsApp después de revisar el mensaje; el sitio no envía datos automáticamente.

El repositorio utiliza documentación, datos locales y un catálogo de ingeniería versionado para conservar procedencia y separar hechos verificables de futuras interpretaciones automatizadas.

## Capabilities and Constraints

- Portafolio web público construido con Next.js 14, React 18, TypeScript, Tailwind CSS, Radix UI, Framer Motion y un visual 3D aislado con Three.js.
- Casos de estudio, servicios, proceso, capacidades profesionales y contacto mediante WhatsApp.
- Páginas estáticas de proyecto alimentadas por datos locales en `src/data/`.
- Catálogo interno de repositorios autorizados con generación y validación deterministas.
- pnpm 10 y Node.js 20 son el toolchain oficial; no se admite un segundo lockfile.
- Los Server Components son el valor por defecto y el código cliente se reserva para interacción o APIs del navegador.
- Los secretos no se versionan y toda publicación o escritura en servicios externos requiere aprobación humana.
- Pascal Development System es la metodología interna; Pascal Engineering es una posible empresa futura y no debe presentarse como una organización operativa actual.
- La arquitectura de agentes documentada es futura; el producto no debe afirmar que ya existen agentes funcionales.

## Brand Commitments

- El nombre público es Pascal.dev.
- La marca debe representar honestamente a Pascal como profesional independiente en la actualidad y admitir una evolución gradual hacia un estudio.
- La comunicación debe ser precisa, sobria, profesional y basada en evidencia.
- La identidad protegida es tecnológica boutique, contemporánea, minimalista y orientada a ingeniería; no debe parecer una agencia de marketing, un currículum genérico ni una demostración técnica sin propósito.
- El 3D, la profundidad y el movimiento son recursos de marca subordinados al contenido, la accesibilidad y el rendimiento.

## Evidence on Hand

- Casos y resultados documentados en `src/data/projects.ts`, con estados, stacks, responsabilidades, enlaces y evidencia disponible por proyecto.
- Perfil y enlaces profesionales en `src/data/profile.ts`.
- Capturas y activos de proyectos en `public/images/`.
- Propósito, límites y dirección del producto en `README.md`, `docs/product/PROJECT_CHARTER.md` y los ADR de `docs/architecture/adr/`.
- Catálogo autorizado y artefactos verificables en `catalog/`.
- Implementación pública del proceso, servicios, proyectos y contacto en `src/components/sections/`.

Los proyectos publicados, los servicios ofrecidos, la experiencia con IA aplicada y la disponibilidad para oportunidades son afirmaciones reales que deben conservar su respaldo. No hay autorización para inventar testimonios, clientes, métricas, premios, precios cerrados ni resultados que no estén documentados.

## Product Principles

1. Priorizar conversaciones comerciales sin ocultar las rutas secundarias para empleo y colaboración.
2. Demostrar capacidad mediante trabajo y decisiones verificables, no mediante afirmaciones genéricas.
3. Presentar honestamente una práctica individual preparada para evolucionar sin fingir una empresa existente.
4. Convertir interés en una conversación profesional clara y voluntaria.
5. Preferir claridad, mantenibilidad, accesibilidad y evidencia sobre complejidad o decoración.

## Accessibility & Inclusion

La experiencia debe funcionar con teclado, mantener contraste legible, evitar overflow horizontal y respetar `prefers-reduced-motion`. El contenido principal y las acciones críticas deben permanecer disponibles cuando WebGL o las animaciones no estén disponibles.
