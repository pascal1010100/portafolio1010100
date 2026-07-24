---
name: Pascal.dev
description: Ingeniería de producto digital presentada con precisión, evidencia y profundidad espacial.
colors:
  graphite-void: "hsl(0 0% 2%)"
  graphite-deep: "#030506"
  carbon-surface: "hsl(0 0% 4%)"
  raised-surface: "hsl(0 0% 7%)"
  muted-surface: "hsl(0 0% 8%)"
  polar-white: "hsl(0 0% 98%)"
  secondary-white: "hsl(0 0% 96%)"
  muted-copy: "hsl(0 0% 62%)"
  structural-line: "hsl(0 0% 14%)"
  polar-cyan: "#ecfeff"
  horizon-cyan: "#cffafe"
  polar-glint: "rgb(207 239 255)"
  ice-structure: "rgb(195 232 255)"
  boutique-blue: "rgb(137 205 255)"
  atmospheric-blue: "rgb(112 170 255)"
  residual-amber: "rgb(255 193 124)"
  destructive: "hsl(0 72% 51%)"
typography:
  display:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.35rem, 5.25vw, 4.65rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  display-compact:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "2.55rem"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  display-short:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(3.75rem, 5.25vw, 4.15rem)"
    fontWeight: 500
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  display-wide:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "4.35rem"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.18em"
  metadata-compact:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.16em"
  metadata:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.2
  calendar-label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.2
rounded:
  sm: "10px"
  md: "12px"
  lg: "14px"
  panel: "16px"
  panel-large: "24px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section-mobile: "80px"
  section-desktop: "144px"
  container-gutter-mobile: "16px"
  container-gutter-desktop: "32px"
components:
  button-primary:
    backgroundColor: "{colors.polar-cyan}"
    textColor: "{colors.graphite-deep}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
    height: "48px"
  button-secondary:
    backgroundColor: "rgb(255 255 255 / 0.025)"
    textColor: "{colors.secondary-white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
    height: "48px"
  input:
    backgroundColor: "rgb(0 0 0 / 0.4)"
    textColor: "{colors.polar-white}"
    typography: "{typography.body}"
    rounded: "{rounded.panel}"
    padding: "12px 16px"
  project-card:
    backgroundColor: "#000000"
    textColor: "{colors.polar-white}"
    rounded: "0px"
  technology-chip:
    backgroundColor: "rgb(255 255 255 / 0.025)"
    textColor: "{colors.muted-copy}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  navigation-active:
    backgroundColor: "rgb(255 255 255 / 0.1)"
    textColor: "{colors.polar-white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
---

# Design System: Pascal.dev

## Overview

**Creative North Star: "El Observatorio de Ingeniería"**

Pascal.dev se comporta como un observatorio técnico: un entorno oscuro y silencioso donde cada proyecto aparece como evidencia bajo una luz precisa. La profundidad espacial, las retículas tenues y el núcleo tridimensional sugieren exploración, pero la estructura editorial mantiene el contenido profesional en primer plano.

El sistema es sobrio y de densidad media-baja. Usa grandes pausas, jerarquías tipográficas contenidas y superficies casi negras separadas por líneas translúcidas. Los acentos fríos funcionan como instrumentos de enfoque; los reflejos cálidos aparecen solo como contrapunto atmosférico. Debe sentirse construido con criterio, nunca decorado por acumulación.

**Key Characteristics:**

- Fondos negros matizados, no negro plano uniforme.
- Tipografía geométrica para jerarquía y sans humanista para lectura.
- Composición asimétrica y editorial con espacio negativo generoso.
- Bordes finos y capas tonales antes que sombras voluminosas.
- Cian polar reservado para acciones, evidencia y estados de atención.
- Movimiento sereno, breve y subordinado al contenido.

## Colors

La paleta combina grafitos casi negros con blancos fríos, cian polar y dos reflejos ambientales de baja intensidad.

### Primary

- **Luz Polar** (`#ecfeff`): acción principal, inversión de contraste y momentos de máxima claridad.
- **Cian de Horizonte** (`#cffafe`): evidencia, indicadores, estados positivos y énfasis secundario.

### Secondary

- **Azul Atmosférico** (`rgb(112 170 255)`): halos, profundidad espacial y luz ambiental; nunca como bloque dominante.
- **Ámbar Residual** (`rgb(255 193 124)`): reflejo cálido mínimo que evita una atmósfera exclusivamente fría.
- **Destello Polar** (`rgb(207 239 255)`): reflejo puntual en barridos, foco y acciones; siempre translúcido.
- **Estructura de Hielo** (`rgb(195 232 255)`): intensificación mínima de bordes interactivos.
- **Azul Boutique** (`rgb(137 205 255)`): luz localizada en filas editoriales durante hover.

### Neutral

- **Vacío Grafito** (`hsl(0 0% 2%)`): fondo estructural del producto.
- **Negro Orbital** (`#030506`): base del hero y degradados espaciales.
- **Carbono Profundo** (`hsl(0 0% 4%)`): tarjetas, popovers y superficies contenidas.
- **Superficie Elevada** (`hsl(0 0% 7%)`): separación tonal para estados y controles.
- **Superficie Silenciosa** (`hsl(0 0% 8%)`): fondos muted y zonas de baja prioridad.
- **Blanco Polar** (`hsl(0 0% 98%)`): titulares, acciones primarias y texto de máxima prioridad.
- **Blanco Secundario** (`hsl(0 0% 96%)`): contenido destacado sin competir con titulares.
- **Texto Atenuado** (`hsl(0 0% 62%)`): descripciones y metadatos.
- **Línea Estructural** (`hsl(0 0% 14%)`): bordes, divisores y campos.

**The Polar Signal Rule.** El cian debe ocupar una fracción pequeña de cada pantalla. Su rareza le da significado.

**The Tinted Black Rule.** Las superficies oscuras se distinguen mediante matices, gradientes y transparencia; no mediante una colección de negros arbitrarios.

## Typography

**Display Font:** Space Grotesk (con `system-ui`, sans-serif)

**Body Font:** Inter (con `system-ui`, sans-serif)

**Label/Mono Font:** Space Grotesk (con `monospace` como fallback cuando cumple una función técnica)

**Character:** Space Grotesk aporta precisión geométrica y tensión editorial a los encabezados. Inter mantiene lectura clara y neutral en descripciones, formularios y contenido extenso.

### Hierarchy

- **Display** (500, `clamp(2.35rem, 5.25vw, 4.65rem)`, `0.98`): titular principal; usa pasos compactos y amplios según el viewport, con tracking limitado a `-0.04em`.
- **Headline** (500, `clamp(1.875rem, 4vw, 3rem)`, `1.05`): encabezados de sección con tracking `-0.04em`.
- **Title** (500, `1.5rem`, `1.25`): títulos de casos, servicios y bloques de contenido.
- **Body** (400, `1rem`, `1.75`): lectura explicativa; normalmente limitada a contenedores de `max-w-2xl` o `max-w-3xl`.
- **Label** (500, `0.75rem`, tracking `0.16em–0.18em`, uppercase cuando numera secciones): categorías, estados y metadatos.
- **Metadata** (500, `0.625rem–0.6875rem`, `1.2`): evidencia y chips secundarios; se reserva para texto breve con contraste AA.

**The Compressed Horizon Rule.** Los titulares grandes usan interlineado y tracking negativos; el cuerpo recupera aire mediante line-height amplio.

## Layout

El contenido vive dentro de un contenedor máximo de `80rem` (`max-w-7xl`) con gutters de `16px`, `24px` y `32px` según breakpoint. Las secciones principales usan entre `80px` y `144px` de espacio vertical y se separan con líneas de baja opacidad.

La portada usa una composición asimétrica de dos columnas: contenido a la izquierda y una escena tridimensional que se superpone parcialmente desde la derecha. Las secciones editoriales alternan listas de ancho completo, cuadrículas de doce columnas y divisiones `0.85fr / 1.15fr`. En móvil, estas estructuras se convierten en una sola columna y el 3D deja de competir con la lectura.

El ritmo base se construye con múltiplos de `4px`, usando `8px`, `16px`, `24px` y `32px` como intervalos recurrentes. La densidad es contenida: cada sección tiene un gesto dominante y suficiente espacio negativo para separar evidencia, explicación y acción.

## Elevation & Depth

El sistema es tonal y plano por defecto. La profundidad surge de fondos translúcidos, halos radiales, blur ambiental, bordes internos y superposición espacial. Las sombras aparecen en navegación flotante, paneles premium y estados interactivos, siempre difusas y oscuras; no simulan tarjetas materiales elevadas.

### Shadow Vocabulary

- **Panel Ambiental** (`inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 80px rgba(0,0,0,0.28)`): paneles premium y superficies que necesitan separación sin perder sobriedad.
- **Panel Profundo** (`inset 0 1px 0 rgba(255,255,255,0.035), 0 28px 90px rgba(0,0,0,0.25)`): tarjetas de proyecto sobre el fondo principal.
- **Acción Polar** (`inset 0 1px 0 rgba(255,255,255,0.42), 0 0 32px rgba(207,239,255,0.1)`): únicamente durante hover o foco de una acción destacada.

**The Flat Observatory Rule.** Las superficies permanecen planas en reposo; la luz y la profundidad aumentan solo para comunicar jerarquía o interacción.

## Shapes

La forma dominante es geométrica y contenida. Los grandes paneles editoriales suelen conservar esquinas rectas, mientras que campos y paneles internos usan radios de `14px`, `16px` o `24px`. Las acciones y chips adoptan forma de cápsula (`9999px`) para distinguir controles interactivos de superficies de contenido.

Los bordes son de un píxel y baja opacidad, normalmente `white/10` o `white/15`. El símbolo de marca combina un cuadrado redondeado con un rombo interior; esta tensión entre marco ortogonal y núcleo rotado también informa el visual 3D.

## Components

### Buttons

- **Shape:** cápsula para acciones públicas; radio medio para primitivas internas.
- **Primary:** Luz Polar sobre texto casi negro, padding aproximado de `14px 24px` y altura táctil cercana a `48px`.
- **Hover / Focus:** aclara hacia blanco, muestra un reflejo líquido horizontal y conserva un ring visible de alto contraste.
- **Secondary / Ghost:** fondo blanco al `2.5%`, borde blanco al `15–20%` y texto frío; puede invertir a Luz Polar en hover.

### Chips

- **Style:** cápsulas compactas, borde `white/10`, fondo `white/2.5%` y texto secundario.
- **State:** sirven para tecnología, categoría o estado; no deben parecer acciones primarias.

### Cards / Containers

- **Corner Style:** los paneles principales de proyecto son rectos; metadatos y contenedores secundarios usan `16–24px`.
- **Background:** negro, Carbono Profundo o blanco con opacidad entre `1.2%` y `5%`.
- **Shadow Strategy:** capas tonales en reposo; sombra ambiental solo cuando la separación la requiere.
- **Border:** línea blanca al `5–10%`, intensificada con Cian de Horizonte en hover.
- **Internal Padding:** `24–32px` en contenido principal; `12–16px` en metadatos.

### Inputs / Fields

- **Style:** fondo negro al `40%`, borde blanco al `10%`, radio de `16px` y padding de `12–16px`.
- **Focus:** borde blanco al `30%` y ring blanco al `20%`; siempre visible sin depender únicamente del color.
- **Error / Disabled:** el token destructivo se reserva para errores; estados deshabilitados reducen opacidad y bloquean interacción.

### Navigation

La cabecera es fija y translúcida, con blur amplio y borde inferior fino. Los enlaces usan cápsulas discretas; la sección activa recibe fondo blanco al `10%`. Al hacer scroll, la cabecera aumenta opacidad y profundidad. En móvil se convierte en una lista vertical de controles amplios.

### Section Header

Combina una etiqueta numerada en uppercase, un titular Space Grotesk compacto y una descripción Inter de línea amplia. Es la principal herramienta para mantener ritmo editorial y orientación dentro de una página larga.

### Project Card

La tarjeta de proyecto trata la imagen como evidencia principal. Usa una retícula asimétrica, imagen desaturada que recupera presencia en hover, metadatos compactos y enlaces secundarios. La tarjeta completa evita convertirse en una colección de subtarjetas.

### Spatial Scene

El objeto 3D es una firma de marca, no un fondo genérico. Se carga bajo demanda, permanece aislado del contenido y debe degradar sin impedir lectura, navegación o conversión.

## Do's and Don'ts

### Do:

- **Do** usar Luz Polar y Cian de Horizonte para acciones, evidencia y estados con intención.
- **Do** mantener un gesto visual dominante por sección y espacio negativo alrededor.
- **Do** sostener la jerarquía con escala, alineación y contraste antes de añadir contenedores.
- **Do** usar bordes finos, capas tonales y halos ambientales para construir profundidad.
- **Do** conservar `prefers-reduced-motion` y una experiencia completa sin WebGL.
- **Do** presentar proyectos mediante problema, decisiones, ejecución y evidencia verificable.

### Don't:

- **Don't** introducir estética gamer, terminales decorativas, neón saturado o efectos cyberpunk heredados.
- **Don't** convertir cada bloque en una tarjeta ni anidar tarjetas sin una función informativa.
- **Don't** usar cian como relleno dominante; debe funcionar como señal escasa.
- **Don't** añadir animaciones elásticas, rebotes o movimiento que compita con la lectura.
- **Don't** reemplazar la evidencia real con métricas, testimonios o afirmaciones inventadas.
- **Don't** permitir que el 3D, los glows o el blur reduzcan contraste, rendimiento o accesibilidad.
