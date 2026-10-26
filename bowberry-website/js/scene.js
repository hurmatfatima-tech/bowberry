/* Cute 3D satin bow with floating berries and pearls (Three.js r128) */
(function () {
  const canvas = document.getElementById("scene");
  const fail = () => document.body.classList.add("no-3d");
  if (!canvas || !window.THREE) return fail();

  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); }
  catch (e) { return fail(); }

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 8.5);

  scene.add(new THREE.HemisphereLight(0xffffff, 0xd9a0a8, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 0.65); key.position.set(3, 4, 6); scene.add(key);
  const rim = new THREE.PointLight(0xcf8f9a, 0.9, 25); rim.position.set(-5, -2, 4); scene.add(rim);

  const satin = (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.38, metalness: 0.08 });
  let seed = 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  /* One loop of the bow: a tapered ring, thin near the knot and wide at the far end */
  function ringPoints(scale) {
    const pts = [];
    for (let i = 0; i < 48; i++) {
      const a = (i / 48) * Math.PI * 2;
      const taper = 0.35 + 0.65 * (1 - Math.cos(a)) / 2;
      pts.push(new THREE.Vector2(-1.05 + scale * 1.05 * Math.cos(a), scale * 0.85 * Math.sin(a) * taper));
    }
    return pts;
  }
  const loopShape = new THREE.Shape(ringPoints(1));
  loopShape.holes.push(new THREE.Path(ringPoints(0.58)));
  const loopGeo = new THREE.ExtrudeGeometry(loopShape, { depth: 0.22, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.07, bevelSegments: 4, curveSegments: 24 });
  loopGeo.translate(0, 0, -0.11);

  const bow = new THREE.Group();
  bow.scale.setScalar(0.85);
  bow.position.y = 0.35;
  scene.add(bow);

  function side(flip) {
    const g = new THREE.Group();
    const loop = new THREE.Mesh(loopGeo, satin(0xe0809a));
    loop.rotation.z = -0.2; // tilt the loop upwards
    g.add(loop);
    if (flip) g.rotation.y = Math.PI;
    return g;
  }
  bow.add(side(false), side(true));

  /* Knot and two tails */
  const knot = new THREE.Mesh(new THREE.SphereGeometry(0.34, 32, 24), satin(0xb85a77));
  knot.scale.set(0.9, 1.15, 0.9);
  bow.add(knot);

  const tailShape = new THREE.Shape();
  tailShape.moveTo(-0.22, 0); tailShape.lineTo(0.22, 0); tailShape.lineTo(0.34, -1.5); tailShape.lineTo(0, -1.2); tailShape.lineTo(-0.34, -1.5); tailShape.closePath();
  const tailGeo = new THREE.ExtrudeGeometry(tailShape, { depth: 0.07, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 2 });
  [-1, 1].forEach(s => {
    const tail = new THREE.Mesh(tailGeo, satin(0xe99bb0));
    tail.position.set(0, -0.2, -0.1);
    tail.rotation.z = s * 0.28;
    bow.add(tail);
  });

  /* Floating berries and pearls */
  const floaters = [];
  const colors = [0xb5475f, 0xf2c2c8, 0xd98a9b, 0xb5475f];
  for (let i = 0; i < 12; i++) {
    const r = 0.1 + rnd() * 0.11;
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 20, 16), new THREE.MeshStandardMaterial({ color: colors[i % 4], roughness: 0.3 }));
    const a = (i / 12) * Math.PI * 2 + rnd() * 0.4, d = 1.75 + rnd() * 0.5;
    m.position.set(Math.cos(a) * d, Math.sin(a) * d * 0.85, -0.8 + rnd() * 2);
    m.userData = { baseY: m.position.y, phase: rnd() * 6.28, speed: 0.6 + rnd() * 0.6 };
    scene.add(m); floaters.push(m);
  }

  /* Sizing */
  const wrap = canvas.parentElement;
  function resize() {
    const w = wrap.clientWidth, hgt = wrap.clientHeight;
    if (!w || !hgt) return;
    renderer.setSize(w, hgt, false);
    camera.aspect = w / hgt;
    camera.position.z = camera.aspect < 1 ? 8.5 / camera.aspect * 0.9 : 8.5;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(wrap);
  resize();

  /* Interaction: follow the pointer, spin once when tapped */
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  if (!reduceMotion) {
    window.addEventListener("pointermove", e => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    });
  }
  let tap = 1; // 1 = not spinning
  let scrollTilt = 0;
  canvas.addEventListener("pointerdown", () => { if (!reduceMotion) tap = 0; });
  const ease = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  /* Animation loop (only while the hero is on screen) */
  const clock = new THREE.Clock();
  let visible = true, raf = 0;
  function frame() {
    const t = clock.getElapsedTime();
    mouse.x += (mouse.tx - mouse.x) * 0.06;
    mouse.y += (mouse.ty - mouse.y) * 0.06;
    let spin = 0;
    if (tap < 1) { tap = Math.min(1, tap + 0.02); spin = ease(tap) * Math.PI * 2; }

    bow.rotation.y = Math.sin(t * 0.5) * 0.35 + mouse.x * 0.5 + spin;
    bow.rotation.x = Math.sin(t * 0.7) * 0.05 + mouse.y * 0.25;
    bow.position.y = 0.35 + Math.sin(t * 1.1) * 0.1;
    const sv = (window.BOWBERRY_SCROLL && window.BOWBERRY_SCROLL.v) || 0; // scroll speed from smooth.js
    scrollTilt += (Math.max(-1, Math.min(1, sv * 0.04)) * 0.5 - scrollTilt) * 0.08;
    bow.rotation.z = scrollTilt;

    floaters.forEach(f => { const u = f.userData; f.position.y = u.baseY + Math.sin(t * u.speed + u.phase) * 0.18; });
    renderer.render(scene, camera);
    if (visible && !reduceMotion) raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (visible && !reduceMotion) { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); }
  }).observe(canvas);
  frame(); // with reduced motion this draws one still frame
})();
