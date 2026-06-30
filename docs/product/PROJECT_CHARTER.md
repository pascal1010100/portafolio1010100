# Pascal.dev — Project Charter

## Propósito

Pascal.dev no es únicamente un portafolio. Es un producto público que demuestra capacidad de ingeniería mediante proyectos, decisiones y evidencia verificable.

Existen tres conceptos separados:

- **Pascal.dev:** sitio público y producto activo.
- **Pascal Development System:** metodología interna validada en proyectos reales.
- **Pascal Engineering:** empresa futura que no requiere implementación hoy.

Pascal.dev debe generar confianza, demostrar criterio técnico y convertir visitantes en clientes, colaboraciones u oportunidades profesionales sin parecer una agencia de marketing ni un CV.

## Objetivos simultáneos

- Conseguir empleo y clientes.
- Demostrar criterio técnico, arquitectura y procesos modernos.
- Demostrar integración responsable con IA.
- Convertir visitas calificadas en conversaciones profesionales.
- Crear capacidades reutilizables para futuros productos.
- Validar el PDS mediante proyectos reales antes de extraer nuevas prácticas.
- Mantener alineado lo que Pascal.dev comunica con la evidencia disponible.

## Principios

1. No agregar IA si una regla o script resuelve mejor el problema.
2. Los scripts ejecutan tareas deterministas.
3. Los agentes futuros toman decisiones acotadas cuando existe interpretación.
4. Toda publicación o escritura externa requiere revisión humana.
5. Las afirmaciones profesionales deben estar respaldadas por evidencia.
6. Cada módulo debe tener una responsabilidad clara y contratos explícitos.
7. La documentación forma parte del producto.
8. Cada proyecto debe producir aprendizaje verificable antes de generar una nueva abstracción.
9. Ninguna capacidad se extrae por anticipación: requiere reutilización o necesidad demostrable.

## Modelo operativo

La separación y relación entre Pascal.dev, PDS y Pascal Engineering se define en `docs/product/PASCAL_OPERATING_MODEL.md`.

La base estratégica actual se considera suficiente. Un documento, estándar o sistema nuevo requiere un problema concreto observado en proyectos reales y una expectativa clara de reutilización.

## Dirección visual protegida

La identidad actual debe mantenerse y evolucionar gradualmente: tecnológica boutique, minimalista, elegante, oscura, contemporánea, editorial, espacial, sofisticada y limpia.

La experiencia debe transmitir precisión, calma y confianza. El 3D forma parte del producto, pero nunca debe convertirse en una demostración técnica ni perjudicar contenido, accesibilidad o rendimiento.

No se permiten rediseños radicales, estética gamer, ruido visual ni animaciones sin propósito.

## Experience Engineering

Pascal.dev no diseña componentes aislados: diseña percepción. Cada decisión visual, técnica y de producto debe reforzar la identidad de una empresa moderna de ingeniería de software.

La experiencia pública debe transmitir cinco sensaciones en los primeros segundos:

1. Claridad: el visitante entiende rápidamente qué construimos.
2. Confianza: se perciben criterio técnico, procesos sólidos y profesionalismo.
3. Elegancia: la interfaz se siente premium, minimalista y precisa.
4. Ingeniería: el producto sugiere que detrás existe un sistema serio de desarrollo.
5. Conversión: cada sección acerca al visitante a iniciar una conversación calificada.

Antes de implementar una mejora, debe pasar por este filtro:

- ¿Hace que Pascal.dev demuestre una ingeniería más sólida?
- ¿Mejora la percepción profesional mediante evidencia?
- ¿Reduce complejidad total?
- ¿Resuelve un problema que ya apareció en proyectos reales?
- ¿Puede reutilizarse en varios proyectos?
- ¿Vale la pena mantenerlo durante los próximos tres años?
- ¿Mantiene la estética boutique tecnológica?

Si una mejora solo hace el sitio más bonito pero no mejora la percepción profesional, no es prioritaria.

## Pipeline objetivo

1. Analizar un repositorio autorizado.
2. Extraer README, `package.json`, tecnologías y señales arquitectónicas.
3. Capturar screenshots reproducibles con Playwright.
4. Producir un artefacto normalizado y verificable.
5. Generar un borrador interpretativo en una fase futura.
6. Solicitar aprobación humana.
7. Crear un pull request revisable.
8. Publicar únicamente después de CI y revisión.

## Criterio de decisión

Una capacidad es prioritaria cuando mejora mantenibilidad, evidencia técnica, seguridad, claridad profesional, conversión o reutilización comprobable. Lo visualmente atractivo sin impacto demostrable es secundario.

No se priorizan optimizaciones locales desconectadas ni documentación anticipada. La prioridad es construir, validar, aprender y actualizar el PDS cuando la experiencia lo justifique.
