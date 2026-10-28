# Estado técnico del portafolio (ejecución manual)

Desde cualquier directorio:

```sh
node /Users/usuario/proyectos/portafolio1010100-main/scripts/collect-technical-state.mjs
```

Pruebas con datos ficticios, sin red ni cambios de Git:

```sh
node --test /Users/usuario/proyectos/portafolio1010100-main/scripts/collect-technical-state.test.mjs
```

Requiere Git y `gh` ya autenticado para la parte remota. El contrato oficial del repositorio es Node.js 24.x (`package.json`, `.nvmrc`, AGENTS y runbook CI), conforme al ADR-0002. La revisión original del recolector comprobó pruebas y ejecución real con Node 20.20.2 y 22.23.1; esas versiones son evidencia histórica, no el toolchain actual. No instala nada ni lee `.env`.

El script usa el directorio padre de `scripts/`, exige que sea raíz Git y que un remoto corresponda a `pascal1010100/portafolio1010100`. No recorre catálogos ni otros proyectos. Solo stdout JSON v1; diagnósticos seguros por stderr. Fechas ISO 8601 en UTC (`Z`), campo timezone explícito. `historical: null`: no reutiliza resultados anteriores como observaciones actuales.

Git: lectura con GIT_OPTIONAL_LOCKS=0 y overrides por proceso de fsmonitor/hooks, sin cambios de configuración. HEAD separado produce rama/upstream null y conserva SHA. Upstream ausente se detecta con una consulta for-each-ref exitosa vacía; errores reales de Git se registran, no se convierten en ausencia. Un repositorio sin HEAD resoluble produce fallo local explícito. Cuenta porcelain v1 con NUL y archivos nuevos individuales; consume la segunda ruta de renombres/copias. Staged/unstaged y categorías added/modified/etc. pueden solaparse. `clean` no cubre archivos ignorados ni prueba backups.

GitHub: solo `gh api --method GET`, autenticación existente. Se fijan SHAs: `default_head...local_head`; ahead/behind son del HEAD local. Fallos dejan campos desconocidos (`null`), errores seguros y resultado local disponible; 404 no implica pérdida de commits. Respuestas crudas y mensajes de subprocess no se imprimen. Remotos GitHub canónicos sin usuario, contraseña, query/fragmento; remotos no reconocidos se omiten como null y generan aviso.

Exit codes: 0 recogida completa; 1 errores con estado local disponible; 2 fallo local/identidad inválida. Incluso ante esos fallos se emite JSON. Si gh no existe o no está autorizado, no se instala ni inicia login. Sin fetch, pull, escrituras, builds o despliegues.

Los archivos nuevos de esta implementación aparecerán como cambios no versionados hasta una decisión posterior; el recolector no los oculta. El script no conecta con Notion, no escribe informes en disco y no programa automatizaciones. El registro de esta entrega en Notion es una acción separada y autorizada del agente.
