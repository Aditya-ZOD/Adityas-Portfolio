import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const HeroVisual3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion for accessibility
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Verify WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch {
      setWebGlSupported(false);
      return;
    }

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / (container.clientHeight || 1),
      0.1,
      1000
    );
    camera.position.z = 85;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);
    } catch {
      setWebGlSupported(false);
      return;
    }

    // 2. Parent Group for Unified Transformation
    const constellationGroup = new THREE.Group();
    scene.add(constellationGroup);

    // 3. Neural Constellation Geometry
    const particleCount = window.innerWidth < 768 ? 75 : 130;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const radius = 35;
    const colorCyan = new THREE.Color(0x38bdf8);
    const colorViolet = new THREE.Color(0xa855f7);
    const colorEmerald = new THREE.Color(0x10b981);

    for (let i = 0; i < particleCount; i++) {
      // Golden spiral distribution on sphere with organic variation
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;

      const r = radius * (0.8 + Math.random() * 0.4);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Harmonious cyberpunk color palette
      const mixedColor = i % 3 === 0 ? colorCyan : i % 3 === 1 ? colorViolet : colorEmerald;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const pMaterial = new THREE.PointsMaterial({
      size: 2.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, pMaterial);
    constellationGroup.add(particles);

    // 4. Line Connections Between Nearby Nodes
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];
    const maxDistance = 22;

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }

    lineGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    constellationGroup.add(lines);

    // 5. Wireframe Inner Gyroscopic Core
    const coreGeo = new THREE.IcosahedronGeometry(14, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    constellationGroup.add(core);

    // 6. Orbiting Pulse Satellites (Dynamic Motion Indicators)
    const satelliteGeo = new THREE.SphereGeometry(1.4, 16, 16);
    const sat1Mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const sat2Mat = new THREE.MeshBasicMaterial({ color: 0xa855f7 });
    const sat3Mat = new THREE.MeshBasicMaterial({ color: 0x10b981 });

    const sat1 = new THREE.Mesh(satelliteGeo, sat1Mat);
    const sat2 = new THREE.Mesh(satelliteGeo, sat2Mat);
    const sat3 = new THREE.Mesh(satelliteGeo, sat3Mat);
    constellationGroup.add(sat1);
    constellationGroup.add(sat2);
    constellationGroup.add(sat3);

    // 7. Interaction & Motion Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) / windowHalfX;
      mouseY = (event.clientY - windowHalfY) / windowHalfY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;
        mouseX = (event.touches[0].clientX - windowHalfX) / windowHalfX;
        mouseY = (event.touches[0].clientY - windowHalfY) / windowHalfY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 8. Animation Loop Driven by THREE.Clock
    const clock = new THREE.Clock();
    let animId: number;

    const rotSpeed = prefersReducedMotion ? 0.12 : 0.38;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!renderer) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Continuous, guaranteed visible rotation of constellation
      constellationGroup.rotation.y += delta * rotSpeed;
      constellationGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.12;

      // Counter-rotating inner icosahedron core (gyroscopic visual depth)
      core.rotation.y -= delta * (rotSpeed * 1.5);
      core.rotation.z += delta * (rotSpeed * 0.8);

      // Subtle living breathing pulse
      const pulse = 1 + Math.sin(elapsedTime * 1.8) * 0.035;
      particles.scale.set(pulse, pulse, pulse);
      lines.scale.set(pulse, pulse, pulse);

      // Orbiting satellites along distinct inclination angles
      const orbitR = 38;
      sat1.position.set(
        Math.cos(elapsedTime * 1.2) * orbitR,
        Math.sin(elapsedTime * 1.2) * (orbitR * 0.6),
        Math.sin(elapsedTime * 1.2) * (orbitR * 0.8)
      );
      sat2.position.set(
        Math.sin(elapsedTime * 0.9 + 2) * orbitR,
        Math.cos(elapsedTime * 0.9 + 2) * (orbitR * 0.7),
        Math.cos(elapsedTime * 0.9 + 2) * (orbitR * 0.5)
      );
      sat3.position.set(
        Math.cos(elapsedTime * 1.5 + 4) * (orbitR * 0.8),
        -Math.sin(elapsedTime * 1.5 + 4) * (orbitR * 0.9),
        Math.sin(elapsedTime * 1.5 + 4) * orbitR
      );

      // Smooth camera parallax tracking
      if (!prefersReducedMotion) {
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        camera.position.x = targetX * 18;
        camera.position.y = -targetY * 14;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }
      geometry.dispose();
      lineGeometry.dispose();
      pMaterial.dispose();
      lineMaterial.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      satelliteGeo.dispose();
      sat1Mat.dispose();
      sat2Mat.dispose();
      sat3Mat.dispose();
    };
  }, []);

  if (!webGlSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
        <div className="w-72 h-72 rounded-full bg-gradient-to-tr from-electric-blue/20 via-cyber-violet/20 to-electric-cyan/20 blur-3xl animate-pulse" />
        <div className="absolute inset-0 bg-dots-pattern opacity-20" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative cursor-grab active:cursor-grabbing"
      aria-hidden="true"
    />
  );
};
