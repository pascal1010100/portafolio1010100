# ADR-0002: pnpm y Node.js 24 como toolchain oficial

- Estado: Aceptado
- Fecha: 2026-06-28
- Actualizado: 2026-10-14

## Contexto

El repositorio mantenía lockfiles de npm y pnpm, lo que permitía resoluciones distintas entre entornos.

## Decisión

Usar exclusivamente pnpm 10 con `pnpm-lock.yaml` y Node.js 24. CI instala con `--frozen-lockfile`.

## Evolución

La decisión original del 28 de junio usaba Node.js 20. La migración a Node.js 24 se integró el 11 de octubre de 2026 en el [PR #15](https://github.com/pascal1010100/portafolio1010100/pull/15), commit `e80e0443d9a36e8969fc77f0259f4b3cc13bbde7`, tras el rechazo de nuevos despliegues con Node.js 20 en Vercel. `package.json`, `.nvmrc` y el workflow de CI ya declaran 24; esta actualización concilia la documentación con esa implementación. Se conserva pnpm 10 y el lockfile existente.

## Consecuencias

- Instalaciones reproducibles.
- `package-lock.json` deja de formar parte del repositorio.
- Los cambios de versión de Node o pnpm requieren una actualización deliberada de este ADR y del pipeline.
