# ADR-0004: Server Components por defecto

- Estado: Propuesto
- Fecha: 2026-06-28

## Contexto

La homepage actual contiene numerosos límites de cliente aunque buena parte de su contenido es estático. Esto aumenta JavaScript, hidratación y acoplamiento con animaciones.

## Decisión propuesta

Mantener rutas, contenido y composición como Server Components. Aislar en componentes cliente únicamente estado, eventos, efectos, formularios y APIs del navegador.

## Consecuencias

- Menos JavaScript cliente y mejores límites.
- Framer Motion y React Three Fiber requieren islas explícitas.
- La migración será gradual y pertenece a Fase 2.
