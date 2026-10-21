// src/components/vr/Item3DViewer.jsx
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  createIdCardTexture,
  createNasaStickerTexture,
  createLeatherTexture,
  createPhoneScreenTexture,
  createBookCoverTexture,
} from './textureGenerator';
import { RotateCw, Sun, Moon, Sparkles, Eye, ShieldCheck, Box, Maximize2, Zap, AlertCircle } from 'lucide-react';

export const Item3DViewer = ({ item, height = '460px', showControls = true, onSelectMark }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const modelGroupRef = useRef(null);
  const spotlightRef = useRef(null);

  const [isRotating, setIsRotating] = useState(true);
  const [lightMode, setLightMode] = useState('studio'); // 'studio', 'sunlight', 'night', 'cyber'
  const [wireframe, setWireframe] = useState(false);
  const [isVrSimulated, setIsVrSimulated] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [xrSupported, setXrSupported] = useState(false);

  // Check WebXR hardware support
  useEffect(() => {
    if (navigator.xr) {
      navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
        setXrSupported(supported);
      });
    }
  }, []);

  // Determine item category & marks
  const category = item?.category || 'idcard';
  const colorHex = item?.color?.toLowerCase().includes('blue')
    ? 0x2563eb
    : item?.color?.toLowerCase().includes('black')
    ? 0x1e293b
    : item?.color?.toLowerCase().includes('yellow')
    ? 0xeab308
    : item?.color?.toLowerCase().includes('silver')
    ? 0xcbd5e1
    : 0x4f46e5;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth;
    const heightPx = container.clientHeight || 460;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 100);
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // Clear old canvases
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting Group
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 8, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const rimLight = new THREE.PointLight(0x3b82f6, 1.5, 10);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    // Night flashlight spotlight
    const spotlight = new THREE.SpotLight(0xffffff, 3, 15, Math.PI / 6, 0.5, 1);
    spotlight.position.set(0, 0, 4);
    spotlight.target.position.set(0, 0, 0);
    spotlight.visible = false;
    scene.add(spotlight);
    scene.add(spotlight.target);
    spotlightRef.current = spotlight;

    // 5. Main Model Container Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // 6. Build Category-Specific 3D Models
    build3DModel(category, modelGroup, item, wireframe);

    // 7. Hotspot Markers
    const hotspots = getHotspotsForCategory(category, item);

    // 8. Orbit Interaction Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (spotlightRef.current && lightMode === 'night') {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        spotlightRef.current.position.x = x * 3;
        spotlightRef.current.position.y = y * 3;
      }

      if (!isDragging || !modelGroupRef.current) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      modelGroupRef.current.rotation.y += deltaX * 0.01;
      modelGroupRef.current.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      cameraRef.current.position.z = THREE.MathUtils.clamp(
        cameraRef.current.position.z + e.deltaY * 0.003,
        2.2,
        8.0
      );
    };

    // Touch Controls
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e) => {
      if (!isDragging || !modelGroupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      modelGroupRef.current.rotation.y += deltaX * 0.01;
      modelGroupRef.current.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElem.addEventListener('wheel', handleWheel, { passive: false });
    domElem.addEventListener('touchstart', handleTouchStart);
    domElem.addEventListener('touchmove', handleTouchMove);
    domElem.addEventListener('touchend', handleTouchEnd);

    // 9. Render Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (isRotating && modelGroupRef.current && !isDragging) {
        modelGroupRef.current.rotation.y += 0.008;
      }

      // Gentle floating animation
      if (modelGroupRef.current) {
        modelGroupRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 10. Handle Resize
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 460;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElem.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElem.removeEventListener('wheel', handleWheel);
      domElem.removeEventListener('touchstart', handleTouchStart);
      domElem.removeEventListener('touchmove', handleTouchMove);
      domElem.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, [category, item, wireframe, isRotating, lightMode]);

  // Handle Light Mode Changes
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    if (lightMode === 'night') {
      scene.background = new THREE.Color(0x050814);
      if (spotlightRef.current) spotlightRef.current.visible = true;
    } else if (lightMode === 'cyber') {
      scene.background = new THREE.Color(0x090d16);
      if (spotlightRef.current) spotlightRef.current.visible = false;
    } else if (lightMode === 'sunlight') {
      scene.background = null;
      if (spotlightRef.current) spotlightRef.current.visible = false;
    } else {
      scene.background = null;
      if (spotlightRef.current) spotlightRef.current.visible = false;
    }
  }, [lightMode]);

  // Focus Mark Hotspot
  const handleFocusMark = (hotspot) => {
    setSelectedHotspot(hotspot);
    if (onSelectMark) onSelectMark(hotspot);

    if (modelGroupRef.current) {
      modelGroupRef.current.rotation.x = hotspot.targetRotX || 0;
      modelGroupRef.current.rotation.y = hotspot.targetRotY || 0;
    }
    if (cameraRef.current) {
      cameraRef.current.position.z = 3.2;
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: height, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          background: lightMode === 'cyber' ? 'radial-gradient(circle, #1e1b4b 0%, #090d16 100%)' : lightMode === 'night' ? '#050814' : 'transparent',
        }}
      />

      {/* Simulated Stereoscopic VR Overlay Mode */}
      {isVrSimulated && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            display: 'flex',
            backgroundColor: '#000',
            pointerEvents: 'none',
          }}
        >
          {/* Left Lens View */}
          <div style={{ flex: 1, borderRight: '2px solid #222', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', width: '120px', height: '120px', border: '1px dashed #3b82f6', borderRadius: '50%', opacity: 0.4 }} />
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: '#93c5fd', fontSize: '0.7rem', fontWeight: '700' }}>
              VR LENS L (STEREOSCOPIC)
            </div>
          </div>
          {/* Right Lens View */}
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', width: '120px', height: '120px', border: '1px dashed #3b82f6', borderRadius: '50%', opacity: 0.4 }} />
            <div style={{ position: 'absolute', bottom: '20px', right: '20px', color: '#93c5fd', fontSize: '0.7rem', fontWeight: '700' }}>
              VR LENS R (WEBXR IMMERSIVE)
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid #3b82f6',
              color: 'white',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '0.8125rem',
              fontWeight: '700',
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Sparkles size={16} style={{ color: '#60a5fa' }} /> VR Headset Simulation Active
            <button
              onClick={() => setIsVrSimulated(false)}
              style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: '12px', padding: '2px 8px', fontSize: '0.75rem', cursor: 'pointer', marginLeft: '8px' }}
            >
              Exit VR
            </button>
          </div>
        </div>
      )}

      {/* Floating Interactive Distinguishing Mark Hotspots */}
      {getHotspotsForCategory(category, item).map((hs, i) => (
        <button
          key={i}
          onClick={() => handleFocusMark(hs)}
          style={{
            position: 'absolute',
            top: hs.top || '40%',
            left: hs.left || '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: selectedHotspot?.title === hs.title ? '#ec4899' : '#2563eb',
            color: 'white',
            border: '2px solid white',
            borderRadius: 'var(--radius-full)',
            padding: '4px 10px',
            fontSize: '0.75rem',
            fontWeight: '800',
            cursor: 'pointer',
            boxShadow: '0 0 16px rgba(37, 99, 235, 0.8)',
            zIndex: 5,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            animation: 'floatSlow 2s infinite ease-in-out',
          }}
        >
          <Sparkles size={14} /> {hs.title}
        </button>
      ))}

      {/* Selected Mark Detail Tooltip Card */}
      {selectedHotspot && (
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '16px',
            right: '16px',
            backgroundColor: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            zIndex: 6,
            border: '1px solid #3b82f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#93c5fd', fontWeight: '800' }}>
              🔍 3D DISTINGUISHING MARK VERIFIED
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: '700', marginTop: '2px' }}>{selectedHotspot.title}</div>
            <div style={{ fontSize: '0.8125rem', color: '#cbd5e1' }}>{selectedHotspot.description}</div>
          </div>
          <button
            onClick={() => setSelectedHotspot(null)}
            style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 8px', fontSize: '0.75rem', cursor: 'pointer' }}
          >
            Close
          </button>
        </div>
      )}

      {/* Top 3D Indicator Badge */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          zIndex: 4,
        }}
      >
        <span
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(6px)',
            color: 'white',
            fontSize: '0.75rem',
            fontWeight: '700',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          <Box size={14} style={{ color: '#60a5fa' }} /> 3D VR Inspection Model
        </span>

        {item?.distinguishingFeatures && (
          <span
            style={{
              backgroundColor: 'rgba(236, 72, 153, 0.9)',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: '700',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Sparkles size={12} /> Mark Hotspots Available
          </span>
        )}
      </div>

      {/* Bottom Interactive VR Control Bar */}
      {showControls && (
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            right: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(10px)',
            padding: '8px 12px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            zIndex: 4,
          }}
        >
          {/* Rotation Toggle */}
          <button
            onClick={() => setIsRotating(!isRotating)}
            style={{
              background: isRotating ? '#2563eb' : 'transparent',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: '6px 12px',
              fontSize: '0.75rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <RotateCw size={14} /> {isRotating ? 'Auto Orbiting' : 'Rotate Paused'}
          </button>

          {/* Lighting Mode Picker */}
          <div style={{ display: 'flex', gap: '4px', backgroundColor: 'rgba(255,255,255,0.1)', padding: '2px', borderRadius: 'var(--radius-md)' }}>
            {[
              { id: 'studio', label: 'Studio', icon: Sun },
              { id: 'sunlight', label: 'Daylight', icon: Sun },
              { id: 'night', label: 'Night Flashlight', icon: Moon },
              { id: 'cyber', label: 'VR Matrix', icon: Zap },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setLightMode(m.id)}
                style={{
                  background: lightMode === m.id ? '#2563eb' : 'transparent',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  padding: '4px 8px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Wireframe / X-Ray Toggle */}
          <button
            onClick={() => setWireframe(!wireframe)}
            style={{
              background: wireframe ? '#7c3aed' : 'transparent',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 'var(--radius-md)',
              padding: '6px 10px',
              fontSize: '0.75rem',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            {wireframe ? 'Solid View' : 'X-Ray / Wireframe'}
          </button>

          {/* VR Trigger Button */}
          <button
            onClick={() => setIsVrSimulated(!isVrSimulated)}
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: '6px 14px',
              fontSize: '0.75rem',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 0 12px rgba(236, 72, 153, 0.4)',
            }}
          >
            <Eye size={14} /> Enter VR Headset View
          </button>
        </div>
      )}
    </div>
  );
};

// ----------------------------------------------------
// 3D Geometry Builder for Categories
// ----------------------------------------------------
function build3DModel(category, group, item, wireframe) {
  const isLost = item?.type === 'lost';

  if (category === 'idcard') {
    // 1. ID Card Mesh
    const cardGeo = new THREE.BoxGeometry(1.6, 2.4, 0.04);
    const idTexture = createIdCardTexture(item);
    const cardMat = new THREE.MeshStandardMaterial({
      map: idTexture,
      roughness: 0.3,
      metalness: 0.1,
      wireframe,
    });
    const cardMesh = new THREE.Mesh(cardGeo, cardMat);
    cardMesh.castShadow = true;
    cardMesh.receiveShadow = true;
    group.add(cardMesh);

    // 2. Plastic Holder Frame
    const frameGeo = new THREE.BoxGeometry(1.7, 2.5, 0.06);
    const frameMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.85,
      opacity: 1,
      transparent: true,
      roughness: 0.1,
      ior: 1.5,
      wireframe,
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    group.add(frameMesh);

    // 3. Navy Blue Lanyard Strap
    const strapGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.0, 16);
    const strapMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, wireframe });
    const strapMesh = new THREE.Mesh(strapGeo, strapMat);
    strapMesh.position.set(0, 2.0, 0);
    group.add(strapMesh);
  } else if (category === 'wallet') {
    // 1. Leather Bifold Wallet
    const walletGeo = new THREE.BoxGeometry(2.2, 1.6, 0.4);
    const leatherTex = createLeatherTexture();
    const walletMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      bumpMap: leatherTex,
      bumpScale: 0.05,
      roughness: 0.7,
      wireframe,
    });
    const walletMesh = new THREE.Mesh(walletGeo, walletMat);
    walletMesh.castShadow = true;
    group.add(walletMesh);

    // 2. Metro Card Poking Out
    const cardGeo = new THREE.BoxGeometry(1.2, 0.8, 0.02);
    const cardMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, wireframe });
    const cardMesh = new THREE.Mesh(cardGeo, cardMat);
    cardMesh.position.set(0.4, 0.3, 0.15);
    cardMesh.rotation.z = -0.15;
    group.add(cardMesh);
  } else if (category === 'earphones') {
    // AirPods 2nd Gen Case
    const caseGeo = new THREE.SphereGeometry(0.9, 32, 32);
    caseGeo.scale(1.1, 1.3, 0.7);
    const caseMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.1,
      clearcoat: 1.0,
      wireframe,
    });
    const caseMesh = new THREE.Mesh(caseGeo, caseMat);
    caseMesh.castShadow = true;
    group.add(caseMesh);

    // Silicone Cover (Black)
    const coverGeo = new THREE.SphereGeometry(0.95, 32, 32);
    coverGeo.scale(1.12, 1.32, 0.72);
    const coverMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9, wireframe });
    const coverMesh = new THREE.Mesh(coverGeo, coverMat);
    group.add(coverMesh);

    // Batman Keychain Attachment
    const keyGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.05, 16);
    const keyMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, wireframe });
    const keyMesh = new THREE.Mesh(keyGeo, keyMat);
    keyMesh.position.set(1.1, -0.6, 0);
    group.add(keyMesh);
  } else if (category === 'electronics') {
    // Smartphone / Calculator
    if (item?.title?.toLowerCase().includes('calculator')) {
      const calcGeo = new THREE.BoxGeometry(1.6, 2.8, 0.3);
      const calcMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4, wireframe });
      const calcMesh = new THREE.Mesh(calcGeo, calcMat);
      calcMesh.castShadow = true;
      group.add(calcMesh);

      // Slide cover engraved text representation
      const textGeo = new THREE.BoxGeometry(1.2, 0.4, 0.04);
      const textMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, wireframe });
      const textMesh = new THREE.Mesh(textGeo, textMat);
      textMesh.position.set(0, -0.8, -0.16);
      group.add(textMesh);
    } else {
      const phoneGeo = new THREE.BoxGeometry(1.5, 3.0, 0.18);
      const phoneMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.2, wireframe });
      const phoneMesh = new THREE.Mesh(phoneGeo, phoneMat);
      phoneMesh.castShadow = true;
      group.add(phoneMesh);

      // Screen
      const screenGeo = new THREE.PlaneGeometry(1.4, 2.8);
      const screenTex = createPhoneScreenTexture();
      const screenMat = new THREE.MeshBasicMaterial({ map: screenTex, wireframe });
      const screenMesh = new THREE.Mesh(screenGeo, screenMat);
      screenMesh.position.set(0, 0, 0.1);
      group.add(screenMesh);
    }
  } else if (category === 'books') {
    // TechMax Math Book
    const bookGeo = new THREE.BoxGeometry(2.0, 2.7, 0.4);
    const bookTex = createBookCoverTexture();
    const bookMat = new THREE.MeshStandardMaterial({ map: bookTex, roughness: 0.5, wireframe });
    const bookMesh = new THREE.Mesh(bookGeo, bookMat);
    bookMesh.castShadow = true;
    group.add(bookMesh);
  } else if (category === 'other' || item?.title?.toLowerCase().includes('bottle')) {
    // Milton Blue Water Bottle
    const bodyGeo = new THREE.CylinderGeometry(0.7, 0.7, 2.6, 32);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.6, roughness: 0.3, wireframe });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.castShadow = true;
    group.add(bodyMesh);

    // Cap
    const capGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 32);
    const capMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2, wireframe });
    const capMesh = new THREE.Mesh(capGeo, capMat);
    capMesh.position.set(0, 1.55, 0);
    group.add(capMesh);

    // NASA Space Sticker
    const nasaGeo = new THREE.PlaneGeometry(0.8, 0.8);
    const nasaTex = createNasaStickerTexture();
    const nasaMat = new THREE.MeshStandardMaterial({ map: nasaTex, transparent: true, wireframe });
    const nasaMesh = new THREE.Mesh(nasaGeo, nasaMat);
    nasaMesh.position.set(0, 0, 0.71);
    group.add(nasaMesh);
  } else {
    // Generic Sleek 3D Package Box
    const boxGeo = new THREE.BoxGeometry(2.0, 1.8, 1.4);
    const boxMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.5, wireframe });
    const boxMesh = new THREE.Mesh(boxGeo, boxMat);
    boxMesh.castShadow = true;
    group.add(boxMesh);
  }
}

// ----------------------------------------------------
// Hotspot Coordinates & Mark Info
// ----------------------------------------------------
function getHotspotsForCategory(category, item) {
  if (category === 'idcard') {
    return [
      {
        title: 'AI & DS Sticker',
        top: '68%',
        left: '72%',
        description: 'Bright pink AI & DS department sticker attached on lower corner of clear holder.',
        targetRotX: 0,
        targetRotY: 0,
      },
      {
        title: 'Clear Lanyard Strap',
        top: '18%',
        left: '50%',
        description: 'Official VCET navy blue woven lanyard strap with metal clasp.',
        targetRotX: 0.4,
        targetRotY: 0,
      },
    ];
  } else if (category === 'wallet') {
    return [
      {
        title: 'Metro Card Pocket',
        top: '35%',
        left: '60%',
        description: 'College metro pass card sticking out of interior credit card slot.',
        targetRotX: -0.3,
        targetRotY: 0.2,
      },
      {
        title: 'Silver Coin Emblem',
        top: '70%',
        left: '75%',
        description: 'Small silver ₹5 coin inside coin zip pouch.',
        targetRotX: 0,
        targetRotY: 0,
      },
    ];
  } else if (category === 'earphones') {
    return [
      {
        title: 'Batman Keychain',
        top: '70%',
        left: '80%',
        description: 'Miniature black & yellow rubber Batman emblem charm attached to lanyard loop.',
        targetRotX: 0,
        targetRotY: -0.5,
      },
    ];
  } else if (category === 'electronics') {
    return [
      {
        title: 'Engraved Initials A. Mali',
        top: '75%',
        left: '50%',
        description: 'Small engraved name sticker "A. Mali" on back slide cover.',
        targetRotX: 0,
        targetRotY: 3.14,
      },
    ];
  } else if (category === 'other' || item?.title?.toLowerCase().includes('bottle')) {
    return [
      {
        title: 'NASA Space Sticker',
        top: '48%',
        left: '50%',
        description: 'Circular official NASA space emblem sticker pasted on front metallic body.',
        targetRotX: 0,
        targetRotY: 0,
      },
    ];
  } else if (category === 'books') {
    return [
      {
        title: 'Highlighted Laplace Notes',
        top: '40%',
        left: '45%',
        description: 'Yellow highlighted text and handwritten notes on Laplace transforms in Chapter 3.',
        targetRotX: 0.2,
        targetRotY: 0,
      },
    ];
  }

  return [
    {
      title: 'Distinguishing Feature',
      top: '50%',
      left: '50%',
      description: item?.distinguishingFeatures || 'Inspect item surface details in 3D.',
      targetRotX: 0,
      targetRotY: 0,
    },
  ];
}
