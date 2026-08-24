/**
 * 12 Distinct High-End Generative Motion Scenes
 */

export const animations = {
  
  // 1. Cyberpunk Neon City Rain
  cyberpunk(ctx, width, height, elements, time, speed) {
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#040814'); grad.addColorStop(0.5, '#12002b'); grad.addColorStop(1, '#001b2e');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, width, height);

    ctx.lineWidth = 2;
    elements.forEach(p => {
      p.y += p.speedY * (speed / 2.5);
      if (p.y > height) p.y = -20;
      const rainGrad = ctx.createLinearGradient(p.x, p.y, p.x, p.y + 35);
      rainGrad.addColorStop(0, 'rgba(0, 242, 254, 0)'); rainGrad.addColorStop(1, 'rgba(255, 0, 127, 0.95)');
      ctx.strokeStyle = rainGrad; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - 2, p.y + 35); ctx.stroke();
    });
  },

  // 2. Cosmic Nebula Galaxy
  galaxy(ctx, width, height, elements, time) {
    ctx.fillStyle = '#05020f'; ctx.fillRect(0, 0, width, height);
    const cx = width / 2 + Math.cos(time * 0.4) * 120;
    const cy = height / 2 + Math.sin(time * 0.4) * 80;
    const nebGrad = ctx.createRadialGradient(cx, cy, 30, cx, cy, 450);
    nebGrad.addColorStop(0, 'rgba(168, 85, 247, 0.4)'); nebGrad.addColorStop(0.5, 'rgba(236, 72, 153, 0.18)'); nebGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = nebGrad; ctx.fillRect(0, 0, width, height);

    elements.forEach(p => {
      p.alpha += Math.sin(time * 2 + p.x) * 0.02;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(1, p.alpha))})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2); ctx.fill();
    });
  },

  // 3. Cozy Lofi Rain Drops
  lofi(ctx, width, height, elements) {
    ctx.fillStyle = '#120b05'; ctx.fillRect(0, 0, width, height);
    const warmGrad = ctx.createRadialGradient(width * 0.8, height * 0.2, 20, width * 0.8, height * 0.2, 500);
    warmGrad.addColorStop(0, 'rgba(245, 158, 11, 0.28)'); warmGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = warmGrad; ctx.fillRect(0, 0, width, height);

    elements.forEach(p => {
      p.y += p.speedY * 0.35; if (p.y > height) p.y = -10;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2); ctx.fill();
    });
  },

  // 4. Serene Bamboo Forest
  nature(ctx, width, height, elements, time) {
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#01241b'); grad.addColorStop(1, '#044a38');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, width, height);

    elements.forEach(p => {
      p.x += Math.sin(time + p.y * 0.01) * 1.8; p.y += p.speedY * 0.6; if (p.y > height) p.y = -10;
      ctx.fillStyle = 'rgba(16, 185, 129, 0.65)';
      ctx.beginPath(); ctx.ellipse(p.x, p.y, p.size * 2.2, p.size, Math.PI / 4, 0, Math.PI * 2); ctx.fill();
    });
  },

  // 5. High-End Synthwave Horizon (Polished Retro Grid)
  synthwave(ctx, width, height, elements, time, speed) {
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.65);
    skyGrad.addColorStop(0, '#0f051d'); skyGrad.addColorStop(0.5, '#2c0b47'); skyGrad.addColorStop(1, '#7a144e');
    ctx.fillStyle = skyGrad; ctx.fillRect(0, 0, width, height);

    // Glowing Neon Sun
    const sunY = height * 0.6;
    const sunGrad = ctx.createLinearGradient(0, sunY - 90, 0, sunY + 90);
    sunGrad.addColorStop(0, '#ff7eb3'); sunGrad.addColorStop(0.7, '#ff758c'); sunGrad.addColorStop(1, '#ffc078');
    ctx.fillStyle = sunGrad; ctx.beginPath(); ctx.arc(width / 2, sunY, 90, 0, Math.PI * 2); ctx.fill();

    // Moving 3D Grid Lines
    ctx.strokeStyle = 'rgba(255, 117, 140, 0.55)'; ctx.lineWidth = 1.8;
    const horizonY = sunY;
    const numLines = 30;
    
    // Perspective Lines
    for (let x = -width; x < width * 2; x += width / 12) {
      ctx.beginPath(); ctx.moveTo(width / 2, horizonY); ctx.lineTo(x, height); ctx.stroke();
    }

    // Moving Horizontal Lines
    const gridOffset = (time * speed * 25) % 40;
    for (let y = horizonY; y <= height; y += 15 + (y - horizonY) * 0.15) {
      const lineY = y + gridOffset * ((y - horizonY) / height);
      if (lineY <= height) {
        ctx.beginPath(); ctx.moveTo(0, lineY); ctx.lineTo(width, lineY); ctx.stroke();
      }
    }
  },

  // 6. Fluid Aurora Waves
  liquid(ctx, width, height, elements, time) {
    ctx.fillStyle = '#090d16'; ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 4; i++) {
      const colors = ['rgba(139, 92, 246, 0.3)', 'rgba(6, 182, 212, 0.25)', 'rgba(236, 72, 153, 0.2)', 'rgba(16, 185, 129, 0.18)'];
      ctx.fillStyle = colors[i];
      ctx.beginPath(); ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 30) {
        const y = Math.sin(x * 0.003 + time * 0.8 + i * 1.5) * 75 + height * 0.45 + (i * 35);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height); ctx.closePath(); ctx.fill();
    }
  },

  // 7. Matrix Digital Rain
  matrix(ctx, width, height, elements, time, speed) {
    ctx.fillStyle = '#011206'; ctx.fillRect(0, 0, width, height);
    ctx.font = '15px monospace';

    elements.forEach(p => {
      p.y += p.speedY * (speed / 2); if (p.y > height) p.y = -20;
      ctx.fillStyle = '#22c55e';
      ctx.fillText(p.char, p.x, p.y);
    });
  },

  // 8. Midnight Fireflies Glow
  fireflies(ctx, width, height, elements, time) {
    ctx.fillStyle = '#06070a'; ctx.fillRect(0, 0, width, height);

    elements.forEach(p => {
      p.x += Math.sin(time + p.y * 0.05) * 1.4;
      p.y += Math.cos(time + p.x * 0.05) * 1.4;
      
      const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
      glowGrad.addColorStop(0, 'rgba(234, 179, 8, 0.95)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 6, 0, Math.PI * 2); ctx.fill();
    });
  },

  // 9. Sunset Ocean Waves
  waves(ctx, width, height, elements, time) {
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#0c1427'); sky.addColorStop(0.6, '#1e3a8a'); sky.addColorStop(1, '#0284c7');
    ctx.fillStyle = sky; ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = `rgba(59, 130, 246, ${0.16 + i * 0.08})`;
      ctx.beginPath(); ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 30) {
        const y = Math.sin(x * 0.005 + time * 1.5 + i * 1.2) * (20 + i * 10) + height * 0.6 + (i * 35);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height); ctx.closePath(); ctx.fill();
    }
  },

  // --- 3 NEW SCENES ---

  // 10. NEW: Cyber Vortex Grid
  vortex(ctx, width, height, elements, time) {
    ctx.fillStyle = '#04020a'; ctx.fillRect(0, 0, width, height);
    const cx = width / 2, cy = height / 2;

    for (let r = 20; r < Math.max(width, height); r += 40) {
      ctx.strokeStyle = `rgba(0, 242, 254, ${Math.max(0.05, 0.4 - r / 1000)})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, r + Math.sin(time + r * 0.01) * 15, 0, Math.PI * 2);
      ctx.stroke();
    }
  },

  // 11. NEW: Electric Plasma Storm
  plasma(ctx, width, height, elements, time) {
    ctx.fillStyle = '#0a0014'; ctx.fillRect(0, 0, width, height);
    
    for (let i = 0; i < 5; i++) {
      const px = width * 0.5 + Math.sin(time * 0.8 + i) * (width * 0.35);
      const py = height * 0.5 + Math.cos(time * 0.6 + i) * (height * 0.35);
      const plasGrad = ctx.createRadialGradient(px, py, 10, px, py, 280);
      plasGrad.addColorStop(0, i % 2 === 0 ? 'rgba(255, 0, 127, 0.45)' : 'rgba(0, 242, 254, 0.45)');
      plasGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = plasGrad; ctx.fillRect(0, 0, width, height);
    }
  },

  // 12. NEW: Golden Sunbeams
  sunbeams(ctx, width, height, elements, time) {
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#1c1305'); bgGrad.addColorStop(1, '#080501');
    ctx.fillStyle = bgGrad; ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.translate(width * 0.2, 0);
    ctx.rotate(Math.PI / 6);
    
    for (let i = -width; i < width * 2; i += 60) {
      const beamGrad = ctx.createLinearGradient(i, 0, i, height * 1.5);
      beamGrad.addColorStop(0, 'rgba(251, 191, 36, 0.25)');
      beamGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = beamGrad;
      ctx.fillRect(i + Math.sin(time + i) * 10, 0, 35, height * 1.5);
    }
    ctx.restore();
  }

};
