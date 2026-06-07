# MechaUI · Relaxing Travel

> Experiencia web 3D con un mecha robótico caminando en un bosque atmosférico,
> acompañado de música chill, relax y sonidos de lluvia.

![Tech Stack](https://img.shields.io/badge/Three.js-000000?logo=three.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white)

---

## Captura

*(pendiente — la vista 3D mostrará un mecha caminando en un bosque con niebla
volumétrica y controles de audio superpuestos)*

---

## Tecnologías

| Tecnología | Versión | Propósito |
|---|---|---|
| **React 18** + **TypeScript** | latest | UI declarativa tipada |
| **Three.js** | 0.162+ | Motor de renderizado 3D |
| **@react-three/fiber** | 8.x | Integración React ↔ Three.js |
| **@react-three/drei** | 9.x | Helpers 3D (GLTF, Sky, Environment) |
| **@react-three/postprocessing** | latest | Efectos: Bloom, Color Grading |
| **TailwindCSS** | 3.4 | Estilos utilitarios |
| **Framer Motion** | 11.x | Animaciones de UI |
| **Howler.js** | 2.2 | Gestión de audio |
| **Zustand** | 4.x | Estado global mínimo |
| **Vite** | 5.x | Bundler y dev server |

---

## Características

- **Escena 3D inmersiva** — Mecha con animación de caminata automática en un bosque con árboles sakura y niebla volumétrica
- **3 modos de cámara** — Cámara fija, órbita lenta automática, micro-movimientos sutiles (seleccionables por botón)
- **Control de audio** — 3 tracks: música chill (lo-fi), relax (ambient/piano), sonido de lluvia realista con crossfade suave
- **Diseño Glassmorphism** — UI minimalista con cristal esmerilado, transiciones fluidas y glow pulsante en estado activo
- **Partículas ambientales** — Luciérnagas flotando en el bosque
- **Niebla volumétrica** — Efecto de profundidad y atmósfera en el entorno forestal
- **Carga progresiva** — Pantalla de carga mientras se cargan los assets 3D

---

## Requisitos

- Node.js 18+
- npm 9+ o pnpm 8+

---

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd "MechaUI Relaxing travel"

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

---

## Estructura del Proyecto

```
MechaUI Relaxing travel/
├── public/
│   ├── models/          # Modelos 3D (.glb)
│   ├── textures/        # Texturas (skybox, árboles, suelo)
│   │   ├── skybox/
│   │   ├── trees/
│   │   └── ground/
│   └── audio/           # Pistas de audio (.mp3)
├── src/
│   ├── components/
│   │   ├── Scene/       # Componentes 3D (Mecha, Forest, Lighting...)
│   │   └── UI/          # Interfaz de usuario (AudioControls, CameraToggle...)
│   ├── store/           # Estado global con Zustand
│   ├── hooks/           # Custom hooks (audio, cámara)
│   └── styles/          # Estilos globales
├── Models/              # Assets originales (raw)
│   ├── mecha_character_xt-3478_cyber_by_oscar_creativo.glb
│   ├── red_riding_hood_-_forest_skybox/
│   ├── red_riding_hood_-_forest_skybox3/
│   ├── sakura_trees/
│   └── grass_pine_forest_-_2_free_textures_handpaint/
├── Sounds/              # Archivos de audio originales
├── DOCUMENTATION.md     # Documentación completa del proyecto
├── README.md
└── package.json
```

---

## Uso

1. La escena 3D se carga automáticamente con el mecha caminando en bucle
2. Usa los botones de audio para reproducir chill, relax o lluvia
3. Ajusta el volumen con el slider
4. Cambia el modo de cámara con el botón selector

---

## Assets

### 3D
- **Mecha:** `mecha_character_xt-3478_cyber_by_oscar_creativo.glb` (incluye animación walk)
- **Árboles Sakura:** Modelo GLTF con texturas de ramas y musgo
- **Skybox:** Textura equirectangular de bosque
- **Suelo:** Texturas de hierba/pino para el ground plane

### Audio
- Lo-fi chill (con lluvia de fondo)
- Música relajante (piano/ambient)
- Lluvia realista
- SFX de pisadas del mecha

---

## Créditos

- Modelo mecha: **Oscar Creativo** — `mecha_character_xt-3478_cyber`
- Skyboxes: **Red Riding Hood - Forest Skybox**
- Árboles Sakura: modelo GLTF de código abierto
- Texturas de suelo: grass_pine_forest (handpaint)
- Pistas de audio: Smeraldelion, Clavier Music, Liecio — vía Pixabay
- SFX pisadas: diseño propio

---

## Licencia

Uso personal y educativo. Los assets 3D y de audio pertenecen a sus respectivos autores.
