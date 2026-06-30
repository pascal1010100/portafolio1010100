# ADR-0005: Separación entre producto, metodología y empresa

- Estado: Aceptado
- Fecha: 2026-06-30

## Contexto

Pascal.dev comenzó como portafolio y evolucionó hacia un producto público de ingeniería. Durante esa evolución aparecieron dos conceptos relacionados: el Pascal Development System y Pascal Engineering.

Tratarlos como tres productos o tres sistemas que deben implementarse al mismo tiempo produciría planificación excesiva, documentación anticipada y abstracciones sin validación práctica.

## Decisión

Separar sus responsabilidades:

1. **Pascal.dev** es el sitio público y el único producto activo en este repositorio.
2. **Pascal Development System** es la metodología interna aplicada y refinada mediante proyectos reales.
3. **Pascal Engineering** es la empresa futura; no requiere implementación en la etapa actual.

Pascal.dev muestra evidencia. El PDS guía el trabajo. Pascal Engineering representa la organización que puede surgir y operar sobre esa base.

Se congela la creación anticipada de documentación estratégica. Nuevos ADRs, estándares, runbooks, automatizaciones o skills necesitan un problema observado y un consumidor real. Los documentos existentes se actualizan cuando cambian decisiones que ya gobiernan el sistema.

Esta decisión no modifica ADR-0001: el repositorio continúa como monolito modular y no se extraen plataformas o paquetes sin reutilización comprobada.

## Consecuencias

### Positivas

- Pascal.dev conserva foco como producto vivo.
- El PDS evoluciona desde experiencia práctica y no desde teoría.
- Pascal Engineering no genera trabajo de implementación prematuro.
- Disminuye el riesgo de burocracia y arquitectura especulativa.

### Costos

- Algunas prácticas permanecerán implícitas hasta demostrar repetición suficiente.
- Será necesario distinguir entre una decisión duradera y una solución local.
- La reutilización puede ocurrir más tarde, a cambio de basarse en evidencia real.

### Riesgos

- Documentar demasiado tarde una decisión crítica. Se mitiga manteniendo ADRs para decisiones costosas de revertir.
- Repetir problemas sin capturar el aprendizaje. Se mitiga revisando los proyectos al cierre y actualizando el PDS cuando aparezca un patrón.

## Referencias

- `docs/product/PASCAL_OPERATING_MODEL.md`
- `docs/product/PROJECT_CHARTER.md`
- `docs/architecture/adr/0001-modular-monolith.md`
- `docs/architecture/adr/0003-automation-boundaries.md`
