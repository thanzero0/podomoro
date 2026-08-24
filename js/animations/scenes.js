/**
 * 15 High-End Architectural & Spatial Canvas Motion Scenes
 * Clean Vector Silhouettes (City Skylines, Planets, Sunbeams, Vortex, Cyber Wireframes)
 */

export const animations = {
  
  // 1. Cyberpunk Neon City (Cyber Skyline Silhouette + Neon Rain + Glowing Windows)
  cyberpunk(ctx, width, height, elements, time, speed) {
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#030611'); grad.addColorStop(0.6, '#100026'); grad.addColorStop(1, '#001428');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, width, height);

    // City Skyline Silhouette
    ctx.fillStyle = '#070a14';
    const buildingWidths = [80, 110, 70, 140, 90, 120, 100, 130, 85, 115];
    let currentX = 0;
    buildingWidths.forEach((bw, i) => {
      const bh = 140 + (i % 5) * 45;
      ctx.fillRect(currentX, height - bh, bw, bh);
      
      // Neon Windows
      ctx.fillStyle = i % 2 === 0 ? 'rgba(0, 242, 254, 0.4)' : 'rgba(255, 0, 127, 0.4)';
      for (let wx = currentX + 12; wx < currentX + bw - 12; wx += 18) {
        for (let wy = height - bh + 20; wy < height - 20; wy += 24) {
          if ((wx + wy) % 3 === 0) ctx.fillRect(wx, wy, 8, 12);
        }
      }
      ctx.fillStyle = '#070a14';
      currentX += bw + 6;
    });

    // Ambient Neon Rain Streaks
    ctx.lineWidth = 1.8;
    elements.forEach(p => {
      p.y += p.speedY * (speed / 2.5); if (p.y > height) p.y = -20;
      const rainGrad = ctx.createLinearGradient(p.x, p.y, p.x, p.y + 30);
      rainGrad.addColorStop(0, 'rgba(0, 242, 254, 0)'); rainGrad.addColorStop(1, 'rgba(255, 0, 127, 0.85)');
      ctx.strokeStyle = rainGrad; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - 1, p.y + 30); ctx.stroke();
    });
  },

  // 2. Cosmic Planet Horizon (Giant Saturn Ring Planet Silhouette + Nebulae)
  galaxy(ctx, width, height, elements, time) {
    ctx.fillStyle = '#04020a'; ctx.fillRect(0, 0, width, height);
    
    // Glowing Nebula Backlight
    const nebGrad = ctx.createRadialGradient(width * 0.7, height * 0.4, 50, width * 0.7, height * 0.4, 500);
    nebGrad.addColorStop(0, 'rgba(168, 85, 247, 0.45)'); nebGrad.addColorStop(0.5, 'rgba(236, 72, 153, 0.2)'); nebGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = nebGrad; ctx.fillRect(0, 0, width, height);

    // Planet Body Silhouette
    const px = width * 0.7, py = height * 0.4, pr = 130;
    ctx.fillStyle = '#0c071a'; ctx.beginPath(); ctx.arc(px, py, pr, 0, Math.PI * 2); ctx.fill();

    // Planet Rings
    ctx.save();
    ctx.translate(px, py); ctx.rotate(-Math.PI / 6);
    ctx.strokeStyle = 'rgba(236, 72, 153, 0.6)'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.ellipse(0, 0, pr * 2.2, pr * 0.4, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();

    // Starfield Twinkle
    elements.forEach(p => {
      p.alpha += Math.sin(time * 2 + p.x) * 0.02;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(1, p.alpha))})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2); ctx.fill();
    });
  },

  // 3. Cozy Cafe Window Silhouette
  lofi(ctx, width, height, elements) {
    ctx.fillStyle = '#100a04'; ctx.fillRect(0, 0, width, height);
    const warmGrad = ctx.createRadialGradient(width * 0.8, height * 0.2, 20, width * 0.8, height * 0.2, 550);
    warmGrad.addColorStop(0, 'rgba(245, 158, 11, 0.3)'); warmGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = warmGrad; ctx.fillRect(0, 0, width, height);

    // Window Frame Silhouette
    ctx.strokeStyle = '#050301'; ctx.lineWidth = 14;
    ctx.strokeRect(0, 0, width, height);
    ctx.beginPath(); ctx.moveTo(width / 2, 0); ctx.lineTo(width / 2, height); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, height * 0.4); ctx.lineTo(width, height * 0.4); ctx.stroke();

    // Rain Condensation Drops
    elements.forEach(p => {
      p.y += p.speedY * 0.3; if (p.y > height) p.y = -10;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2); ctx.fill();
    });
  },

  // 4. Serene Mountain Forest Horizon
  nature(ctx, width, height, elements, time) {
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#012018'); grad.addColorStop(1, '#044232');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, width, height);

    // Mountain Silhouettes
    ctx.fillStyle = '#021711';
    ctx.beginPath(); ctx.moveTo(0, height);
    ctx.lineTo(0, height - 180); ctx.lineTo(width * 0.3, height - 320); ctx.lineTo(width * 0.65, height - 160); ctx.lineTo(width, height - 290); ctx.lineTo(width, height);
    ctx.fill();

    // Swaying Emerald Fireflies
    elements.forEach(p => {
      p.x += Math.sin(time + p.y * 0.01) * 1.6; p.y += p.speedY * 0.5; if (p.y > height) p.y = -10;
      ctx.fillStyle = 'rgba(16, 185, 129, 0.6)';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 1.2, 0, Math.PI * 2); ctx.fill();
    });
  },

  // 5. Fixed Ultra Smooth Retro Synthwave Horizon Grid
  synthwave(ctx, width, height, elements, time, speed) {
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.65);
    skyGrad.addColorStop(0, '#0d041a'); skyGrad.addColorStop(0.6, '#280845'); skyGrad.addColorStop(1, '#701049');
    ctx.fillStyle = skyGrad; ctx.fillRect(0, 0, width, height);

    const horizonY = height * 0.62;

    // Glowing Sun
    const sunGrad = ctx.createLinearGradient(0, horizonY - 100, 0, horizonY + 80);
    sunGrad.addColorStop(0, '#ff7eb3'); sunGrad.addColorStop(0.7, '#ff758c'); sunGrad.addColorStop(1, '#ffc078');
    ctx.fillStyle = sunGrad; ctx.beginPath(); ctx.arc(width / 2, horizonY, 95, 0, Math.PI * 2); ctx.fill();

    // Dark Grid Floor Base
    ctx.fillStyle = '#090212'; ctx.fillRect(0, horizonY, width, height - horizonY);

    // Perspective Lines
    ctx.strokeStyle = 'rgba(255, 117, 140, 0.55)'; ctx.lineWidth = 1.8;
    for (let x = -width; x < width * 2; x += 80) {
      ctx.beginPath(); ctx.moveTo(width / 2, horizonY); ctx.lineTo(x, height); ctx.stroke();
    }

    // Moving Horizontal Grid Lines
    const moveOffset = (time * speed * 20) % 30;
    for (let i = 0; i < 15; i++) {
      const lineY = horizonY + Math.pow(i / 15, 2.2) * (height - horizonY) + moveOffset * (i / 15);
      if (lineY <= height && lineY >= horizonY) {
        ctx.beginPath(); ctx.moveTo(0, lineY); ctx.lineTo(width, lineY); ctx.stroke();
      }
    }
  },

  // 6. Fluid Prism Color Waves
  liquid(ctx, width, height, elements, time) {
    ctx.fillStyle = '#070b14'; ctx.fillRect(0, 0, width, height);
    const colors = ['rgba(139, 92, 246, 0.3)', 'rgba(6, 182, 212, 0.25)', 'rgba(236, 72, 153, 0.2)', 'rgba(16, 185, 129, 0.18)'];
    
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = colors[i]; ctx.beginPath(); ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 40) {
        const y = Math.sin(x * 0.003 + time * 0.8 + i * 1.5) * 75 + height * 0.45 + (i * 35);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height); ctx.closePath(); ctx.fill();
    }
  },

  // 7. Matrix Code Stream
  matrix(ctx, width, height, elements, time, speed) {
    ctx.fillStyle = '#011206'; ctx.fillRect(0, 0, width, height);
    ctx.font = '15px monospace';
    elements.forEach(p => {
      p.y += p.speedY * (speed / 2); if (p.y > height) p.y = -20;
      ctx.fillStyle = '#22c55e'; ctx.fillText(p.char, p.x, p.y);
    });
  },

  // 8. Midnight Fireflies Meadow Silhouette
  fireflies(ctx, width, height, elements, time) {
    ctx.fillStyle = '#050608'; ctx.fillRect(0, 0, width, height);

    // Grass Silhouettes
    ctx.fillStyle = '#0b0f14';
    for (let x = 0; x < width; x += 15) {
      const gh = 60 + Math.sin(x * 0.1) * 25;
      ctx.beginPath(); ctx.moveTo(x, height); ctx.lineTo(x + 5, height - gh); ctx.lineTo(x + 10, height); ctx.fill();
    }

    elements.forEach(p => {
      p.x += Math.sin(time + p.y * 0.05) * 1.4; p.y += Math.cos(time + p.x * 0.05) * 1.4;
      const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
      glowGrad.addColorStop(0, 'rgba(234, 179, 8, 0.95)'); glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad; ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 6, 0, Math.PI * 2); ctx.fill();
    });
  },

  // 9. Sunset Coastal Lighthouse Waves
  waves(ctx, width, height, elements, time) {
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#09101f'); sky.addColorStop(0.5, '#1e3a8a'); sky.addColorStop(1, '#0284c7');
    ctx.fillStyle = sky; ctx.fillRect(0, 0, width, height);

    // Lighthouse Light Beam
    ctx.save();
    ctx.translate(width * 0.85, height * 0.35);
    ctx.rotate(time * 0.4);
    const beamGrad = ctx.createLinearGradient(0, 0, 600, 100);
    beamGrad.addColorStop(0, 'rgba(255, 255, 255, 0.4)'); beamGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = beamGrad; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(600, -80); ctx.lineTo(600, 80); ctx.fill();
    ctx.restore();

    // Sea Waves
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = `rgba(59, 130, 246, ${0.16 + i * 0.08})`; ctx.beginPath(); ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 30) {
        const y = Math.sin(x * 0.005 + time * 1.5 + i * 1.2) * (20 + i * 10) + height * 0.58 + (i * 30);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height); ctx.closePath(); ctx.fill();
    }
  },

  // 10. Cyber Vortex Grid
  vortex(ctx, width, height, elements, time) {
    ctx.fillStyle = '#030208'; ctx.fillRect(0, 0, width, height);
    const cx = width / 2, cy = height / 2;
    for (let r = 20; r < Math.max(width, height); r += 35) {
      ctx.strokeStyle = `rgba(0, 242, 254, ${Math.max(0.05, 0.45 - r / 900)})`; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.arc(cx, cy, r + Math.sin(time + r * 0.01) * 15, 0, Math.PI * 2); ctx.stroke();
    }
  },

  // 11. Electric Plasma Storm
  plasma(ctx, width, height, elements, time) {
    ctx.fillStyle = '#080010'; ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 5; i++) {
      const px = width * 0.5 + Math.sin(time * 0.8 + i) * (width * 0.35);
      const py = height * 0.5 + Math.cos(time * 0.6 + i) * (height * 0.35);
      const plasGrad = ctx.createRadialGradient(px, py, 10, px, py, 280);
      plasGrad.addColorStop(0, i % 2 === 0 ? 'rgba(255, 0, 127, 0.45)' : 'rgba(0, 242, 254, 0.45)');
      plasGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = plasGrad; ctx.fillRect(0, 0, width, height);
    }
  },

  // 12. Golden Sunbeams & Canopy Silhouette
  sunbeams(ctx, width, height, elements, time) {
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#1c1305'); bgGrad.addColorStop(1, '#080501');
    ctx.fillStyle = bgGrad; ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.translate(width * 0.2, 0); ctx.rotate(Math.PI / 6);
    for (let i = -width; i < width * 2; i += 60) {
      const beamGrad = ctx.createLinearGradient(i, 0, i, height * 1.5);
      beamGrad.addColorStop(0, 'rgba(251, 191, 36, 0.25)'); beamGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = beamGrad; ctx.fillRect(i + Math.sin(time + i) * 10, 0, 35, height * 1.5);
    }
    ctx.restore();
  },

  // 13. NEW: Cyberpunk Highway Overpass Silhouette
  highway(ctx, width, height, elements, time, speed) {
    const bg = ctx.createLinearGradient(0, 0, 0, height);
    bg.addColorStop(0, '#040714'); bg.addColorStop(1, '#1a0033');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, width, height);

    // Overpass Silhouette
    ctx.fillStyle = '#060a17'; ctx.fillRect(0, height * 0.7, width, 40);
    ctx.fillRect(width * 0.3, height * 0.7, 50, height * 0.3);
    ctx.fillRect(width * 0.7, height * 0.7, 50, height * 0.3);

    // Moving Car Headlight Streaks
    const streakOffset = (time * speed * 40) % width;
    ctx.strokeStyle = '#00f2fe'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo((streakOffset) % width, height * 0.72); ctx.lineTo((streakOffset + 180) % width, height * 0.72); ctx.stroke();
    
    ctx.strokeStyle = '#ff007f';
    ctx.beginPath(); ctx.moveTo(width - (streakOffset % width), height * 0.76); ctx.lineTo(width - ((streakOffset + 180) % width), height * 0.76); ctx.stroke();
  },

  // 14. NEW: Orbital Moon & Satellite Silhouette
  orbital(ctx, width, height, elements, time) {
    ctx.fillStyle = '#03050c'; ctx.fillRect(0, 0, width, height);

    // Glowing Crescent Moon
    const mx = width * 0.25, my = height * 0.3, mr = 70;
    const moonGrad = ctx.createRadialGradient(mx, my, 10, mx, my, mr);
    moonGrad.addColorStop(0, '#fef08a'); moonGrad.addColorStop(1, 'rgba(254, 240, 138, 0.1)');
    ctx.fillStyle = moonGrad; ctx.beginPath(); ctx.arc(mx, my, mr, 0, Math.PI * 2); ctx.fill();

    // Satellite Trajectory Ring
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.ellipse(width / 2, height / 2, width * 0.45, height * 0.25, -Math.PI / 8, 0, Math.PI * 2); ctx.stroke();

    // Orbiting Satellite Node
    const satX = width / 2 + Math.cos(time * 0.5) * (width * 0.45);
    const satY = height / 2 + Math.sin(time * 0.5) * (height * 0.25);
    ctx.fillStyle = '#00f2fe'; ctx.beginPath(); ctx.arc(satX, satY, 5, 0, Math.PI * 2); ctx.fill();
  },

  // 15. NEW: Futuristic Pyramid & Laser Array Silhouette
  pyramid(ctx, width, height, elements, time) {
    const bg = ctx.createLinearGradient(0, 0, 0, height);
    bg.addColorStop(0, '#0f021a'); bg.addColorStop(1, '#020d1a');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, width, height);

    // Pyramid Silhouette
    const px = width / 2, py = height * 0.4, pw = 300, ph = 260;
    ctx.fillStyle = '#050712';
    ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - pw / 2, py + ph); ctx.lineTo(px + pw / 2, py + ph); ctx.closePath(); ctx.fill();

    // Apex Laser Beam
    const beamGrad = ctx.createLinearGradient(px, py, px, 0);
    beamGrad.addColorStop(0, 'rgba(0, 242, 254, 0.8)'); beamGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = beamGrad; ctx.fillRect(px - 4, 0, 8, py);
  }

};
