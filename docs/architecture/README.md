# Arquitectura

Pascal.dev adopta inicialmente un monolito modular. Next.js contiene la interfaz pública y los casos de uso actuales; los límites internos deben permitir extraer paquetes o workers solamente cuando aparezca un segundo consumidor real.

## Capas objetivo

```text
src/app              rutas y composición
src/features         casos de uso por dominio
src/domain           entidades, esquemas y reglas
src/content          contenido publicado y procedencia
src/server           adaptadores e infraestructura
src/design-system    tokens y componentes aprobados
src/visuals          experiencias 3D aisladas
scripts              automatización determinista
automation           contratos, políticas y fixtures futuros
docs                 ADRs, producto y runbooks
```

La estructura objetivo se adoptará gradualmente. Fase 0 no mueve el código actual.

## Flujo futuro de automatización

```text
GitHub autorizado
  -> extractor determinista
  -> artefacto normalizado
  -> interpretación futura
  -> aprobación humana
  -> pull request borrador
  -> CI
  -> revisión y publicación
```

## Registros

- `adr/`: decisiones arquitectónicas.
- `AUDIT-2026-06-28.md`: baseline técnico inicial.
- `../operations/ci.md`: operación del pipeline de calidad.
