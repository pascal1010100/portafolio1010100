# Pascal Operating Model

- Estado: Activo
- Última revisión: 2026-06-30

## Propósito

Este documento distingue Pascal.dev, el Pascal Development System y Pascal Engineering para evitar que producto, metodología y empresa se mezclen o se construyan por anticipación.

La prioridad actual es construir, validar y aprender. La documentación debe registrar experiencia práctica, no sustituirla.

## 1. Pascal.dev

Pascal.dev es el producto público.

Su objetivo es generar confianza, demostrar capacidad técnica y convertir visitantes en clientes, colaboraciones u oportunidades profesionales mediante evidencia verificable.

Pascal.dev:

- Presenta proyectos, decisiones, resultados y forma de trabajo.
- Demuestra calidad mediante su propia implementación.
- Hace visible parte del método sin convertirse en documentación interna.
- No es la empresa ni la metodología completa.
- No debe parecer una agencia de marketing ni un CV.

## 2. Pascal Development System

El Pascal Development System, o PDS, es la metodología interna usada para construir software.

Incluye las prácticas y artefactos que ya demostraron utilidad: instrucciones operativas, arquitectura, ADRs, estándares, skills, automatización, CI/CD y procesos de validación.

El PDS:

- Existe para construir productos mejores y con menos ambigüedad.
- Evoluciona a partir de problemas encontrados en proyectos reales.
- No es un producto público ni una plataforma independiente.
- No se mide por cantidad de documentos, sino por calidad y reutilización de sus prácticas.

## 3. Pascal Engineering

Pascal Engineering es la empresa que podrá utilizar el PDS para construir productos y mostrar su trabajo mediante Pascal.dev.

No necesita una implementación propia en la etapa actual. Su identidad se fortalece cuando existe correspondencia entre lo que Pascal.dev comunica y lo que los proyectos demuestran.

## Relación entre los tres conceptos

```text
Proyecto real
  -> trabajo guiado por el PDS
  -> validación y aprendizaje
  -> mejora práctica del PDS cuando existe repetición
  -> evidencia pública en Pascal.dev
  -> confianza y oportunidades para Pascal Engineering
```

No existen tres roadmaps simultáneos. Pascal.dev es el producto activo, el PDS se valida dentro de proyectos y Pascal Engineering permanece como la organización futura.

## Regla de evolución

Antes de crear una abstracción, documento, estándar o sistema se responde:

1. ¿Qué problema concreto resuelve?
2. ¿Ese problema ya apareció en un proyecto real?
3. ¿La solución será reutilizable en varios proyectos?
4. ¿Reduce complejidad total o la aumenta?

Si las respuestas no son claras, no se introduce todavía.

## Política documental

La base estratégica actual se considera suficiente: README, instrucciones operativas, Project Charter, Operating Model y ADRs principales.

Se congela la creación anticipada de nuevos documentos estratégicos. Un documento nuevo requiere un disparador observable:

- Un ADR registra una decisión costosa de revertir.
- Un estándar aparece cuando una solución se repite y necesita consistencia.
- Un runbook aparece cuando existe una operación recurrente.
- Una automatización aparece cuando el proceso manual ya es estable.
- Un skill aparece cuando un procedimiento especializado puede reutilizarse y evaluarse.

La ausencia de un documento nuevo no elimina la obligación de actualizar los documentos existentes cuando una decisión cambia sus contratos.

## Prioridades actuales

1. Convertir Pascal.dev en una referencia de ingeniería de producto.
2. Mejorar los casos de estudio hasta que demuestren contexto, decisiones, ejecución y resultados.
3. Aplicar el PDS en proyectos reales y observar dónde reduce o añade fricción.
4. Incorporar al PDS únicamente las prácticas que demuestren utilidad repetida.
5. Reducir deuda técnica cuando debilite calidad, seguridad, rendimiento o mantenibilidad.

## Flujo de trabajo

1. Construir una mejora vinculada a un problema real.
2. Validarla en el producto o proyecto afectado.
3. Observar resultados y fricción.
4. Documentar el aprendizaje si cambia una decisión duradera o se repite.
5. Reutilizar solo después de comprobar valor.

## Límites actuales

- Se mantiene un monolito modular mientras Pascal.dev sea el único consumidor de software.
- No se crea un monorepo, plataforma separada o sistema de agentes por anticipación.
- No se construye una implementación específica para Pascal Engineering.
- No se publica ni escribe en servicios externos sin aprobación humana.
- Seguridad, privacidad, evidencia y exactitud profesional tienen prioridad.
