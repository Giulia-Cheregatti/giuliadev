// threejs-scene.js - Cena completa do Three.js (torus knot + partículas)

if (typeof THREE !== 'undefined') {
  const canvasContainer = document.getElementById('canvas-container');

  if (canvasContainer) {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.appendChild(renderer.domElement);

    // Torus Knot
    const geometry = new THREE.TorusKnotGeometry(1.2, 0.4, 100, 16);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x8b5cf6,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.8,
      wireframe: false,
      side: THREE.DoubleSide,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Wireframe overlay
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const wireframeGeometry = new THREE.TorusKnotGeometry(1.21, 0.41, 100, 16);
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframeMesh);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const directionalLight = new THREE.DirectionalLight(0x8b5cf6, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xec4899, 1.5, 10);
    pointLight.position.set(-3, 2, 3);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x3b82f6, 1.5, 10);
    pointLight2.position.set(3, -2, 3);
    scene.add(pointLight2);

    // Mouse movement
    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
    window.addEventListener('mousemove', (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation
    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      torusKnot.rotation.x = elapsedTime * 0.1;
      torusKnot.rotation.y = elapsedTime * 0.15;
      wireframeMesh.rotation.x = elapsedTime * 0.1;
      wireframeMesh.rotation.y = elapsedTime * 0.15;

      particlesMesh.rotation.y = elapsedTime * 0.05;

      targetX = mouseX * 0.3;
      targetY = mouseY * 0.3;
      torusKnot.position.x += (targetX - torusKnot.position.x) * 0.05;
      torusKnot.position.y += (targetY - torusKnot.position.y) * 0.05;
      wireframeMesh.position.copy(torusKnot.position);

      const scale = 1 + Math.sin(elapsedTime * 0.5) * 0.05;
      torusKnot.scale.set(scale, scale, scale);
      wireframeMesh.scale.set(scale, scale, scale);

      pointLight.position.x = Math.sin(elapsedTime * 0.5) * 3;
      pointLight.position.z = Math.cos(elapsedTime * 0.5) * 3;
      pointLight2.position.x = Math.cos(elapsedTime * 0.7) * 3;
      pointLight2.position.z = Math.sin(elapsedTime * 0.7) * 3;

      renderer.render(scene, camera);
    }
    animate();

    // Resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      if (window.innerWidth < 768) {
        camera.position.z = 7;
        torusKnot.scale.set(0.7, 0.7, 0.7);
      } else {
        camera.position.z = 5;
        torusKnot.scale.set(1, 1, 1);
      }
    });

    if (window.innerWidth < 768) {
      camera.position.z = 7;
      torusKnot.scale.set(0.7, 0.7, 0.7);
    }

    // Visibility optimization
    let isVisible = true;
    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
      if (!isVisible) clock.stop();
      else clock.start();
    });

    console.log('🎨 Three.js elemento 3D carregado com sucesso!');
  } else {
    console.warn('⚠️ Container #canvas-container não encontrado');
  }
} else {
  console.warn('⚠️ Three.js não foi carregado. Verifique o CDN.');
}