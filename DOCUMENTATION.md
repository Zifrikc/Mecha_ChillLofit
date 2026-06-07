# Documentación del Proyecto: MechaUI · Relaxing Travel

## Tabla de Contenidos

1. [Visión General](#1-visión-general)
2. [Arquitectura del Sistema](#2-arquitectura-del-sistema)
3. [Inventario de Assets](#3-inventario-de-assets)
4. [Especificaciones Técnicas](#4-especificaciones-técnicas)
5. [Diseño de UI](#5-diseño-de-ui)
6. [Sistema de Audio](#6-sistema-de-audio)
7. [Sistema de Cámara](#7-sistema-de-cámara)
8. [Efectos Visuales](#8-efectos-visuales)
9. [Fases de Implementación](#9-fases-de-implementación)
10. [Rendimiento y Optimización](#10-rendimiento-y-optimización)
11. [Flujo de Datos](#11-flujo-de-datos)

---

## 1. Visión General

### 1.1 Descripción

Aplicación web que presenta una experiencia inmersiva 3D donde un **mecha robótico** camina automáticamente hacia el frente en un **bosque atmosférico** con niebla volumétrica. El usuario puede interactuar mediante controles de audio (música chill, relax, sonidos de lluvia) y un selector de modo de cámara.

### 1.2 Objetivos

- Crear una experiencia visual profesional con Three.js
- Proporcionar una UI minimalista y elegante con glassmorphism
- Ofrecer 3 pistas de audio con crossfade suave
- Implementar 3 modos de cámara seleccionables
- Lograr un rendimiento fluido (60fps en hardware moderno)

### 1.3 Stack Tecnológico

| Tecnología | Versión | Rol |
|---|---|---|
| Vite | 5.x | Dev server + build |
| React | 18.3+ | UI framework |
| TypeScript | 5.4+ | Tipado estático |
| Three.js | 0.162+ | Motor 3D |
| @react-three/fiber | 8.15+ | React ↔ Three.js binding |
| @react-three/drei | 9.88+ | Helpers: useGLTF, useAnimations, Sky, Environment |
| @react-three/postprocessing | 2.16+ | Bloom, ColorGrading, Vignette |
| TailwindCSS | 3.4+ | Estilos utilitarios |
| Framer Motion | 11+ | Animaciones de UI |
| Howler.js | 2.2+ | Audio cross-browser |
| Zustand | 4.5+ | Estado global |

---

## 2. Arquitectura del Sistema

### 2.1 Árbol de Componentes

```
<App>
  ├── <Layout>                          ← Posiciona Scene + UI overlay
  │   ├── <SceneContainer>              ← Canvas R3F
  │   │   ├── <Lighting />              ← Luces + FogExp2
  │   │   ├── <CameraController />      ← 3 modos de cámara
  │   │   ├── <MechaModel />            ← GLB + walk animation
  │   │   ├── <ForestEnvironment />     ← Árboles sakura + suelo
  │   │   ├── <Particles />             ← Luciérnagas
  │   │   └── <Skybox />                ← Cubemap/equirectangular
  │   └── <UIOverlay>                   ← Capa HTML superpuesta
  │       ├── <Header />                ← Título del proyecto
  │       ├── <AudioControls />         ← 3 botones de audio
  │       ├── <VolumeSlider />          ← Control de volumen
  │       ├── <CameraToggle />          ← Selector de modo cámara
  │       └── <LoadingScreen />         ← Pantalla de carga
```

### 2.2 Flujo de Datos

```
Zustand Store (useAppStore)
├── audio: { activeTrack, volume, isPlaying }
├── camera: { mode: 'fixed' | 'orbit' | 'subtle' }
└── loading: { progress, isLoaded }

Componentes que consumen:
├── AudioControls    → lee: activeTrack, isPlaying  |  escribe: setTrack()
├── VolumeSlider     → lee: volume                   |  escribe: setVolume()
├── CameraToggle     → lee: mode                     |  escribe: setCameraMode()
├── CameraController → lee: mode                     |  (usa useFrame)
├── LoadingScreen    → lee: progress, isLoaded
└── useAudioManager  → lee: activeTrack, volume      |  (controla Howler)
```

### 2.3 Flujo de Inicialización

```
1. App monta → LoadingScreen visible
2. SceneContainer monta Canvas R3F
3. useGLTF carga mecha.glb (dispara progreso en store)
4. Texturas de skybox, árboles y suelo cargan en paralelo
5. Cuando todo cargado → isLoaded = true
6. LoadingScreen fade out
7. MechaModel: play walk animation loop
8. Sistema de audio listo para interactuar
9. UI overlay fade in con Framer Motion
```

---

## 3. Inventario de Assets

### 3.1 Modelos 3D

| Archivo | Formato | Tamaño | Animaciones | Ubicación |
|---|---|---|---|---|
| `mecha_character_xt-3478_cyber_by_oscar_creativo.glb` | GLB | ~71 MB | Walk (incluida) | `Models/` |
| `scene.gltf` + `scene.bin` | GLTF | — | — | `Models/sakura_trees/` |
| `Material.001_baseColor.jpeg` | JPEG (skybox) | — | — | `Models/red_riding_hood_-_forest_skybox3/textures/` |
| `Material.001_baseColor.jpeg` | JPEG (skybox) | — | — | `Models/red_riding_hood_-_forest_skybox/textures/` |

### 3.2 Texturas de Suelo

| Archivo | Formato | Ubicación |
|---|---|---|
| `floor_13_baseColor.png` | PNG | `Models/grass_pine_forest_-_2_free_textures_handpaint/textures/` |
| `floor_19_baseColor.png` | PNG | `Models/grass_pine_forest_-_2_free_textures_handpaint/textures/` |

### 3.3 Texturas de Árboles Sakura

| Archivo | Formato | Ubicación |
|---|---|---|
| `mossybark02_0Mat_baseColor.png` | PNG | `Models/sakura_trees/textures/` |
| `sakura_branch_new01_1Mat_baseColor.png` | PNG | `Models/sakura_trees/textures/` |

### 3.4 Audio

| Archivo | Descripción | Formato | Duración aprox. | Ubicación |
|---|---|---|---|---|
| `clavier-music-night-city-rain-lofi-chill-216563.mp3` | Lo-fi chill (piano + lluvia) | MP3 | ~3-5 min | `Sounds/` |
| `chill-music-smeraldelion-morning-rain-535803.mp3` | Chill con lluvia matutina | MP3 | ~3-5 min | `Sounds/` |
| `chill-music-smeraldelion-the-rain-is-dancing-523904.mp3` | Chill suave | MP3 | ~3-5 min | `Sounds/` |
| `liecio-calming-rain-257596.mp3` | Lluvia realista | MP3 | loop | `Sounds/` |
| `pisadas Mecha.mp3` | SFX pisadas metálicas | MP3 | ~1-2 seg | `Sounds/` |

### 3.5 Mapeo de Assets a Componentes

| Componente | Assets que usa |
|---|---|
| `MechaModel` | `mecha_*.glb` |
| `ForestEnvironment` | `scene.gltf` (árboles sakura), `floor_*.png` (suelo) |
| `Skybox` | `Material.001_baseColor.jpeg` (skybox1 o skybox3) |
| `AudioControls` | `clavier-music-*.mp3` (chill), `chill-music-smeraldelion-morning-rain-*.mp3` (relax), `liecio-calming-rain-*.mp3` (rain) |

---

## 4. Especificaciones Técnicas

### 4.1 Renderizado 3D

| Parámetro | Valor |
|---|---|
| Renderer | WebGLRenderer |
| Antialiasing | activado (MSAA) |
| Shadows | PCFsoft |
| Tonemapping | ACESFilmic |
| Output Color Space | sRGB |
| Pixel Ratio | limitado a 2 (performance) |
| FOV | 45° |
| Near / Far | 0.1 / 100 |
| Background | none (scene background se asigna desde skybox) |

### 4.2 Configuración de Cámara

| Modo | Posición | LookAt | Movimiento |
|---|---|---|---|
| **Fixed** | `[0, 1.5, 4.5]` | `[0, 0.5, 0]` | Ninguno |
| **Slow Orbit** | Radio 5, altura 1.8 | `[0, 0.5, 0]` | Seno/coseno en plano XZ, ~30s por ciclo |
| **Subtle Movement** | `[0, 1.5, 4.5]` + micro-offset | `[0, 0.5, 0]` | Perlin noise suave en Y y rotación |

### 4.3 Niebla Volumétrica

| Parámetro | Valor |
|---|---|
| Tipo | `THREE.FogExp2` |
| Color | `#c8d4e0` (gris azulado pálido) |
| Densidad | `0.035` (ajustable) |
| Efecto visual | Árboles lejanos se difuminan gradualmente |

### 4.4 Iluminación

| Luz | Tipo | Color | Intensidad | Posición |
|---|---|---|---|---|
| Sol | Directional | `#fff4e6` | 1.2 | `[10, 15, 5]` |
| Ambiente | Ambient | `#404060` | 0.3 | — |
| Cielo | Hemisphere | `#87ceeb` (cielo) / `#3a2a1a` (suelo) | 0.4 | — |

### 4.5 Post-Processing

| Efecto | Intensidad | Propósito |
|---|---|---|
| Bloom | 0.3 | Brillo sutil en zonas iluminadas |
| ColorGrading | lookup table | Look cinematográfico frío/cálido |
| Vignette | 0.2 | Oscurecimiento de bordes |

---

## 5. Diseño de UI

### 5.1 Especificaciones de Glassmorphism

```css
.glass-panel {
  background: rgba(10, 10, 15, 0.5);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.glass-button {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 12px 20px;
  transition: all 0.3s ease;
}

.glass-button.active {
  background: rgba(124, 58, 237, 0.15);
  border-color: rgba(124, 58, 237, 0.4);
  box-shadow: 0 0 20px rgba(124, 58, 237, 0.2);
}

.glass-button:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: scale(1.03);
}
```

### 5.2 Paleta de Colores

| Variable | Color | Uso |
|---|---|---|
| `--bg-primary` | `#0a0a0f` | Fondo general |
| `--bg-glass` | `rgba(10,10,15,0.5)` | Paneles glassmorphism |
| `--accent-cyan` | `#00f0ff` | Acento tecnológico |
| `--accent-violet` | `#7c3aed` | Acento principal |
| `--accent-violet-glow` | `rgba(124,58,237,0.4)` | Glow de botón activo |
| `--text-primary` | `#f0f0f5` | Texto principal |
| `--text-muted` | `rgba(240,240,245,0.6)` | Texto secundario |
| `--border-glass` | `rgba(255,255,255,0.08)` | Bordes de paneles |

### 5.3 Tipografía

| Elemento | Fuente | Peso | Tamaño |
|---|---|---|---|
| Título | Inter | 700 | 1.5rem |
| Botones | Inter | 500 | 0.9rem |
| Texto UI | Inter | 400 | 0.85rem |
| Alternativa | JetBrains Mono | — | (si se necesita) |

### 5.4 Estados de Botones de Audio

| Estado | Opacidad | Borde | Glow | Escala | Indicador |
|---|---|---|---|---|---|
| **Inactivo** | 0.5 | `rgba(255,255,255,0.06)` | No | 1.0 | — |
| **Hover** | 0.8 | `rgba(255,255,255,0.15)` | Sutil | 1.03 | — |
| **Reproduciendo** | 1.0 | `rgba(124,58,237,0.5)` | Pulsante | 1.0 | Ondas animadas |
| **Disabled (cargando)** | 0.3 | — | No | 1.0 | Spinner |

### 5.5 Layout de UI

```
┌──────────────────────────────────────────────────────────┐
│  [Header]                     ╔══════════════════════╗    │
│  🌲 MechaUI · Relaxing Travel ║  🎥 Cámara: Orbit ▾ ║    │
│                               ╚══════════════════════╝    │
│                                                           │
│                                                           │
│                    ░░░ ESCENA 3D ░░░                      │
│                    🤖 Mecha caminando                     │
│                    🌳 Bosque con niebla                   │
│                    ✨ Luciérnagas                          │
│                                                           │
│                                                           │
│  ┌─────────────────────────────────────────────────┐     │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐      │     │
│  │  │ 🎵 Chill │  │ 🎵 Relax │  │ 🌧 Rain  │  🔊  │     │
│  │  └──────────┘  └──────────┘  └──────────┘  ═══○ │     │
│  └─────────────────────────────────────────────────┘     │
│                                                           │
│  [LoadingScreen: solo visible mientras carga]             │
└──────────────────────────────────────────────────────────┘
```

---

## 6. Sistema de Audio

### 6.1 Mapeo de Botones a Pistas

| Botón | Archivo | Descripción | Loop |
|---|---|---|---|
| **Chill** | `clavier-music-night-city-rain-lofi-chill-216563.mp3` | Lo-fi chill con piano y lluvia suave de fondo | Sí |
| **Relax** | `chill-music-smeraldelion-morning-rain-535803.mp3` | Ambient relajante con lluvia matutina | Sí |
| **Rain** | `liecio-calming-rain-257596.mp3` | Sonido de lluvia realista de alta calidad | Sí |

### 6.2 Especificaciones de Audio

| Parámetro | Valor |
|---|---|
| Formato | MP3 (los archivos existentes ya están en MP3) |
| Tasa de muestreo | 44100 Hz (recomendado) |
| Bitrate | 128-320 kbps |
| Crossfade | 800ms (GainNode fade in/out) |
| Volumen por defecto | 0.6 (60%) |
| Rango de volumen | 0.0 — 1.0 (slider lineal) |
| Transición | Fade out del track actual → Fade in del nuevo |

### 6.3 Comportamiento

- Solo un track activo a la vez
- Click en botón activo → detiene el track (toggle)
- Click en botón inactivo → crossfade hacia ese track
- Cambiar a un tercer track → crossfade desde el actual
- Slider de volumen afecta al master gain
- Crossfade de 800ms para transición suave

### 6.4 SFX de Pisadas (Opcional)

El archivo `pisadas Mecha.mp3` puede integrarse como SFX rítmico sincronizado con la animación walk del mecha. Cada ciclo de paso (left/right) reproduce un hit. Esto requiere:
- Analizar la duración del ciclo de walk en la animación
- Calcular el BPM de las pisadas
- Usar `Howler` con `seek()` para disparar en cada paso

---

## 7. Sistema de Cámara

### 7.1 Modos

#### Modo Fixed
```
Posición: [0, 1.5, 4.5]
LookAt:   [0, 0.5, 0]
Comportamiento: Totalmente estática
```

#### Modo Slow Orbit
```
Radio:    5 unidades
Altura:   1.8 unidades
LookAt:   [0, 0.5, 0]
Duración: ~30 segundos por ciclo completo
Fórmula:
  x = radio * sin(time * velocidad)
  z = radio * cos(time * velocidad)
  y = lerp(1.2, 2.2, sin(time * velocidadMedia))
```

#### Modo Subtle Movement
```
Posición base: [0, 1.5, 4.5]
Offset máximo: ±0.05 en X, ±0.03 en Y
Rotación:      ±0.005 rad en Euler
Ruido:         Perlin noise 3D (o función senoidal compuesta)
               para simular respiración de cámara
```

### 7.2 Implementación Técnica

```typescript
// CameraController.tsx — pseudo-código
switch (mode) {
  case 'fixed':
    camera.position.lerp(new Vector3(0, 1.5, 4.5), 0.05);
    break;
  case 'orbit':
    const angle = clock.elapsedTime * 0.2;
    camera.position.x = 5 * Math.sin(angle);
    camera.position.z = 5 * Math.cos(angle);
    camera.position.y = 1.8 + 0.5 * Math.sin(angle * 0.5);
    break;
  case 'subtle':
    const nx = noise(clock.elapsedTime * 0.5, 0, 0) * 0.05;
    const ny = noise(clock.elapsedTime * 0.5, 1, 0) * 0.03;
    camera.position.x = 0 + nx;
    camera.position.y = 1.5 + ny;
    camera.position.z = 4.5;
    break;
}
camera.lookAt(0, 0.5, 0);
```

### 7.3 Transiciones

- Cambio entre modos usa lerp suave (0.05 de factor) para evitar saltos bruscos
- Almacenar posición anterior y hacer interpolación lineal

---

## 8. Efectos Visuales

### 8.1 Niebla Volumétrica (FogExp2)

```
Renderer: THREE.FogExp2
Color:    #c8d4e0 (gris-azulado pálido)
Densidad: 0.035

Ecuación:
  fogFactor = e^(-distancia * densidad)^2
  colorFinal = mix(colorOriginal, colorNiebla, fogFactor)
```

### 8.2 Partículas (Luciérnagas)

| Parámetro | Valor |
|---|---|
| Cantidad | ~200 puntos |
| Material | PointsMaterial con map de textura circular |
| Color | `#a8ff60` (verde lima) con opacidad 0.6 |
| Tamaño | 0.08 - 0.15 unidades (variado) |
| Movimiento | Sinusoidal lento en patrón aleatorio |
| Blending | Additive |
| Transparencia | Sí, con alphaMap |

### 8.3 Post-Processing Stack

Orden de aplicación (efectos acumulativos):
1. **Bloom** — Selector de luminancia, threshold 0.8, strength 0.3, radius 0.5
2. **ColorGrading** — LUT o ajuste de tono para look fresco/atmosférico
3. **Vignette** — Offset 0.3, darkness 0.5

### 8.4 Árboles Sakura

- Cargar modelo GLTF desde `Models/sakura_trees/scene.gltf`
- Instanciar 10-15 árboles en posiciones aleatorias alrededor del mecha
- Escala variada entre 0.8 y 1.5
- Rotación aleatoria en Y
- Distribución en radio de 8-20 unidades desde el centro

---

## 9. Fases de Implementación

### Fase 0: Preparación del Entorno

| # | Tarea | Dependencias | Tiempo |
|---|---|---|---|
| 0.1 | Crear proyecto Vite + React + TypeScript | — | 10 min |
| 0.2 | Instalar dependencias (three, r3f, drei, postprocessing, tailwind, framer, howler, zustand) | 0.1 | 10 min |
| 0.3 | Configurar TailwindCSS (tailwind.config.js, postcss.config.js, globals.css) | 0.2 | 10 min |
| 0.4 | Copiar assets a carpetas correspondientes (models → public/models, etc.) | 0.1 | 15 min |
| 0.5 | Verificar que los assets cargan correctamente con dev server | 0.4 | 10 min |

### Fase 1: Escena 3D Base

| # | Tarea | Dependencias | Tiempo |
|---|---|---|---|
| 1.1 | Crear `SceneContainer.tsx` con Canvas R3F, cámara, renderer config | 0.2 | 20 min |
| 1.2 | Crear `Lighting.tsx` — Directional, Ambient, Hemisphere + FogExp2 | 1.1 | 15 min |
| 1.3 | Crear `Skybox.tsx` — cargar textura equirectangular y asignar | 1.1 | 15 min |
| 1.4 | Crear `ForestEnvironment.tsx` — ground plane con textura de hierba | 1.1, 0.4 | 25 min |
| 1.5 | Crear `MechaModel.tsx` — useGLTF + useAnimations + walk loop | 1.1, 0.4 | 30 min |
| 1.6 | Verificar escena: mecha caminando, cielo, suelo, luces | 1.2-1.5 | 10 min |

### Fase 2: Entorno Forestal

| # | Tarea | Dependencias | Tiempo |
|---|---|---|---|
| 2.1 | Cargar árboles sakura desde GLTF, crear instancias múltiples | 1.4 | 30 min |
| 2.2 | Distribuir árboles en posiciones aleatorias alrededor del centro | 2.1 | 15 min |
| 2.3 | Añadir rocas / hongos / detalle al suelo (opcional geom. simple) | 1.4 | 20 min |
| 2.4 | Crear `Particles.tsx` — luciérnagas con movimiento orgánico | 1.1 | 25 min |

### Fase 3: Post-Processing y Efectos

| # | Tarea | Dependencias | Tiempo |
|---|---|---|---|
| 3.1 | Configurar EffectComposer con Selection | 1.1 | 15 min |
| 3.2 | Añadir Bloom — threshold, strength, radius ajustables | 3.1 | 15 min |
| 3.3 | Añadir ColorGrading — lookup o ajuste manual | 3.1 | 15 min |
| 3.4 | Añadir Vignette — offset y darkness | 3.1 | 10 min |
| 3.5 | Ajustar y calibrar efectos para look cinematográfico | 3.2-3.4 | 15 min |

### Fase 4: Sistema de Audio

| # | Tarea | Dependencias | Tiempo |
|---|---|---|---|
| 4.1 | Crear `useAppStore.ts` con Zustand (estado de audio y cámara) | 0.2 | 15 min |
| 4.2 | Crear `useAudioManager.ts` — Howler.js init, play, stop, crossfade | 4.1 | 30 min |
| 4.3 | Mapear 3 pistas de audio a botones (chill, relax, rain) | 4.2, 0.4 | 10 min |
| 4.4 | Integrar SFX de pisadas sincronizado con animación (opcional) | 4.2, 1.5 | 20 min |

### Fase 5: UI Overlay

| # | Tarea | Dependencias | Tiempo |
|---|---|---|---|
| 5.1 | Crear `Header.tsx` con animación de entrada (Framer Motion) | 4.1 | 15 min |
| 5.2 | Crear `AudioControls.tsx` — 3 botones glassmorphism | 4.1, 5.3 | 30 min |
| 5.3 | Implementar estilos glassmorphism en Tailwind (utilidades custom) | 0.3 | 20 min |
| 5.4 | Crear `VolumeSlider.tsx` — input range + icono | 4.1 | 20 min |
| 5.5 | Crear `CameraToggle.tsx` — botón cíclico 3 modos | 4.1 | 20 min |
| 5.6 | Conectar botones al store y al hook de audio | 5.2-5.5 | 15 min |

### Fase 6: Cámara

| # | Tarea | Dependencias | Tiempo |
|---|---|---|---|
| 6.1 | Crear `CameraController.tsx` — 3 modos con useFrame | 1.1 | 25 min |
| 6.2 | Implementar transiciones suaves entre modos (lerp) | 6.1 | 15 min |
| 6.3 | Conectar CameraToggle al store y al controller | 6.2, 5.5 | 10 min |

### Fase 7: Carga y Transiciones

| # | Tarea | Dependencias | Tiempo |
|---|---|---|---|
| 7.1 | Crear `LoadingScreen.tsx` — barra de progreso + logo | 4.1 | 20 min |
| 7.2 | Implementar detección de carga completa (useProgress de drei) | 7.1 | 10 min |
| 7.3 | Transición fade out de loading + fade in de escena | 7.2 | 15 min |
| 7.4 | Añadir animación de entrada para UI overlay | 7.3 | 15 min |

### Fase 8: Integración y Polish

| # | Tarea | Dependencias | Tiempo |
|---|---|---|---|
| 8.1 | Crear `Layout.tsx` y `App.tsx` — orquestar todo | Todas anteriores | 20 min |
| 8.2 | Responsive: ajustar UI para mobile (pantallas < 768px) | 8.1 | 20 min |
| 8.3 | Ajustar timing de animaciones, densidades y colores | 8.1 | 20 min |
| 8.4 | Performance: limitar pixel ratio, instancing, memo | 8.1 | 20 min |
| 8.5 | Test final: revisar flujo completo, corregir bugs | 8.1-8.4 | 30 min |

### Resumen de Tiempos

| Fase | Tiempo estimado |
|---|---|
| Fase 0 — Preparación | 55 min |
| Fase 1 — Escena 3D Base | 115 min |
| Fase 2 — Entorno Forestal | 90 min |
| Fase 3 — Post-Processing | 70 min |
| Fase 4 — Sistema de Audio | 75 min |
| Fase 5 — UI Overlay | 120 min |
| Fase 6 — Cámara | 50 min |
| Fase 7 — Carga y Transiciones | 60 min |
| Fase 8 — Integración y Polish | 110 min |
| **Total** | **~12 horas** |

---

## 10. Rendimiento y Optimización

### 10.1 Estrategias

| Técnica | Aplica a | Impacto |
|---|---|---|
| Instancing de árboles | ForestEnvironment | Alto (reduce draw calls de 10-15 a 1) |
| LOD (Level of Detail) | Árboles lejanos | Medio |
| Pixel ratio limitado a 2 | Canvas | Alto |
| useMemo / useCallback | Todos los componentes | Medio |
| Suspense + lazy loading | SceneContainer | Medio |
| Desactivar shadows en objetos lejanos | Lighting | Bajo |
| CompressTextures | Skybox y suelo | Bajo |
| Frustum culling (por defecto en Three) | Automático | Alto |

### 10.2 Blanco de Rendimiento

| Métrica | Objetivo |
|---|---|
| FPS | 60 (estable) |
| Draw calls | < 200 |
| Geometría | < 500k triángulos |
| Texturas | < 512 MB VRAM |
| Tiempo de carga | < 8 segundos (conexión razonable) |
| Tamaño bundle (JS) | < 300 KB (gzip) |

### 10.3 Manejo de Carga

```typescript
// Uso de useProgress de @react-three/drei
const { progress, active } = useProgress();
// progress: 0-100 (porcentaje cargado)
// active: true si hay assets cargando
```

---

## 11. Flujo de Datos

### 11.1 Zustand Store

```typescript
interface AppState {
  // Audio
  activeTrack: 'chill' | 'relax' | 'rain' | null;
  volume: number;
  isPlaying: boolean;

  // Cámara
  cameraMode: 'fixed' | 'orbit' | 'subtle';

  // Loading
  isLoading: boolean;
  loadProgress: number;

  // Actions
  setTrack: (track: 'chill' | 'relax' | 'rain' | null) => void;
  setVolume: (vol: number) => void;
  togglePlay: () => void;
  setCameraMode: (mode: 'fixed' | 'orbit' | 'subtle') => void;
  setLoading: (loading: boolean) => void;
  setProgress: (progress: number) => void;
}
```

### 11.2 Ciclo de Vida de un Click en Audio

```
1. Usuario hace click en botón "Chill"
2. AudioControls.onClick → store.setTrack('chill')
3. useAudioManager detecta cambio en activeTrack
4. Si había un track reproduciendo → fade out (800ms)
5. Si el nuevo track es el mismo → stop (toggle off)
6. Si es diferente → fade in de 'chill' (800ms)
7. store.isPlaying = true
8. Botón "Chill" actualiza su estilo (glow + ondas animadas)
```

### 11.3 Ciclo de Vida de Cambio de Cámara

```
1. Usuario hace click en CameraToggle
2. CameraToggle.onClick → store.setCameraMode(nextMode)
3. CameraController detecta cambio en cameraMode
4. Guarda posición actual como origen de interpolación
5. Calcula nueva posición objetivo según el modo
6. En useFrame: camera.position.lerp(targetPosition, 0.05)
7. camera.lookAt(0, 0.5, 0)
```

---

## Apéndices

### A. Comandos Útiles

```bash
# Desarrollo
npm run dev          # Iniciar servidor en localhost:5173

# Build
npm run build        # Compilar para producción
npm run preview      # Vista previa del build

# Linting y typecheck
npx tsc --noEmit     # Verificar tipos TypeScript
```

### B. Posibles Mejoras Futuras

- [ ] Soporte para VR/AR con WebXR
- [ ] Efecto de niebla volumétrica con shader personalizado
- [ ] Día/noche dinámico
- [ ] Más árboles y vegetación procedural
- [ ] Efecto de hojas cayendo (partículas)
- [ ] Personalización de colores del mecha
- [ ] Modo pantalla completa
- [ ] SFX de ambiente del bosque (pájaros, viento)
- [ ] Visualizador de audio (barras/ondas reactivas)
- [ ] Exportar como Progressive Web App (PWA)

### C. Referencias

- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [Drei Documentation](https://github.com/pmndrs/drei)
- [Three.js Documentation](https://threejs.org/docs/)
- [Howler.js Documentation](https://howlerjs.com/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Framer Motion Documentation](https://www.framermotion.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
