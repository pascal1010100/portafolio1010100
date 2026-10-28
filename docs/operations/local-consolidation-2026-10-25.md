# Consolidación local — 25 octubre 2026

## Directorio de continuidad

`/Users/usuario/proyectos/portafolio1010100-main` es el directorio para continuar esta versión consolidada. La rama existente es `feat/portfolio-technical-state-collector`, con base `96b1b52`; la consolidación sigue sin commit. No representa el estado actual de main remoto ni de producción.

## Decisiones de integración

- Se conservan los cambios locales recientes de navegación, marca PascalMark, portada cinematográfica, portada social, footer, shell y archivo editorial de proyectos. Los datos profesionales y comerciales no se modificaron.
- Se recuperan `SpatialScene.tsx` y `SpatialSceneIsland.tsx` de `/Users/usuario/worktrees/pascal-company-os-reference`, también basado en `96b1b52`.
- La escena recuperada conserva cubo hueco con vigas biseladas blanco/cian, pedestal, iluminación, reflejo artístico, oscilación y respuesta al cursor.
- El hero tiene columnas independientes en escritorio y escena debajo del texto en móvil/tableta. Se retira la implementación alternativa `HeroCube.tsx` del código activo; su original está respaldado.
- Se conservan carga diferida, pausa manual, suspensión fuera del viewport o con documento oculto, movimiento reducido y fallback sin WebGL. El fallback usa el símbolo PascalMark reciente.
- Se restaura Hiring en navegación de escritorio y el estado accesible del contacto activo. Las pruebas se actualizan para los nombres y estructura actuales del archivo y se recuperan las pruebas de movimiento y composición de la escena.

## Preservación

El checkout de referencia permanece intacto. Los archivos modificados y no versionados de ambos directorios, incluidas sus evidencias locales, quedaron archivados antes de editar:

- `.local-backups/consolidation-2026-10-25/recent.tar.gz`
- `.local-backups/consolidation-2026-10-25/reference.tar.gz`
- Listados de estado anteriores junto a cada archivo.

Estos respaldos se excluyen de Git y tienen otra copia en `/private/tmp/pascal-consolidation-2026-10-25`. No contienen `.env`, dependencias ni `.git`. Los activos y documentos exclusivos de la ronda anterior que no participan en la web actual permanecen en el checkout de referencia y su respaldo; no se reemplaza la portada social reciente por una anterior.

## Límites

No se migra Node, no se cambian dependencias ni lockfile. Las comprobaciones usan Node 20.20.2 y pnpm 10.18.2, conforme al contrato de este checkout. La conciliación con Node 24 y los cambios remotos documentados en Notion sigue pendiente y requiere su propio alcance.

No se hicieron push, PR, merge, deploy ni escrituras en Notion. La revisión estética del fundador sigue pendiente. Antes de publicar hay que conciliar el contenido de Nativa y la rama remota actual; este trabajo no verifica esas afirmaciones comerciales.

## Validación

- TypeScript y ESLint: correctos; únicamente aviso de deprecación de `next lint`.
- Datos: seis proyectos correctos; catálogo: tres repositorios, esquema v1 correcto.
- Build de producción: correcto, 14 páginas generadas.
- Playwright contra el build de producción: **32/32**, en Chromium con dos workers (1,4 min). Incluye contacto interceptado sin enviar mensajes, teclado, móvil/tableta, búsqueda, contratación, evidencia, 404, WebGL/fallback, pausa y movimiento reducido.
- Primera pasada contra desarrollo: 25/32. Detectó expectativas antiguas del archivo, selectores ambiguos tras compartir footer, Hiring ausente en escritorio, contacto sin aria-current y un timeout de prueba con tres navegaciones. Se corrigieron navegación y selectores; la prueba de composición pasó sin aumentar su timeout en producción.
- Inspección visual del build: escritorio 1440 px, móvil 390 px y tableta 768 px; cubo presente y texto separado. No se observaron errores de consola en la revisión final. No constituye una auditoría WCAG o Lighthouse completa.
- Detector Impeccable sobre hero/isla/escena: sin hallazgos; `git diff --check` correcto. Revisión de React: composición servidor conservada, escena dinámica cliente, efectos con limpieza y render bajo demanda al pausar.
- Capturas de producción preservadas en `.local-backups/consolidation-2026-10-25/evidence/desktop.png` y `mobile.png` (esta última es de página completa).

## Abrir o reiniciar

La versión consolidada queda sirviéndose solo en este Mac en `http://127.0.0.1:3211/`, mediante el build verificado, no mediante un despliegue público.

Desde el directorio de continuidad, activar Node 20 y usar pnpm 10.18.2:

```sh
corepack pnpm start --hostname 127.0.0.1 --port 3211
```

Si se edita código después, detener ese servidor, ejecutar `corepack pnpm build` y volver a iniciarlo; para desarrollo interactivo usar `corepack pnpm dev --hostname 127.0.0.1 --port 3211` con el puerto libre.

## Revisión de cierre — 28 octubre 2026

### Dictamen

La consolidación pasa la validación técnica local bajo su contrato actual de Node 20. No está lista para publicación: requiere conciliación con main remoto, conservación de la corrección profesional de Nativa y revisión visual humana. Esta revisión no modifica código de aplicación ni integra ramas.

### Qué cambió y qué sigue abierto

- HEAD continúa en `96b1b52affff5a21455d6a4cec534786d1acadf2`, rama `feat/portfolio-technical-state-collector`. Antes de actualizar este registro había 15 archivos versionados modificados y seis archivos nuevos, sin staging ni conflictos de Git.
- El diff respecto de HEAD reúne marca PascalMark compartida; navegación y footer reutilizados por ProjectShell; portada con fondo raster y columnas independientes; recuperación de la escena 3D; archivo editorial con búsqueda y limpieza; y adaptación de pruebas. No cambia dependencias, lockfile ni datos profesionales.
- Los seis archivos nuevos son PascalMark, el fondo de portada, este registro y tres críticas históricas. Marca e imagen son dependencias reales de la aplicación y deben incluirse en la entrega. Las críticas son antecedentes, no validación actual.
- No existe un snapshot versionado del resultado final del 25 de octubre que permita demostrar igualdad exacta con esa fecha. Los respaldos `recent` y `reference` son anteriores a la integración. La coincidencia de alcance y HEAD no sustituye una comparación por contenido.

### Diferencia remota comprobada

Consulta de solo lectura mediante el conector GitHub. `gh` no pudo completar la consulta desde este entorno; el conector sí permitió verificar main y sus archivos.

- Main observado: [`0deb5a353c0a0754f0f05bd474329a5234e39b98`](https://github.com/pascal1010100/portafolio1010100/commit/0deb5a353c0a0754f0f05bd474329a5234e39b98).
- Comparación fijada entre ese SHA y HEAD local: ramas divergentes; cinco commits exclusivos de main y uno exclusivo del HEAD local. No se consultó el estado del despliegue público.
- Los cambios remotos afectan 12 archivos: plantilla de tareas, CI, `.nvmrc`, AGENTS, PRODUCT, README, ADR-0002, runbook CI, package.json, datos de proyectos y dos archivos de pruebas.
- **[P1, exactitud profesional] Nativa:** main ya conserva una demo en `nativa-gamma.vercel.app`, distingue el cierre del encargo original y limita la verificación pública a catálogo/carrito/checkout sin enviar pedidos. El checkout local aún afirma operación en dominio propio, cantidades y resultados anteriores. No debe publicarse ese contenido antiguo por accidente. La revisión actual verifica el cambio documental remoto, no vuelve a certificar la demo ni sus operaciones.
- **[Bloqueo de integración] Node:** main adoptó Node 24 y actualizó ADR, CI y documentación; este checkout y las instrucciones de la sesión mantienen Node 20. No se migró el entorno ni se cambiaron esas instrucciones durante esta revisión. La integración debe resolver el contrato de forma explícita y validar el resultado con la versión acordada.
- `tests/e2e/projects.spec.ts` tiene cambios locales y remotos: debe conciliarse manualmente para conservar el archivo editorial y el destino actualizado de Nativa. `project-evidence.spec.ts` remoto contiene expectativas nuevas para la demo y sus límites.

### Validación actual

- Node `20.20.2`, pnpm `10.18.2`, dependencias existentes; sin reinstalación ni cambios de lockfile. La terminal inició con Node 24 y se seleccionó Node 20 solo para los checks del checkout actual.
- Tipos, ESLint, seis proyectos, esquema del catálogo de tres repositorios y build de 14 páginas: correctos. Persiste el aviso de deprecación de `next lint`, sin errores de lint.
- `pnpm check` llegó correctamente hasta build; el inicio del servidor de pruebas falló por restricción del entorno (`listen EPERM`). Se repitió únicamente Playwright con permisos para servidor local y dos workers: **32/32 correctas, 32,1 s**.
- Contacto probado con interceptación, sin enviar mensajes. Escena, pausa, movimiento reducido, visibilidad simulada, fallback sin WebGL, teclado, búsqueda, Hiring y responsive cubiertos por la suite existente.
- Revisión adicional de `/`, `/projects`, `/projects/nativa-market` y `/hiring`: HTTP 200, sin errores JavaScript de página ni overflow horizontal en escritorio. Se comprobó el menú a 390 px y la geometría visible del símbolo fallback sin WebGL.
- Detector estático Impeccable sobre header, footer, hero, isla, archivo y escena: `[]`; `git diff --check`: correcto. Esto no certifica WCAG, contraste completo, rendimiento ni Core Web Vitals.
- Evidencia adicional en `.local-backups/consolidation-2026-10-28/evidence/`; las capturas `consolidated-desktop.png` y `consolidated-mobile.png` de Playwright permanecen en `test-results/`. Estos directorios están excluidos de Git. La primera captura adicional de home se tomó durante carga diferida; usar la captura de Playwright para revisar el cubo ya cargado.

### Hallazgos secundarios

- **[P2, accesibilidad] Página activa en menú móvil:** `#mobile-navigation` no contiene `aria-current`, incluso en `/projects`; escritorio sí señala Work. Recuperar el estado activo en los enlaces móviles de Work/Hiring y de las secciones de portada/contacto. Verificado por código y navegador.
- **[P2, cobertura] Las 32 pruebas no comprueban ese estado activo móvil.** Añadir una regresión al corregirlo. Su resultado verde no demuestra ausencia de otros problemas de accesibilidad.
- **[P3, documentación] PRODUCT local aún declara Next 14 / React 18.** Main ya lo corrige a Next 15 / React 19. DESIGN describe superposición parcial de la escena, mientras la consolidación protege columnas independientes. Alinear los documentos existentes al cerrar la integración.
- **Fuera del cierre visual:** las críticas previas señalan evidencia tardía en casos móviles; la plantilla de detalle mantiene ese orden y no fue rediseñada por esta consolidación. Se conserva como mejora posterior, sin atribuirla a una regresión nueva.

### Orden concreto para terminar

1. Preservar el diff y los archivos nuevos de la consolidación antes de conciliar ramas. Conservar el commit del recolector local.
2. Integrar la base remota verificada sin perder la escena, marca ni navegación locales. Conservar la corrección de Nativa y sus pruebas; resolver el solapamiento de `projects.spec.ts`.
3. Resolver explícitamente el contrato Node 20/24 conforme a las instrucciones vigentes y la decisión ya registrada en main; alinear todos los archivos afectados.
4. Corregir la indicación activa del menú móvil y añadir su prueba; actualizar las descripciones desfasadas de los documentos existentes.
5. Ejecutar nuevamente instalación reproducible y `pnpm check` sobre el resultado integrado, usando su toolchain. Las pruebas de este registro validan solo el checkout local previo a esa integración.
6. Revisar visualmente escritorio/móvil y cerrar un commit local con los activos requeridos. Publicación, PR, merge y despliegue siguen sujetos a aprobación humana.

No se hicieron commit, fetch, pull, push, PR, merge, deploy ni escrituras en servicios externos. Se dejó una vista local del build revisado en `http://127.0.0.1:3212/`; ese build debe renovarse si se cambia código.
