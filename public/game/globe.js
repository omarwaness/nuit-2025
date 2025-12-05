// ===== GLOBAL VARIABLES =====
let scene, camera, renderer, globe, clouds, atmosphere, controls;
let pins = [];
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let isAutoRotating = true;
let showClouds = true;
let showAtmosphere = true;
let currentSelectedLevel = null;

// ===== PLAYER SCORES =====
let playerScores = {
    privacy: 0,
    independence: 0,
    budget: 0,
    eco: 0,
    security: 0,
    collaboration: 0,
    awareness: 0,
    certification: 0
};

// ===== NIRD EDUCATIONAL LEVEL DATA =====
const levelData = [
    {
        id: 1, level: 1,
        name: "🖥️ System Discovery",
        lat: 48.8566, lon: 2.3522, // Paris
        state: "unlocked",
        difficulty: "Easy",
        description: "Discover the system and understand your machine.",
        scoreEffects: { awareness: 10, independence: 10 }
    },
    {
        id: 2, level: 2,
        name: "💻 Windows Is Dying",
        lat: 41.0082, lon: 28.9784, // Istanbul (moved to create more space from Paris)
        state: "locked",
        difficulty: "Easy",
        description: "Identify machines that MUST leave Windows.",
        scoreEffects: { budget: 10, awareness: 10 }
    },
    {
        id: 3, level: 3,
        name: "🐧 Mission Ubuntu",
        lat: 40.7128, lon: -74.0060, // New York
        state: "locked",
        difficulty: "CORE 🔥",
        description: "Install Ubuntu and abandon Windows.",
        scoreEffects: { independence: 30, budget: 20, eco: 20 }
    },
    {
        id: 4, level: 4,
        name: "☁️ Kill Google Drive",
        lat: 34.0522, lon: -118.2437, // Los Angeles
        state: "locked",
        difficulty: "Medium",
        description: "Replace Google Drive with Nextcloud.",
        scoreEffects: { privacy: 30, independence: 20 }
    },
    {
        id: 5, level: 5,
        name: "📄 Office Without Microsoft",
        lat: 35.6762, lon: 139.6503, // Tokyo
        state: "locked",
        difficulty: "Medium",
        description: "Replace Microsoft Office with LibreOffice.",
        scoreEffects: { independence: 25, budget: 15 }
    },
    {
        id: 6, level: 6,
        name: "🌱 Eco Mode",
        lat: -33.8688, lon: 151.2093, // Sydney
        state: "locked",
        difficulty: "Easy",
        description: "Reduce power & storage waste.",
        scoreEffects: { eco: 30 }
    },
    {
        id: 7, level: 7,
        name: "♻️ Computer Recycling Lab",
        lat: 55.7558, lon: 37.6173, // Moscow
        state: "locked",
        difficulty: "Hard",
        description: "Revive an old PC using Linux Lite.",
        scoreEffects: { eco: 30, budget: 20 }
    },
    {
        id: 8, level: 8,
        name: "🛡️ Cyber Attack Defense",
        lat: 31.2304, lon: 121.4737, // Shanghai
        state: "locked",
        difficulty: "Hard",
        description: "Secure the school system.",
        scoreEffects: { security: 30, privacy: 20 }
    },
    {
        id: 9, level: 9,
        name: "🏭 The Open-Source Factory",
        lat: -23.5505, lon: -46.6333, // Sao Paulo
        state: "locked",
        difficulty: "Medium",
        description: "Share a tool with the community.",
        scoreEffects: { independence: 30, collaboration: 20 }
    },
    {
        id: 10, level: 10,
        name: "🚫 Big Tech Strikes Back",
        lat: 28.6139, lon: 77.2090, // New Delhi
        state: "locked",
        difficulty: "Hard",
        description: "Reject lock-in offers.",
        scoreEffects: { privacy: 30, independence: 20 }
    },
    {
        id: 11, level: 11,
        name: "🏆 Final NIRD Certification",
        lat: 30.0444, lon: 31.2357, // Cairo
        state: "locked",
        difficulty: "Expert",
        description: "Pass the final resistance audit.",
        scoreEffects: { certification: 100 }
    }
];

// ===== INITIALIZATION =====
function init() {
    scene = new THREE.Scene();

    // Create galaxy gradient background
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 2048;
    const ctx = canvas.getContext('2d');

    // Create radial gradient for galaxy effect
    const gradient = ctx.createRadialGradient(1024, 1024, 0, 1024, 1024, 1024);
    gradient.addColorStop(0, '#1a0a3e');
    gradient.addColorStop(0.3, '#0d1b4d');
    gradient.addColorStop(0.6, '#050a1e');
    gradient.addColorStop(1, '#000000');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 2048, 2048);

    const bgTexture = new THREE.CanvasTexture(canvas);
    scene.background = bgTexture;
    scene.fog = new THREE.Fog(0x000814, 30, 60);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(15, 8, 15);

    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('globe-canvas'),
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    setupLighting();
    createStarfield();
    createEarth();
    createClouds();
    createAtmosphere();
    loadProgress(); // Load saved progress
    createPins();
    createLevelPaths();
    setupControls();
    setupEventListeners();

    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) loadingScreen.classList.add('hidden');
    }, 1500);

    animate();
}

// ===== LOAD PROGRESS =====
function loadProgress() {
    const completedLevels = JSON.parse(localStorage.getItem('completedLevels') || '[]');

    levelData.forEach((level, index) => {
        if (completedLevels.includes(level.id)) {
            level.state = 'completed';
            // Unlock next level
            if (index + 1 < levelData.length) {
                levelData[index + 1].state = 'unlocked';
            }
        }
    });

    // Ensure Level 1 is always unlocked if nothing is completed
    if (completedLevels.length === 0) {
        levelData[0].state = 'unlocked';
    }
}

// ===== STARFIELD =====
function createStarfield() {
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 3000;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const radius = 50 + Math.random() * 100;

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        const colorChoice = Math.random();
        if (colorChoice > 0.7) {
            colors[i * 3] = 0.8 + Math.random() * 0.2;
            colors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
            colors[i * 3 + 2] = 1.0;
        } else if (colorChoice > 0.4) {
            colors[i * 3] = 1.0;
            colors[i * 3 + 1] = 1.0;
            colors[i * 3 + 2] = 1.0;
        } else {
            colors[i * 3] = 1.0;
            colors[i * 3 + 1] = 0.95 + Math.random() * 0.05;
            colors[i * 3 + 2] = 0.7 + Math.random() * 0.2;
        }

        sizes[i] = Math.random() * 2 + 0.5;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const starMaterial = new THREE.PointsMaterial({
        size: 1.5,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    scene.userData.stars = stars;
}

// ===== LIGHTING =====
function setupLighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const sunlight = new THREE.DirectionalLight(0xffffff, 1);
    sunlight.position.set(5, 3, 5);
    sunlight.castShadow = true;
    sunlight.shadow.mapSize.width = 2048;
    sunlight.shadow.mapSize.height = 2048;
    scene.add(sunlight);

    const fillLight = new THREE.DirectionalLight(0x4488ff, 0.3);
    fillLight.position.set(-5, 0, -5);
    scene.add(fillLight);
}

// ===== EARTH =====
function createEarth() {
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    const canvas = createLandmassTexture();
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.MeshPhongMaterial({
        map: texture,
        specular: 0x333333,
        shininess: 15
    });

    globe = new THREE.Mesh(geometry, material);
    globe.receiveShadow = true;
    globe.castShadow = true;
    scene.add(globe);
}

function createLandmassTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#1a4d7a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#2d5016';
    ctx.fillRect(200, 200, 400, 300);
    ctx.fillRect(400, 550, 250, 350);
    ctx.fillRect(900, 150, 250, 200);
    ctx.fillRect(950, 400, 350, 450);
    ctx.fillRect(1200, 100, 600, 500);
    ctx.fillRect(1500, 700, 300, 200);

    return canvas;
}

// ===== CLOUDS =====
function createClouds() {
    const geometry = new THREE.SphereGeometry(5.1, 64, 64);
    const canvas = createCloudTexture();
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.MeshPhongMaterial({
        map: texture,
        transparent: true,
        opacity: 0.4,
        depthWrite: false
    });

    clouds = new THREE.Mesh(geometry, material);
    scene.add(clouds);
}

function createCloudTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(255, 255, 255, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 100 + 50;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    return canvas;
}

// ===== ATMOSPHERE =====
function createAtmosphere() {
    const geometry = new THREE.SphereGeometry(5.5, 64, 64);
    const material = new THREE.ShaderMaterial({
        vertexShader: `
            varying vec3 vNormal;
            void main() {
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            varying vec3 vNormal;
            uniform float time;
            void main() {
                float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                vec3 atmosphere = vec3(0.3, 0.6, 1.0) * intensity;
                gl_FragColor = vec4(atmosphere, intensity * 0.8);
            }
        `,
        uniforms: {
            time: { value: 0.0 }
        },
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true
    });

    atmosphere = new THREE.Mesh(geometry, material);
    scene.add(atmosphere);
}

// ===== PINS =====
function createPins() {
    levelData.forEach(level => {
        const pin = createPin(level);
        pins.push(pin);
        globe.add(pin);
    });
}

function createPin(level) {
    const group = new THREE.Group();
    group.userData = level;

    const phi = (90 - level.lat) * (Math.PI / 180);
    const theta = (level.lon + 180) * (Math.PI / 180);
    const radius = 5.2;

    group.position.x = -radius * Math.sin(phi) * Math.cos(theta);
    group.position.y = radius * Math.cos(phi);
    group.position.z = radius * Math.sin(phi) * Math.sin(theta);

    group.lookAt(0, 0, 0);
    group.rotateY(Math.PI);

    if (level.state === 'locked') {
        createLockedIcon(group);
    } else if (level.state === 'completed') {
        createLinuxIcon(group);
    } else {
        createWindowsIcon(group);
    }

    group.userData.originalScale = 1.5;
    group.userData.hoverScale = 1.8;
    group.scale.set(1.5, 1.5, 1.5);

    return group;
}

// LOCKED - Padlock
function createLockedIcon(group) {
    const color = 0xff3333;
    const lockMat = new THREE.MeshPhongMaterial({ color: 0x888888, shininess: 100 });

    const shackle = new THREE.Mesh(
        new THREE.TorusGeometry(0.12, 0.04, 16, 32, Math.PI),
        lockMat
    );
    shackle.rotation.x = Math.PI;
    shackle.position.y = 0.15;
    group.add(shackle);

    const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.25, 0.2, 0.15),
        lockMat
    );
    body.position.y = 0.05;
    group.add(body);

    const glow = new THREE.Mesh(
        new THREE.SphereGeometry(0.6, 16, 16),
        new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending
        })
    );
    group.add(glow);
    group.userData.glow = glow;
}

// UNLOCKED - Windows Monitor
function createWindowsIcon(group) {
    const color = 0x00d4ff;
    const scale = 1;

    const frame = new THREE.Mesh(
        new THREE.BoxGeometry(0.4 * scale, 0.3 * scale, 0.05 * scale),
        new THREE.MeshPhongMaterial({ color: 0x333333, shininess: 50 })
    );
    frame.position.y = 0.1 * scale;
    frame.castShadow = true;
    group.add(frame);

    const screen = new THREE.Mesh(
        new THREE.BoxGeometry(0.35 * scale, 0.25 * scale, 0.02 * scale),
        new THREE.MeshPhongMaterial({ color: color, emissive: color, emissiveIntensity: 0.8, shininess: 100 })
    );
    screen.position.y = 0.1 * scale;
    screen.position.z = 0.03 * scale;
    group.add(screen);

    const squareSize = 0.06 * scale;
    const gap = 0.02 * scale;
    const logoMat = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0x00aaff, emissiveIntensity: 0.6 });

    [[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(([x, y]) => {
        const square = new THREE.Mesh(new THREE.BoxGeometry(squareSize, squareSize, 0.01 * scale), logoMat);
        square.position.set(x * (squareSize / 2 + gap / 2), 0.1 * scale + y * (squareSize / 2 + gap / 2), 0.05 * scale);
        group.add(square);
    });

    const stand = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05 * scale, 0.08 * scale, 0.15 * scale, 8),
        new THREE.MeshPhongMaterial({ color: 0x333333 })
    );
    stand.position.y = -0.1 * scale;
    group.add(stand);

    const glow = new THREE.Mesh(
        new THREE.SphereGeometry(0.6, 16, 16),
        new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending })
    );
    glow.position.y = 0.1 * scale;
    group.add(glow);
    group.userData.glow = glow;
}

// COMPLETED - Linux Penguin
function createLinuxIcon(group) {
    const color = 0x00ff88;
    const bodyMat = new THREE.MeshPhongMaterial({ color: 0x000000, shininess: 50 });

    const body = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), bodyMat);
    body.scale.set(1, 1.2, 0.9);
    body.castShadow = true;
    group.add(body);

    const belly = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 16, 16),
        new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 30 })
    );
    belly.position.set(0, 0, 0.12);
    belly.scale.set(0.8, 1, 0.5);
    group.add(belly);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), bodyMat);
    head.position.y = 0.25;
    head.castShadow = true;
    group.add(head);

    const eyeMat = new THREE.MeshPhongMaterial({ color: 0xffffff });
    [-0.05, 0.05].forEach(x => {
        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), eyeMat);
        eye.position.set(x, 0.28, 0.08);
        group.add(eye);

        const pupil = new THREE.Mesh(
            new THREE.SphereGeometry(0.02, 8, 8),
            new THREE.MeshPhongMaterial({ color: 0x000000 })
        );
        pupil.position.set(x, 0.28, 0.1);
        group.add(pupil);
    });

    const beak = new THREE.Mesh(
        new THREE.ConeGeometry(0.03, 0.08, 8),
        new THREE.MeshPhongMaterial({ color: 0xff8800 })
    );
    beak.position.set(0, 0.25, 0.12);
    beak.rotation.x = Math.PI / 2;
    group.add(beak);

    const footMat = new THREE.MeshPhongMaterial({ color: 0xff8800 });
    [-0.08, 0.08].forEach(x => {
        const foot = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.02, 0.1), footMat);
        foot.position.set(x, -0.22, 0.05);
        group.add(foot);
    });

    [-0.18, 0.18].forEach(x => {
        const wing = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), bodyMat);
        wing.position.set(x, 0.05, 0);
        wing.scale.set(0.5, 0.8, 0.4);
        group.add(wing);
    });

    const glow = new THREE.Mesh(
        new THREE.SphereGeometry(0.7, 16, 16),
        new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending })
    );
    group.add(glow);
    group.userData.glow = glow;

    group.scale.set(1.3, 1.3, 1.3);
}

// ===== PATHS =====
function createLevelPaths() {
    for (let i = 0; i < levelData.length - 1; i++) {
        const currentLevel = levelData[i];
        const nextLevel = levelData[i + 1];

        let pathColor = 0x666666, pathOpacity = 0.5, glowColor = 0x666666;
        if (currentLevel.state === 'completed') {
            pathColor = 0x00ff88;
            glowColor = 0x00ff88;
            pathOpacity = 0.9;
        } else if (currentLevel.state === 'unlocked') {
            pathColor = 0x00d4ff;
            glowColor = 0x00d4ff;
            pathOpacity = 0.8;
        }

        const startPos = latLonToVector3Simple(currentLevel.lat, currentLevel.lon, 5.25);
        const endPos = latLonToVector3Simple(nextLevel.lat, nextLevel.lon, 5.25);

        const midPoint = new THREE.Vector3().addVectors(startPos, endPos).multiplyScalar(0.5).normalize().multiplyScalar(5.4);
        const curve = new THREE.QuadraticBezierCurve3(startPos, midPoint, endPos);
        const points = curve.getPoints(50);

        // Create dotted arrow path
        const dashedPoints = [];
        for (let j = 0; j < points.length; j += 3) {
            dashedPoints.push(points[j]);
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(dashedPoints);

        // Main dotted line
        const material = new THREE.LineBasicMaterial({
            color: pathColor,
            opacity: pathOpacity,
            transparent: true,
            linewidth: 3
        });
        const path = new THREE.Line(geometry, material);
        globe.add(path);

        // Add glowing tube effect
        const tubeGeometry = new THREE.TubeGeometry(curve, 50, 0.02, 8, false);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: glowColor,
            transparent: true,
            opacity: pathOpacity * 0.7,
            blending: THREE.AdditiveBlending
        });
        const glowTube = new THREE.Mesh(tubeGeometry, glowMaterial);
        globe.add(glowTube);

        // Add arrow heads along the path
        createArrowHeads(curve, pathColor, pathOpacity);
    }
}

function createArrowHeads(curve, color, opacity) {
    // Create arrow heads at intervals along the path - more visible and styled
    const arrowPositions = [0.25, 0.5, 0.75];

    arrowPositions.forEach(t => {
        const point = curve.getPointAt(t);
        const tangent = curve.getTangentAt(t);

        // Larger, more visible arrow
        const arrowGeometry = new THREE.ConeGeometry(0.12, 0.25, 8);
        const arrowMaterial = new THREE.MeshStandardMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 0.8,
            transparent: true,
            opacity: opacity,
            metalness: 0.3,
            roughness: 0.4
        });

        const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
        arrow.position.copy(point);

        // Orient arrow along the path
        arrow.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tangent);

        globe.add(arrow);

        // Add glow effect around arrow
        const glowGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.copy(point);
        globe.add(glow);
    });
}

function latLonToVector3Simple(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    );
}

// ===== CONTROLS =====
function setupControls() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 8;
    controls.maxDistance = 25;
    controls.enablePan = false;
    controls.autoRotate = isAutoRotating;
    controls.autoRotateSpeed = 0.5;
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onMouseClick);

    const btnRot = document.getElementById('toggle-rotation');
    if (btnRot) btnRot.addEventListener('click', toggleRotation);

    const btnReset = document.getElementById('reset-camera');
    if (btnReset) btnReset.addEventListener('click', resetCamera);

    const btnClouds = document.getElementById('toggle-clouds');
    if (btnClouds) btnClouds.addEventListener('click', toggleClouds);

    const btnAtmos = document.getElementById('toggle-atmosphere');
    if (btnAtmos) btnAtmos.addEventListener('click', toggleAtmosphere);

    const btnClose = document.getElementById('close-info');
    if (btnClose) btnClose.addEventListener('click', closeInfoPanel);

    const actionBtn = document.getElementById('action-btn');
    if (actionBtn) actionBtn.addEventListener('click', startLevel);

    updateButtonState('toggle-rotation', isAutoRotating);
    updateButtonState('toggle-clouds', showClouds);
    updateButtonState('toggle-atmosphere', showAtmosphere);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(pins, true);

    if (intersects.length > 0) {
        for (let i = 0; i < intersects.length; i++) {
            let object = intersects[i].object;

            while (object.parent && !object.userData.id) {
                object = object.parent;
                if (object === scene || object === globe) break;
            }

            if (object.userData && object.userData.id) {
                if (object.userData.state === 'locked') {
                    alert(`🔒 Level ${object.userData.level} is LOCKED!\n\nComplete previous levels first.`);
                } else {
                    selectPin(object);
                }
                return;
            }
        }
    }
}

// ===== PIN INTERACTION =====
function selectPin(pin) {
    const level = pin.userData;
    currentSelectedLevel = level;

    // Update title
    const titleEl = document.getElementById('info-title');
    if (titleEl) titleEl.textContent = level.name;

    // Update action button
    const actionBtn = document.getElementById('action-btn');
    if (actionBtn) {
        actionBtn.textContent = 'Start';
    }

    // Show panel
    const panel = document.getElementById('info-panel');
    if (panel) panel.classList.remove('hidden');

    animateCameraToPin(pin);
}

function animateCameraToPin(pin) {
    const targetPosition = pin.position.clone().normalize().multiplyScalar(12);
    const startPosition = camera.position.clone();
    const startTime = Date.now();
    const duration = 1500;

    function updateCamera() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        camera.position.lerpVectors(startPosition, targetPosition, eased);
        camera.lookAt(0, 0, 0);

        if (progress < 1) requestAnimationFrame(updateCamera);
    }
    updateCamera();
}

function closeInfoPanel() {
    const panel = document.getElementById('info-panel');
    if (panel) panel.classList.add('hidden');
    currentSelectedLevel = null;
}

// ===== LEVEL NAVIGATION =====
function startLevel() {
    if (!currentSelectedLevel) return;

    // Navigate to level page with level ID as parameter
    window.location.href = `level${currentSelectedLevel.id}.html`;
}

// ===== ANIMATION LOOP =====
function animate() {
    requestAnimationFrame(animate);

    if (isAutoRotating && controls) {
        controls.update();
    }

    if (clouds) {
        clouds.rotation.y += 0.0005;
    }

    if (scene.userData.stars) {
        scene.userData.stars.rotation.y -= 0.0002;
    }

    // Animate glow effects
    pins.forEach(pin => {
        if (pin.userData.glow) {
            const scale = 1 + Math.sin(Date.now() * 0.003) * 0.1;
            pin.userData.glow.scale.set(scale, scale, scale);
        }

        // Hover effect
        if (pin.userData.hovered) {
            // Logic handled in mouse move if needed, or CSS
        }
    });

    renderer.render(scene, camera);
}

// ===== UTILS =====
function toggleRotation() {
    isAutoRotating = !isAutoRotating;
    if (controls) controls.autoRotate = isAutoRotating;
    updateButtonState('toggle-rotation', isAutoRotating);
}

function resetCamera() {
    camera.position.set(15, 8, 15);
    camera.lookAt(0, 0, 0);
    if (controls) controls.reset();
}

function toggleClouds() {
    showClouds = !showClouds;
    if (clouds) clouds.visible = showClouds;
    updateButtonState('toggle-clouds', showClouds);
}

function toggleAtmosphere() {
    showAtmosphere = !showAtmosphere;
    if (atmosphere) atmosphere.visible = showAtmosphere;
    updateButtonState('toggle-atmosphere', showAtmosphere);
}

function updateButtonState(id, isActive) {
    const btn = document.getElementById(id);
    if (btn) {
        if (isActive) btn.classList.add('active');
        else btn.classList.remove('active');
    }
}

// Initialize on load
window.addEventListener('load', init);
