# ADR-0003: Límites entre scripts, workflows, agentes y aprobación humana

- Estado: Aceptado
- Fecha: 2026-06-28

## Contexto

La plataforma futura analizará repositorios, generará documentación y propondrá actualizaciones. Mezclar extracción determinista con decisiones de modelos impediría auditar resultados.

## Decisión

- Scripts producen artefactos deterministas y verificables.
- Workflows coordinan permisos, ejecución y conservación de artefactos.
- Agentes futuros reciben artefactos normalizados y producen borradores.
- Una persona aprueba cualquier publicación o escritura externa.

## Consecuencias

- Cada etapa puede probarse de forma independiente.
- La procedencia de datos debe conservarse.
- No se implementarán agentes hasta tener CI estable, contratos y datasets de evaluación.
