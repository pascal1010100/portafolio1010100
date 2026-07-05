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
3. `pnpm validate:data`
4. `pnpm build`
5. `pnpm test:e2e`

Las pruebas end-to-end usan Playwright con Chromium y cubren navegación pública, archivo y detalle de proyectos, responsive básico, contrato del endpoint de contacto y envío simulado del formulario. La suite nunca envía correos reales.

Para ejecutarlas localmente:

```bash
pnpm exec playwright install chromium
pnpm build
pnpm test:e2e
```

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
