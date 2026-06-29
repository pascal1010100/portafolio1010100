# ADR-0002: pnpm y Node.js 20 como toolchain oficial

- Estado: Aceptado
- Fecha: 2026-06-28

## Contexto

El repositorio mantenía lockfiles de npm y pnpm, lo que permitía resoluciones distintas entre entornos.

## Decisión

Usar exclusivamente pnpm 10 con `pnpm-lock.yaml` y Node.js 20. CI instala con `--frozen-lockfile`.

## Consecuencias

- Instalaciones reproducibles.
- `package-lock.json` deja de formar parte del repositorio.
- Los cambios de versión de Node o pnpm requieren una actualización deliberada de este ADR y del pipeline.
