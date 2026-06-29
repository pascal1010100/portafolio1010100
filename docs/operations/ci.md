# Runbook de CI

## Objetivo

Cada pull request y cada push a `main` deben demostrar instalación reproducible, tipos válidos, lint limpio y build de producción exitoso.

## Entorno

- Node.js 20.
- pnpm definido en `package.json`.
- Instalación con `pnpm install --frozen-lockfile`.

## Checks actuales

1. `pnpm typecheck`
2. `pnpm lint`
3. `pnpm build`

Las pruebas automatizadas se incorporarán en Fase 1. Hasta entonces, CI no debe afirmar que ejecuta tests.

## Política recomendada en GitHub

- Proteger `main`.
- Exigir el job `quality` antes de merge.
- Impedir push forzado y eliminación de la rama.
- Requerir revisión humana para cambios de aplicación y workflows.

## Fallos

1. Reproducir con la misma versión de Node y pnpm.
2. Ejecutar los checks individualmente.
3. Corregir la causa; no desactivar tipos o lint.
4. Documentar fallos recurrentes como deuda o ADR.
