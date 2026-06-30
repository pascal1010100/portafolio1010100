# Experience Engineering — Pascal.dev

Experience Engineering es el filtro de producto para Pascal.dev. Su función no es hacer que la interfaz se vea más decorada, sino que la experiencia pública transmita claridad, confianza, elegancia, ingeniería y conversión.

La pregunta central antes de cada cambio es:

> ¿Esto hace que Pascal.dev se perciba más como una empresa boutique de ingeniería de software moderna, confiable y precisa?

## Sensaciones que debe transmitir

### Claridad

El visitante debe entender rápidamente qué construimos, para quién y con qué nivel de criterio.

Señales deseadas:

- Hero con una propuesta de valor inmediata.
- CTAs visibles sin depender de exploración excesiva.
- Copy concreto: producto, UI/UX, ingeniería full-stack, AI y sistemas digitales.
- Secciones con una idea dominante, no varias compitiendo.

### Confianza

La experiencia debe sugerir proceso, consistencia y responsabilidad técnica.

Señales deseadas:

- Proyectos con rol, estado, evidencia y enlaces verificables.
- Mensajes de contacto con expectativas claras.
- CI, validación de datos y checks documentados.
- Claims profesionales respaldados por contexto o evidencia.

### Elegancia

La interfaz debe sentirse premium, sobria y editorial.

Señales deseadas:

- Oscuridad profunda, contraste claro y acentos fríos controlados.
- Mucho espacio negativo.
- Animaciones lentas, intencionales y calmadas.
- Un gesto visual fuerte por sección.

### Ingeniería

El sitio debe dar la impresión de que detrás hay un sistema serio de desarrollo, no solo una landing bonita.

Señales deseadas:

- Datos estructurados y validados.
- Componentes con responsabilidad clara.
- 3D aislado, accesible y subordinado al mensaje.
- Documentación viva de decisiones visuales, técnicas y operativas.

### Conversión

Cada sección debe acercar al visitante a una conversación calificada.

Señales deseadas:

- CTAs visibles y redactados como invitación profesional.
- Servicios y forma de colaboración entendibles.
- Fricción baja para contacto.
- Señales de disponibilidad, rango de proyecto y tiempo de respuesta.

## Reglas visuales protegidas

- Mantener estética tecnológica boutique: oscura, minimalista, editorial, espacial y sobria.
- Usar 3D como refuerzo de marca, no como protagonista absoluto.
- Evitar estilos gamer, neón excesivo, terminales decorativas o ruido visual.
- Evitar microinteracciones que solo “se ven cool” si no mejoran claridad, confianza o conversión.
- Evitar rediseños radicales sin diagnóstico y aprobación.
- Priorizar legibilidad y jerarquía sobre espectáculo.

## Reglas para el hero

El hero debe ganar los primeros 15 segundos.

El contenido es protagonista. La escena 3D puede cruzar, envolver o acompañar la composición, pero no debe ocultar la propuesta de valor ni desplazar los CTAs fuera del primer viewport en desktop y tablet.

Checklist:

- El H1 explica el valor sin depender de scroll.
- Los CTAs principales son visibles en desktop y tablet.
- En móvil, los CTAs aparecen antes de que la escena 3D tome espacio dominante.
- No existe overflow horizontal.
- El cubo refuerza percepción de ingeniería y precisión, no compite con el copy.

## Reglas para proyectos

Los proyectos no son tarjetas decorativas; son evidencia profesional.

Cada proyecto publicado debe tener:

- Contexto del problema.
- Rol de Pascal.
- Estado del proyecto.
- Evidencia mínima verificable.
- Retos, soluciones y resultados.
- Imagen pública existente.
- Enlaces válidos cuando existan.

La validación determinística de datos debe fallar si falta una señal básica de confianza.

## Reglas para movimiento e interacción

El movimiento debe sentirse como precisión, no como ansiedad.

Usar animación cuando:

- Aclara jerarquía.
- Refuerza profundidad o marca.
- Da feedback útil.
- Mejora percepción de calidad.

Evitar animación cuando:

- Atrae más atención que el contenido.
- Dificulta lectura.
- Rompe `prefers-reduced-motion`.
- Genera comportamiento inconsistente en móvil.

## Checklist antes de implementar UI

Antes de tocar una sección, responder:

1. ¿Mejora claridad en los primeros segundos?
2. ¿Hace que el visitante confíe más?
3. ¿Reduce ruido visual?
4. ¿Explica mejor qué construimos o cómo trabajamos?
5. ¿Refuerza la estética boutique tecnológica?
6. ¿Mantiene CTAs y rutas de conversión visibles?
7. ¿Funciona en desktop, tablet y móvil sin overflow?
8. ¿Respeta accesibilidad, contraste y movimiento reducido?
9. ¿Puede validarse con TypeScript, lint, build o un script determinístico?

Si la respuesta principal es “se ve más bonito”, pero no mejora percepción profesional, la mejora no pertenece al bloque actual.

## Anti-patrones

- Agregar efectos para compensar copy débil.
- Resolver falta de evidencia con más estética.
- Publicar proyectos sin procedencia mínima.
- Usar el 3D como demo técnica en lugar de marca.
- Convertir la página en dashboard, terminal o showcase gamer.
- Hacer cambios visuales grandes sin comparar desktop, tablet y móvil.

## Relación con calidad técnica

Experience Engineering no reemplaza TypeScript, lint, build, CI ni validaciones. Los convierte en parte de la percepción pública.

Una empresa confiable no solo se ve refinada: también demuestra que sus datos, flujos y publicaciones pasan por controles reproducibles.
