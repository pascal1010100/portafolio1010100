# ADR-0001: Monolito modular como arquitectura inicial

- Estado: Aceptado
- Fecha: 2026-06-28

## Contexto

Pascal.dev debe evolucionar hacia capacidades reutilizables, pero actualmente solo existe un consumidor y no hay contratos de dominio estabilizados.

## Decisión

Mantener una sola aplicación Next.js y crear límites modulares internos. No adoptar monorepo, microservicios ni workers separados hasta que exista un segundo consumidor o una necesidad operativa verificable.

## Consecuencias

- Menor complejidad de despliegue y desarrollo.
- Los límites deben expresarse mediante módulos, esquemas y adaptadores.
- La extracción futura se basará en evidencia de reutilización, no en anticipación.
