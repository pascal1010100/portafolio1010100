# AGENTS — Instrucciones operativas

Este archivo define cómo deben trabajar personas y asistentes sobre Pascal.dev. La visión de producto vive en `docs/product/PROJECT_CHARTER.md`; las decisiones técnicas de largo plazo viven en `docs/architecture/adr/`.

## Misión

Pascal.dev es una plataforma profesional cuyo primer consumidor es el portafolio público. Debe ayudar a conseguir empleo y clientes, demostrar criterio técnico y documentar una metodología moderna de desarrollo asistido por IA.

La dirección visual actual se conserva: tecnológica boutique, oscura, minimalista, editorial, espacial y sobria. No introducir estéticas gamer, terminales decorativas ni efectos sin una función de producto.

## Contrato técnico actual

- Next.js 14 con App Router y React 18.
- TypeScript estricto.
- Tailwind CSS y componentes Radix/shadcn.
- Framer Motion para movimiento de interfaz.
- Three.js y React Three Fiber para el visual 3D aislado.
- Zod y Resend para el formulario de contacto.
- pnpm 10 y Node.js 20 como toolchain oficial.

## Comandos oficiales

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm typecheck
pnpm lint
pnpm build
pnpm check
```

No usar npm ni generar un segundo lockfile.

## Antes de modificar código

1. Leer `README.md` y `docs/product/PROJECT_CHARTER.md`.
2. Revisar los ADRs relacionados.
3. Inspeccionar la implementación existente y el estado de Git.
4. Explicar cualquier cambio arquitectónico grande antes de implementarlo.
5. Documentar deuda técnica antes de iniciar una migración amplia.

## Límites arquitectónicos

- `src/app/` contiene rutas y composición, no lógica de dominio reutilizable.
- Los Server Components son el valor por defecto. Usar `"use client"` solo para estado, efectos, eventos o APIs del navegador.
- `src/components/ui/` es un catálogo curado, no un lugar para acumular componentes sin uso.
- Los datos publicados deben tener esquema, evidencia y procedencia antes de automatizarse.
- El 3D se mantiene aislado, cargado bajo demanda y sujeto a presupuestos de rendimiento y accesibilidad.
- Las variables de entorno se documentan en `.env.example`; los secretos nunca se versionan.

## Automatización y agentes

- Scripts: extracción, validación, screenshots, checks y transformaciones deterministas.
- Workflows: orquestación reproducible, permisos y artefactos.
- Agentes futuros: clasificación, síntesis y redacción cuando exista interpretación.
- Aprobación humana: obligatoria antes de publicar, enviar, fusionar, borrar o escribir en servicios externos.

No implementar agentes funcionales todavía. `AGENTES.md` describe una arquitectura futura, no capacidades existentes.

## Calidad mínima

Todo cambio debe mantener:

- TypeScript, ESLint y build en verde.
- Accesibilidad por teclado, contraste y movimiento reducido.
- Responsive sin overflow horizontal.
- Evidencia para afirmaciones profesionales o comerciales.
- Ninguna escritura externa automática sin aprobación.

## Prioridad ante conflictos

1. Seguridad y privacidad.
2. Evidencia y exactitud profesional.
3. Mantenibilidad y claridad arquitectónica.
4. Rendimiento y accesibilidad.
5. Conversión profesional/comercial.
6. Decoración visual.
