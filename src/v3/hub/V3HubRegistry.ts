/**
 * Kyndev V3 Master Registry
 *
 * Definitive catalog of all 18 reverse-engineered animations, physics engines,
 * shaders, and interactive components directly extracted from deobfuscated.js.
 */

export interface V3ComponentEntry {
  id: string;
  title: string;
  category: '3D Scenic Journeys' | 'Physics & Fluids' | 'Shaders & VFX' | 'Interactive UI' | 'Engine Core';
  description: string;
  sourceClasses: string[];
  sourceLines: string;
  shaders: string[];
  assets: string[];
  status: 'Ready to Review' | 'Active Pipeline' | 'Architecture Staged';
  badge: string;
  keyFeatures: string[];
  controls: {
    name: string;
    type: 'range' | 'toggle' | 'select' | 'button';
    min?: number;
    max?: number;
    step?: number;
    default: number | boolean | string;
    unit?: string;
  }[];
}

export const V3_COMPONENTS_REGISTRY: V3ComponentEntry[] = [
  {
    id: 'lunar-scene',
    title: 'Lunar 3D Spline Journey (AboutHero)',
    category: '3D Scenic Journeys',
    description: 'Cinematic low-gravity lunar terrain navigation along a 3D camera spline, featuring displaced ground heightmaps, levitating rocks with physical inertia, rigged astronaut character, and GPGPU FBO cosmic dust simulation.',
    sourceClasses: [
      'AboutHero',
      'AboutHeroGround',
      'AboutHeroRocks',
      'AboutHeroParticlesSimulation',
      'AboutHeroParticles',
      'AboutHeroScatter',
      'aboutHeroPerson',
      'AboutHeroLines',
      'AboutHeroFog',
      'AboutHeroHalo'
    ],
    sourceLines: '15608–17475 (1,867 lines)',
    shaders: ['vert$9', 'frag$d', 'vert$8', 'frag$c', 'frag$b', 'vert$7', 'frag$a', 'vert$6', 'frag$9', 'vert$5', 'frag$8', 'vert$4', 'frag$7'],
    assets: [
      '/assets/models/about/terrain.buf',
      '/assets/models/about/camera_spline.buf',
      '/assets/models/about/person.buf',
      '/assets/models/about/person_idle.buf',
      '/assets/models/about/rock_0.buf...3.buf',
      '/assets/models/about/rock_animation_0.buf...3.buf',
      '/assets/textures/about/terrain_shadow_light_height.webp',
      '/assets/textures/about/person.webp',
      '/assets/textures/about/rocks.webp',
      '/assets/textures/about/fog.png'
    ],
    status: 'Ready to Review',
    badge: 'Flagship 3D',
    keyFeatures: [
      'Spline camera navigation driven by scroll timeline',
      'Displaced terrain geometry with dynamic normal mapping',
      'Levitating rocks with 4 skeletal keyframe animation streams',
      'GPGPU FBO double-buffered dust fluid particle compute',
      'Rigged astronaut with breathing idle animation',
      'Topographic neon laser contour lines on terrain ridges'
    ],
    controls: [
      { name: 'Scroll Timeline', type: 'range', min: 0, max: 1, step: 0.01, default: 0.25, unit: '%' },
      { name: 'Camera Dolly FOV', type: 'range', min: 40, max: 80, step: 1, default: 60, unit: 'deg' },
      { name: 'Dust Particle Turbulence', type: 'range', min: 0, max: 2, step: 0.1, default: 1.0 },
      { name: 'Wireframe Ridges', type: 'toggle', default: false }
    ]
  },
  {
    id: 'flip-fluid',
    title: 'FLIP Fluid Dynamics Simulator (FlipSim)',
    category: 'Physics & Fluids',
    description: 'High-performance 2D/3D Eulerian-Lagrangian Fluid-Implicit-Particle (FLIP) physics tank. Simulates liquid pouring, splashing, and pooling with 60 Poisson pressure solver iterations, moving colliders, and smooth metasurface rendering.',
    sourceClasses: ['FlipSim', 'FlipAnimation', 'PlaygroundPage'],
    sourceLines: '21528–22474 (946 lines)',
    shaders: ['frag$3 (Metasurface Shader)'],
    assets: ['/assets/textures/flip_texture.png', '/assets/models/playground/tunnel.buf'],
    status: 'Ready to Review',
    badge: 'Physics Engine',
    keyFeatures: [
      'Staggered MAC grid tracking horizontal and vertical velocity fields',
      'Incompressible fluid solver iterating 60 times with over-relaxation factor 1.9',
      'PIC/FLIP velocity blending with FLIP ratio for vorticity preservation',
      'Dynamic rectangular obstacle colliders (addColliderRect)',
      'Smooth metasurface fragment shader with refraction and surface tension'
    ],
    controls: [
      { name: 'Pressure Iterations', type: 'range', min: 10, max: 100, step: 5, default: 60 },
      { name: 'Gravity Force', type: 'range', min: -20, max: 20, step: 1, default: -9.8, unit: 'm/s²' },
      { name: 'FLIP Ratio (Vorticity)', type: 'range', min: 0, max: 1, step: 0.05, default: 0.95 },
      { name: 'Spawn Obstacle', type: 'button', default: 'Add Box' }
    ]
  },
  {
    id: 'screen-paint',
    title: 'Screen Paint & Refraction Distortion',
    category: 'Shaders & VFX',
    description: 'Interactive pointer fluid paint engine. Injects viscous energy into an offscreen double-buffered ping-pong FBO. Features advection dissipation and a screen-distortion post-pass generating chromatic aberration and lens refraction.',
    sourceClasses: ['ScreenPaint', 'ScreenPaintDistortion'],
    sourceLines: '4103–4253, 24229–24291 (213 lines)',
    shaders: ['vert$k', 'frag$o', 'frag$n', 'frag$1 (Refraction Pass)'],
    assets: ['Double-buffered ping-pong float render targets'],
    status: 'Ready to Review',
    badge: 'Pointer VFX',
    keyFeatures: [
      'Real-time cursor velocity and touch energy injection',
      'Viscous dissipation and color diffusion shader',
      'Sobel gradient filter extracting surface normal maps from fluid density',
      'Screen-space chromatic aberration and refractive lens distortion'
    ],
    controls: [
      { name: 'Brush Radius', type: 'range', min: 10, max: 120, step: 2, default: 45, unit: 'px' },
      { name: 'Viscosity Decay', type: 'range', min: 0.9, max: 0.999, step: 0.005, default: 0.985 },
      { name: 'Chromatic Aberration', type: 'range', min: 0, max: 0.05, step: 0.002, default: 0.015 },
      { name: 'Clear Paint Buffer', type: 'button', default: 'Clear' }
    ]
  },
  {
    id: 'space-tunnels',
    title: 'Zero-G Cosmic Tunnels & Glass Shatter',
    category: '3D Scenic Journeys',
    description: 'The authentic full 3D interactive ride through cosmic corridors. Features modular sci-fi grid framework, rigged EVA suit astronaut with full-body animation playback, Voronoi glass shatter event, and high-key particle vortex.',
    sourceClasses: [
      'GoalSection',
      'GoalTunnels',
      'GoalBlackTunnel',
      'GoalWhiteTunnel',
      'GoalTunnelAstronauts',
      'GoalTunnelGlass',
      'GoalWhiteTunnelParticles',
      'GoalWhiteTunnelStickers'
    ],
    sourceLines: '9665–13749 (3,620 lines)',
    shaders: ['vert$e', 'frag$i', 'vert$d', 'frag$h', 'vert$c', 'frag$g', 'vert$h', 'frag$k', 'vert$f', 'frag$j'],
    assets: [
      '/assets/models/tunnels/grid_structure_hd.buf',
      '/assets/models/tunnels/tunnel_block_base.buf',
      '/assets/models/tunnels/tunnel_block_wall.buf',
      '/assets/models/tunnels/astronaut_animations.buf',
      '/assets/models/tunnels/astronaut_helmet.buf',
      '/assets/models/tunnels/broken_glass_animation.buf',
      '/assets/models/tunnels/broken_glass.buf',
      '/assets/models/tunnels/diamond.buf',
      '/assets/models/tunnels/earth_card.buf',
      '/assets/textures/tunnels/stickers.png'
    ],
    status: 'Ready to Review',
    badge: 'Flagship 3D',
    keyFeatures: [
      'Modular 3D grid tunnel framework with procedural neon edge lighting',
      'Rigged zero-g astronaut EVA suit animation playback',
      'Voronoi glass shatter portal explosion triggered on scroll boundary',
      'High-key white particle vortex and floating 3D graphic stickers'
    ],
    controls: [
      { name: 'Tunnel Depth Progress', type: 'range', min: 0, max: 1, step: 0.01, default: 0.4, unit: '%' },
      { name: 'Glass Shatter Blast', type: 'range', min: 0, max: 1, step: 0.02, default: 0.0 },
      { name: 'Astronaut Thruster Drift', type: 'toggle', default: true }
    ]
  },
  {
    id: 'hero-balloons',
    title: '3D Jacks Rigid Body Physics (Hero)',
    category: 'Physics & Fluids',
    description: 'Full 3D rigid body impulse physics simulation of Jacks bodies with pointer repulsion force fields, continuous collision responses, dynamic color palette cycling, and HDR matcap reflections.',
    sourceClasses: ['HomeHeroSection', 'HomeBalloons', 'HomeBalloonsPhysics', 'HomeBalloonsBody', 'Visuals'],
    sourceLines: '4254–4910, 6283–6434 (808 lines)',
    shaders: ['Built-in custom lighting & matcap shader'],
    assets: ['/assets/models/home/cross.buf', '/assets/models/home/cross_ld.buf', '/assets/textures/home/matcap.exr'],
    status: 'Ready to Review',
    badge: 'Physics & 3D',
    keyFeatures: [
      'Rigid body impulse physics with 3D rotational inertia',
      'Cursor repulsion force field pushing bodies away from mouse vector',
      'Dynamic 4-palette cycler with smooth color interpolation',
      'Binary .buf mesh decompressor and instanced rendering'
    ],
    controls: [
      { name: 'Object Count', type: 'range', min: 10, max: 60, step: 5, default: 35 },
      { name: 'Repulsion Strength', type: 'range', min: 1, max: 10, step: 0.5, default: 4.5 },
      { name: 'Palette Color Set', type: 'select', default: 'Electric Blue' },
      { name: 'Jostle Bodies', type: 'button', default: 'Push All' }
    ]
  },
  {
    id: 'spline-ribbon',
    title: 'Universal 3D Spline Ribbon Engine',
    category: 'Engine Core',
    description: 'Extruded camera-facing vector ribbon generator along arbitrary 3D Catmull-Rom or binary .buf spline paths. Features variable tube radius deformation, dual-gradient glow, and progressive scroll reveal.',
    sourceClasses: ['Line', 'UfxMesh'],
    sourceLines: '6616–7640 (1,025 lines)',
    shaders: ['vert$j (Extrusion Vertex)', 'frag$m (Neon Glow Fragment)'],
    assets: [
      '/assets/models/lines/line_goal.buf',
      '/assets/models/lines/line_reel.buf',
      '/assets/models/lines/line_capability.buf',
      '/assets/models/lines/line_office.buf'
    ],
    status: 'Ready to Review',
    badge: 'Core VFX',
    keyFeatures: [
      'Camera-oriented ribbon geometry generated from CP/Cd buffer attributes',
      'Screen-space invariant width and 3D world-space tube tapering',
      'Real-time scroll reveal wipe uniform (u_showRatio)',
      'Electric cyan-to-sapphire gradient with Fresnel edge illumination'
    ],
    controls: [
      { name: 'Show Ratio (Progress)', type: 'range', min: 0, max: 1, step: 0.01, default: 0.75, unit: '%' },
      { name: 'Tube Radius', type: 'range', min: 0.5, max: 5, step: 0.25, default: 1.8, unit: 'px' },
      { name: 'Spline Preset', type: 'select', default: 'line_goal.buf' }
    ]
  },
  {
    id: 'product-viewer',
    title: 'Interactive 3D Product Inspector',
    category: '3D Scenic Journeys',
    description: 'PBR 3D product turntable inspection studio. Features depth/normals prepass shaders, studio lighting, smooth inertia OrbitControls, and automatic bounding box recentering.',
    sourceClasses: ['ProjectDetailsScreen', 'OrbitControls', 'CameraControls'],
    sourceLines: '9945–10886, 13750–13977 (918 lines)',
    shaders: ['vert$b', 'frag$f (Prepass Studio Shader)'],
    assets: ['/assets/models/plant.buf', '/assets/models/home/cross.buf'],
    status: 'Ready to Review',
    badge: 'PBR Viewer',
    keyFeatures: [
      'Studio PBR lighting with custom rim highlights',
      'Depth and normals prepass buffer for edge glow',
      'Smooth inertial damping on orbit rotation and zoom',
      'Multiple product models switchable in real time'
    ],
    controls: [
      { name: 'Auto Rotate Speed', type: 'range', min: 0, max: 5, step: 0.2, default: 1.2 },
      { name: 'Rim Light Intensity', type: 'range', min: 0, max: 4, step: 0.2, default: 2.0 },
      { name: 'Active Model', type: 'select', default: 'Cyber Cross' }
    ]
  },
  {
    id: 'postprocessing',
    title: 'Cinematic Postprocessing Pipeline',
    category: 'Engine Core',
    description: 'Production post-processing stack featuring dual-filter bloom down/upsampling pyramid, subpixel morphological anti-aliasing (SMAA) with LUT textures, AMD FSR spatial upscaler, and blue noise dithering.',
    sourceClasses: ['Postprocessing', 'Smaa', 'Bloom', 'Fsr', 'BlueNoise'],
    sourceLines: '23464–24464 (1,000 lines)',
    shaders: ['frag$2 (SMAA Blend)', 'Bloom Down/Up Shaders', 'FSR Sharpen Shader'],
    assets: ['/assets/textures/smaa-area.png', '/assets/textures/smaa-search.png', '/assets/textures/LDR_RGB1_0.png'],
    status: 'Ready to Review',
    badge: 'Compositor',
    keyFeatures: [
      'Multi-stage Gaussian bloom pyramid with luminance thresholding',
      'Hardware-free SMAA 1x anti-aliasing utilizing precomputed LUT textures',
      'AMD FidelityFX Super Resolution edge sharpening pass',
      'Blue noise dither eliminating 8-bit banding'
    ],
    controls: [
      { name: 'Bloom Intensity', type: 'range', min: 0, max: 6, step: 0.2, default: 2.8 },
      { name: 'Bloom Threshold', type: 'range', min: 0.2, max: 1.0, step: 0.05, default: 0.75 },
      { name: 'Enable SMAA', type: 'toggle', default: true },
      { name: 'FSR Sharpness', type: 'range', min: 0, max: 1, step: 0.05, default: 0.65 }
    ]
  },
  {
    id: 'projects-gallery',
    title: '2.5D Projects Depth Displacement Gallery',
    category: 'Shaders & VFX',
    description: 'Perspective displacement cards with raymarched depth maps, specular light sheen following mouse position, full-card 3D perspective tilt, and word-grouped rolling slot machine text animators.',
    sourceClasses: ['ProjectItem', 'ProjectItemList', 'ProjectsMainSection', 'ProjectsPage'],
    sourceLines: '8947–9297, 20949–21527 (829 lines)',
    shaders: ['vert$i', 'frag$l (Depth Raymarching & Specular)'],
    assets: ['Project WebP textures with depth channels'],
    status: 'Ready to Review',
    badge: '2.5D Shaders',
    keyFeatures: [
      'Raymarched internal depth displacement with mouse parallax',
      'Dynamic specular reflection gliding across card surface',
      '3D perspective tilt reacting to pointer coordinates',
      'Rolling slot machine headline text animations'
    ],
    controls: [
      { name: 'Displacement Depth', type: 'range', min: 0, max: 0.1, step: 0.005, default: 0.045 },
      { name: 'Specular Intensity', type: 'range', min: 0, max: 2, step: 0.1, default: 1.2 },
      { name: 'Tilt Sensitivity', type: 'range', min: 5, max: 35, step: 1, default: 20, unit: 'deg' }
    ]
  },
  {
    id: 'about-who-logo',
    title: 'About Who 3D Kinetic Wireframe Logo',
    category: 'Interactive UI',
    description: '3D geometric polyhedral wireframe logo loaded from logo_text.buf, rotating and distorting with scroll progress through custom vertex and fragment shaders.',
    sourceClasses: ['AboutWhoSection', 'AboutWhoLogo', 'WhoSubsectionWeAre'],
    sourceLines: '17469–17543 (75 lines)',
    shaders: ['vert$1', 'frag$4 (Wireframe Geometric Shader)'],
    assets: ['/assets/models/about/logo_text.buf'],
    status: 'Ready to Review',
    badge: 'Kinetic 3D',
    keyFeatures: [
      'Polyhedral 3D mesh rendering with glowing wireframe shader',
      'Scroll-coupled rotation matrix and scale morphing',
      'Mouse orientation tracking with SecondOrderDynamics spring'
    ],
    controls: [
      { name: 'Rotation Speed', type: 'range', min: 0, max: 4, step: 0.2, default: 1.5 },
      { name: 'Wireframe Glow', type: 'range', min: 0.5, max: 3, step: 0.1, default: 1.8 }
    ]
  },
  {
    id: 'showreel-stage',
    title: 'Showreel Stage & Magnetic Filmstrip',
    category: 'Interactive UI',
    description: 'Cinematic video showcase stage with magnetic pulse Play button, filmstrip telemetry bars, timing connector synchronization, and line_reel.buf background path.',
    sourceClasses: ['HomeReelSection', 'Player', 'VideoOverlay', 'TimingSrcConnector'],
    sourceLines: '7641–8896 (1,255 lines)',
    shaders: ['vert$j', 'frag$m (Ribbon Path)'],
    assets: ['/assets/textures/reel/desktop.mp4', '/assets/models/lines/line_reel.buf'],
    status: 'Ready to Review',
    badge: 'Video & Audio',
    keyFeatures: [
      'Magnetic spring cursor attraction on interactive Play orb',
      'Real-time filmstrip telemetry with timecode clock readout',
      'Synchronized video playback connector with audio ducking'
    ],
    controls: [
      { name: 'Magnetic Pull Radius', type: 'range', min: 40, max: 200, step: 10, default: 120, unit: 'px' },
      { name: 'Telemetry HUD', type: 'toggle', default: true }
    ]
  },
  {
    id: 'featured-projects',
    title: 'Featured Projects Dynamic Palette Morph',
    category: 'Interactive UI',
    description: 'Dynamic background color-shifting project cards with magnetic cursor tracking, inertial preview card floating, and tag pills.',
    sourceClasses: ['HomeFeaturedSection'],
    sourceLines: '9298–9416 (119 lines)',
    shaders: ['Procedural chromatic backdrop interpolator'],
    assets: ['Featured project artwork'],
    status: 'Ready to Review',
    badge: 'Interactive UI',
    keyFeatures: [
      'RGB color space background morphing on active card hover',
      'Floating cursor preview card with second-order spring dynamics',
      'Tag filter telemetry and active project counter'
    ],
    controls: [
      { name: 'Palette Morph Duration', type: 'range', min: 0.2, max: 2, step: 0.1, default: 0.6, unit: 's' }
    ]
  },
  {
    id: 'about-clients',
    title: 'Brands & Clients Infinite Marquee',
    category: 'Interactive UI',
    description: 'Triple-track alternating-direction infinite marquee with procedural SVG path parsing, hover velocity damping, and glowing brand logos.',
    sourceClasses: ['AboutClientSection', 'SVGParser'],
    sourceLines: '18310–20270 (1,960 lines)',
    shaders: ['SVG glowing edge filter'],
    assets: ['SVG brand client logos'],
    status: 'Ready to Review',
    badge: 'Kinetic Marquee',
    keyFeatures: [
      '3 parallel tracks moving in alternating directions',
      'Hover damping gradually reducing track speed to 10%',
      'SVG path parser normalizing complex vector client marks'
    ],
    controls: [
      { name: 'Base Speed', type: 'range', min: 10, max: 100, step: 5, default: 35, unit: 'px/s' },
      { name: 'Hover Slowdown Factor', type: 'range', min: 0.05, max: 0.5, step: 0.05, default: 0.15 }
    ]
  },
  {
    id: 'about-awards',
    title: 'Awards Starburst Medal & Tally',
    category: 'Interactive UI',
    description: 'Rotating 58-point Starburst medal with texture gradient mapping (award_gradient.png), filterable organization tabs, and interactive awards tally.',
    sourceClasses: ['AboutAwardSection'],
    sourceLines: '20275–20542 (268 lines)',
    shaders: ['Texture gradient rotational shader'],
    assets: ['/assets/textures/award_gradient.png'],
    status: 'Ready to Review',
    badge: 'Odometer Tally',
    keyFeatures: [
      '58-point rotating starburst medal with gradient mapping',
      'Interactive award category tabs and animated counts',
      'Mechanical accordion items with hover sound triggers'
    ],
    controls: [
      { name: 'Medal Spin Velocity', type: 'range', min: 0, max: 3, step: 0.2, default: 1.0 },
      { name: 'Filter Organization', type: 'select', default: 'All Awards (58)' }
    ]
  },
  {
    id: 'about-capabilities',
    title: '3D Perspective Flip Matrix',
    category: 'Interactive UI',
    description: '3D perspective flip cards with dual-face transitions across strategic pillars, capability matrix checklists, and background ribbon line_capability.buf.',
    sourceClasses: ['AboutCapabilitySection'],
    sourceLines: '20543–20739 (197 lines)',
    shaders: ['vert$j', 'frag$m (Capability Ribbon)'],
    assets: ['/assets/models/lines/line_capability.buf'],
    status: 'Ready to Review',
    badge: '3D Flip Cards',
    keyFeatures: [
      '3D dual-face flip cards with inertia physics on mouse exit',
      'Pillar matrix checklist across Strategy, Creative, Technology, Production',
      'Background neon spline ribbon tracing through cards'
    ],
    controls: [
      { name: 'Flip Perspective', type: 'range', min: 400, max: 1500, step: 50, default: 900, unit: 'px' },
      { name: 'Auto Flip All', type: 'button', default: 'Trigger Flip' }
    ]
  },
  {
    id: 'project-case-study',
    title: 'Case Study Track & Parallax Gallery',
    category: 'Interactive UI',
    description: 'Horizontal inertial track with drag-to-pan physics, image parallax displacement (vert$a, frag$e), dynamic palette morphing, and overscroll spring.',
    sourceClasses: ['ProjectDetailsSection', 'ProjectDetailsItem'],
    sourceLines: '14605–15293 (688 lines)',
    shaders: ['vert$a', 'frag$e (Parallax Media Displacement)'],
    assets: ['Case study video and imagery textures'],
    status: 'Ready to Review',
    badge: 'Inertial Track',
    keyFeatures: [
      'Dual-axis drag-to-pan inertial movement with spring overscroll',
      'Parallax image displacement shader responding to drag velocity',
      'Dynamic project theme palette morphing across gallery slides'
    ],
    controls: [
      { name: 'Inertia Momentum', type: 'range', min: 0.85, max: 0.98, step: 0.01, default: 0.94 },
      { name: 'Parallax Displacement', type: 'range', min: 0, max: 0.08, step: 0.005, default: 0.035 }
    ]
  },
  {
    id: 'audio-engine',
    title: 'Web Audio Procedural Synthesizer',
    category: 'Interactive UI',
    description: 'Procedural Web Audio synthesizer generating UI sweeps, clicks, and laser resonances without audio file latency. Features spatial 3D panning and filter cutoff modulation.',
    sourceClasses: ['Audios', 'AudioItem', 'GlobalAudios'],
    sourceLines: '5871–6282 (411 lines)',
    shaders: ['Audio-reactive visual pulse dispatchers'],
    assets: ['/assets/audios/cinematic_0.ogg...3.ogg'],
    status: 'Ready to Review',
    badge: 'Web Audio Synth',
    keyFeatures: [
      'Procedural FM frequency modulation for sci-fi hover clicks and whooshes',
      'Dynamic low-pass filter sweeps synced to scroll momentum',
      'Spatial 3D audio listener tracking based on camera orientation'
    ],
    controls: [
      { name: 'Master Volume', type: 'range', min: 0, max: 1, step: 0.05, default: 0.75 },
      { name: 'Play Hover Click', type: 'button', default: 'Click FX' },
      { name: 'Play Warp Whoosh', type: 'button', default: 'Warp Whoosh' }
    ]
  },
  {
    id: 'route-transition',
    title: 'Route Transition 3D Warp & Screen Wipe',
    category: 'Shaders & VFX',
    description: 'Astro view transition coordinator. Synchronizes screen-space radial iris wipes, depth zoom blur, and procedural audio swooshes across page navigation.',
    sourceClasses: ['TransitionOverlay', 'PageManager'],
    sourceLines: '22764–23141 (377 lines)',
    shaders: ['Radial aperture wipe & depth dissolution shaders'],
    assets: ['Full-screen composite textures'],
    status: 'Ready to Review',
    badge: 'Page Transition',
    keyFeatures: [
      'Radial aperture aperture wipe opening and closing on route navigation',
      'Screen-space 3D push-in depth blur during layout mount',
      'Synchronized audio trigger matching visual transition curve'
    ],
    controls: [
      { name: 'Transition Duration', type: 'range', min: 0.3, max: 1.5, step: 0.1, default: 0.75, unit: 's' },
      { name: 'Trigger Test Wipe', type: 'button', default: 'Run Transition' }
    ]
  }
];
