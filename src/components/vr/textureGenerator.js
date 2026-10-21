// src/components/vr/textureGenerator.js
import * as THREE from 'three';

/**
 * Creates procedural high-res textures for Three.js materials
 */

// Helper to convert canvas to Three texture
const canvasToTexture = (canvas) => {
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

// 1. ID Card Front Texture
export const createIdCardTexture = (item) => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 512, 800);

  // Top Navy Blue Banner
  const gradient = ctx.createLinearGradient(0, 0, 512, 0);
  gradient.addColorStop(0, '#1e3a8a');
  gradient.addColorStop(1, '#2563eb');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 160);

  // College Name Text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 28px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('VCET ENGINEERING', 256, 60);

  ctx.font = 'bold 18px Inter, sans-serif';
  ctx.fillStyle = '#93c5fd';
  ctx.fillText('STUDENT IDENTIFICATION CARD', 256, 95);

  // Decorative Line
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(40, 150, 432, 6);

  // Photo Box Outline & Placeholder Photo
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(166, 190, 180, 220);
  ctx.strokeStyle = '#2563eb';
  ctx.lineWidth = 4;
  ctx.strokeRect(166, 190, 180, 220);

  // Avatar icon inside photo
  ctx.fillStyle = '#3b82f6';
  ctx.beginPath();
  ctx.arc(256, 260, 45, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(256, 370, 70, Math.PI, 0);
  ctx.fill();

  // Student Info Details
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 26px Inter, sans-serif';
  ctx.fillText(item?.title?.includes('Anushka') ? 'ANUSHKA MALI' : 'STUDENT CARD', 256, 460);

  ctx.fillStyle = '#2563eb';
  ctx.font = 'bold 20px Inter, sans-serif';
  ctx.fillText('DEPT: AI & DATA SCIENCE', 256, 495);

  ctx.fillStyle = '#64748b';
  ctx.font = '16px Inter, sans-serif';
  ctx.fillText('ID: 2024-VCET-AI-042', 256, 530);
  ctx.fillText('YEAR: 2ND YEAR (SE)', 256, 555);

  // Barcode representation
  ctx.fillStyle = '#0f172a';
  for (let x = 60; x < 452; x += Math.floor(Math.random() * 8) + 4) {
    const width = Math.random() > 0.5 ? 4 : 2;
    ctx.fillRect(x, 600, width, 60);
  }

  // AI & DS Mark Sticker (Distinguishing Mark!)
  ctx.fillStyle = '#ec4899';
  ctx.beginPath();
  ctx.arc(430, 700, 35, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('AI&DS', 430, 706);

  // Clear plastic reflection gloss effect
  const glossGrad = ctx.createLinearGradient(0, 0, 512, 800);
  glossGrad.addColorStop(0, 'rgba(255,255,255,0.2)');
  glossGrad.addColorStop(0.5, 'rgba(255,255,255,0)');
  glossGrad.addColorStop(1, 'rgba(255,255,255,0.1)');
  ctx.fillStyle = glossGrad;
  ctx.fillRect(0, 0, 512, 800);

  return canvasToTexture(canvas);
};

// 2. NASA Sticker Texture
export const createNasaStickerTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Circle background
  ctx.fillStyle = '#0b3d91';
  ctx.beginPath();
  ctx.arc(128, 128, 120, 0, Math.PI * 2);
  ctx.fill();

  // White border
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 8;
  ctx.stroke();

  // Red vector swoop
  ctx.strokeStyle = '#fc3d21';
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.moveTo(30, 160);
  ctx.quadraticCurveTo(128, 40, 226, 160);
  ctx.stroke();

  // NASA Text
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 64px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('NASA', 128, 150);

  // Stars
  ctx.fillStyle = '#ffffff';
  for (let i = 0; i < 25; i++) {
    const x = 30 + Math.random() * 196;
    const y = 30 + Math.random() * 196;
    const size = Math.random() * 3 + 1;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  return canvasToTexture(canvas);
};

// 3. Leather Bump/Normal Grain Pattern
export const createLeatherTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, 256, 256);

  // Noise texture
  for (let i = 0; i < 8000; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const opacity = Math.random() * 0.15;
    ctx.fillStyle = Math.random() > 0.5 ? `rgba(255,255,255,${opacity})` : `rgba(0,0,0,${opacity})`;
    ctx.fillRect(x, y, 2, 2);
  }

  // Silver coin logo inside pocket
  ctx.fillStyle = '#94a3b8';
  ctx.beginPath();
  ctx.arc(200, 200, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#cbd5e1';
  ctx.font = 'bold 12px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('₹5', 200, 204);

  return canvasToTexture(canvas);
};

// 4. Smartphone Screen Texture
export const createPhoneScreenTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');

  // Gradient wallpaper
  const grad = ctx.createLinearGradient(0, 0, 300, 600);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(0.5, '#3b82f6');
  grad.addColorStop(1, '#8b5cf6');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 300, 600);

  // Time & Status bar
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 42px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('10:45', 150, 140);

  ctx.font = '500 16px Inter, sans-serif';
  ctx.fillText('Tuesday, September 29', 150, 175);

  // Notification widget card
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.roundRect ? ctx.roundRect(20, 240, 260, 90, 16) : ctx.fillRect(20, 240, 260, 90);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 14px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('VCET Campus App', 40, 270);
  ctx.font = '12px Inter, sans-serif';
  ctx.fillText('Campus Fest Pass Verified ✓', 40, 295);

  return canvasToTexture(canvas);
};

// 5. TechMax Book Cover Texture
export const createBookCoverTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');

  // Yellow & Blue background
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(0, 0, 400, 600);

  ctx.fillStyle = '#1e3a8a';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(400, 0);
  ctx.lineTo(0, 350);
  ctx.closePath();
  ctx.fill();

  // Book Title
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 30px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('ENGINEERING', 30, 70);
  ctx.fillText('MATHEMATICS III', 30, 110);

  ctx.fillStyle = '#93c5fd';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('SE / COMP & AI-DS', 30, 150);

  // TechMax Logo
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(30, 500, 120, 40);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('TechMax', 90, 528);

  return canvasToTexture(canvas);
};
