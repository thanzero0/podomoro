/**
 * Its Podomoro — 15 Cinematic Canvas Motion Scenes
 * Each scene is a fully self-contained, hand-crafted visual experience.
 * Layered rendering: sky → atmosphere → midground → foreground → particles
 */

// ─── Shared Helper ────────────────────────────────────────────────────────────
function easeInExpo(t) { return t === 0 ? 0 : Math.pow(2, 10 * t - 10); }

// ─────────────────────────────────────────────────────────────────────────────

export const animations = {

  // ══════════════════════════════════════════════════════════════════════════
  // 1. CYBERPUNK NEON CITY
  // ══════════════════════════════════════════════════════════════════════════
  cyberpunk(ctx, W, H, els, t, spd) {
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, '#02040e');
    sky.addColorStop(0.5, '#0d0620');
    sky.addColorStop(1, '#1a0535');
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);

    const haze = ctx.createLinearGradient(0, H*0.5, 0, H*0.72);
    haze.addColorStop(0, 'transparent'); haze.addColorStop(1, 'rgba(180,0,255,0.12)');
    ctx.fillStyle = haze; ctx.fillRect(0, H*0.5, W, H*0.22);

    // Far buildings
    const fBuilds = [{x:0.00,w:0.05,h:0.15},{x:0.06,w:0.04,h:0.12},{x:0.11,w:0.07,h:0.18},
      {x:0.19,w:0.04,h:0.13},{x:0.24,w:0.09,h:0.22},{x:0.34,w:0.06,h:0.16},
      {x:0.41,w:0.08,h:0.24},{x:0.50,w:0.04,h:0.11},{x:0.55,w:0.06,h:0.20},
      {x:0.62,w:0.09,h:0.26},{x:0.72,w:0.05,h:0.15},{x:0.78,w:0.07,h:0.22},
      {x:0.86,w:0.05,h:0.17},{x:0.92,w:0.09,h:0.27}];
    fBuilds.forEach(b => {
      ctx.fillStyle = '#0b0818';
      ctx.fillRect(b.x*W, H-(b.h*H), b.w*W, b.h*H);
    });

    // Mid buildings with neon windows
    const builds = [{x:0.00,w:0.06,h:0.30},{x:0.07,w:0.08,h:0.40},{x:0.16,w:0.05,h:0.24},
      {x:0.22,w:0.10,h:0.48},{x:0.33,w:0.07,h:0.34},{x:0.41,w:0.09,h:0.53},
      {x:0.51,w:0.06,h:0.28},{x:0.58,w:0.12,h:0.44},{x:0.71,w:0.07,h:0.37},
      {x:0.79,w:0.08,h:0.50},{x:0.88,w:0.06,h:0.32},{x:0.95,w:0.09,h:0.42}];
    builds.forEach((b, i) => {
      const bx=b.x*W, bw=b.w*W, bh=b.h*H;
      ctx.fillStyle = '#060a16';
      ctx.fillRect(bx, H-bh, bw, bh);
      // Antenna
      ctx.strokeStyle='#0f1530'; ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(bx+bw/2, H-bh); ctx.lineTo(bx+bw/2, H-bh-18-(i%3)*8); ctx.stroke();
      const blinkA = (Math.sin(t*2.5+i*1.3)+1)/2;
      ctx.fillStyle=`rgba(255,80,80,${blinkA*0.9})`;
      ctx.beginPath(); ctx.arc(bx+bw/2, H-bh-18-(i%3)*8, 2.5, 0, Math.PI*2); ctx.fill();
      // Windows
      for(let wx=bx+6; wx<bx+bw-6; wx+=14) {
        for(let wy=H-bh+14; wy<H-10; wy+=18) {
          if(((Math.floor(wx/14)+Math.floor(wy/18)+i)%4)===0) continue;
          const flickering = Math.sin(t*3+wx*0.3+wy*0.2)>0.85;
          const clr = i%2===0?'0,242,254':'255,0,127';
          ctx.fillStyle=`rgba(${clr},${flickering?0.15:0.55})`;
          ctx.fillRect(wx,wy,6,10);
          const wg=ctx.createRadialGradient(wx+3,wy+5,0,wx+3,wy+5,14);
          wg.addColorStop(0,`rgba(${clr},0.18)`); wg.addColorStop(1,'transparent');
          ctx.fillStyle=wg; ctx.fillRect(wx-11,wy-9,28,28);
        }
      }
    });

    // Neon rain
    els.forEach(p => {
      p.y += p.speedY*(spd/3.5); if(p.y>H+40) p.y=-40;
      const len=28+p.speedY*3;
      const rg=ctx.createLinearGradient(p.x,p.y-len,p.x,p.y);
      const clr=p.alpha>0.5?'0,242,254':'255,0,127';
      rg.addColorStop(0,`rgba(${clr},0)`); rg.addColorStop(1,`rgba(${clr},0.75)`);
      ctx.strokeStyle=rg; ctx.lineWidth=1.2;
      ctx.beginPath(); ctx.moveTo(p.x,p.y-len); ctx.lineTo(p.x-len*0.08,p.y); ctx.stroke();
    });

    // Hologram billboard
    const hx=W*0.82, hy=H*0.22, hw=110, hh=55;
    ctx.strokeStyle=`rgba(0,242,254,${0.3+Math.sin(t*1.5)*0.15})`; ctx.lineWidth=1.5;
    ctx.strokeRect(hx,hy,hw,hh);
    ctx.fillStyle=`rgba(0,242,254,0.05)`; ctx.fillRect(hx,hy,hw,hh);
    ctx.fillStyle=`rgba(0,242,254,${0.55+Math.sin(t)*0.2})`;
    ctx.font='bold 11px monospace'; ctx.fillText('DEEP FOCUS',hx+12,hy+28);
    ctx.font='8px monospace'; ctx.fillText('SYS:ONLINE',hx+22,hy+43);
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 2. COSMIC ODYSSEY
  // ══════════════════════════════════════════════════════════════════════════
  galaxy(ctx, W, H, els, t) {
    ctx.fillStyle='#01010a'; ctx.fillRect(0,0,W,H);

    // Milky Way band
    ctx.save(); ctx.translate(W/2,H/2); ctx.rotate(-Math.PI/5);
    const mw=ctx.createLinearGradient(-W,-30,W,30);
    mw.addColorStop(0,'transparent'); mw.addColorStop(0.5,'rgba(200,150,255,0.07)'); mw.addColorStop(1,'transparent');
    ctx.fillStyle=mw; ctx.fillRect(-W,-80,W*2,160); ctx.restore();

    // Nebulae
    const n1=ctx.createRadialGradient(W*0.2,H*0.35,20,W*0.2,H*0.35,380);
    n1.addColorStop(0,'rgba(120,40,220,0.28)'); n1.addColorStop(0.5,'rgba(180,50,200,0.12)'); n1.addColorStop(1,'transparent');
    ctx.fillStyle=n1; ctx.fillRect(0,0,W,H);
    const n2=ctx.createRadialGradient(W*0.78,H*0.6,10,W*0.78,H*0.6,300);
    n2.addColorStop(0,'rgba(230,60,140,0.22)'); n2.addColorStop(0.5,'rgba(200,80,180,0.1)'); n2.addColorStop(1,'transparent');
    ctx.fillStyle=n2; ctx.fillRect(0,0,W,H);

    // Stars
    els.forEach(p=>{
      const tw=Math.sin(t*1.5+p.x*0.05+p.y*0.04)*0.4+0.6;
      ctx.fillStyle=`rgba(255,255,255,${p.alpha*tw})`;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.size*0.5,0,Math.PI*2); ctx.fill();
      if(p.size>3.5){
        const sg=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,8);
        sg.addColorStop(0,`rgba(200,200,255,${p.alpha*tw*0.5})`); sg.addColorStop(1,'transparent');
        ctx.fillStyle=sg; ctx.beginPath(); ctx.arc(p.x,p.y,8,0,Math.PI*2); ctx.fill();
      }
    });

    const px=W*0.68, py=H*0.38, pr=Math.min(W,H)*0.17;
    // Planet halo
    const halo=ctx.createRadialGradient(px,py,pr*0.8,px,py,pr*2.2);
    halo.addColorStop(0,'rgba(120,60,220,0.35)'); halo.addColorStop(0.4,'rgba(200,80,180,0.12)'); halo.addColorStop(1,'transparent');
    ctx.fillStyle=halo; ctx.fillRect(0,0,W,H);
    // Planet body
    const pg=ctx.createRadialGradient(px-pr*0.3,py-pr*0.3,pr*0.05,px,py,pr);
    pg.addColorStop(0,'#1a0e3a'); pg.addColorStop(0.5,'#0e0820'); pg.addColorStop(1,'#060310');
    ctx.fillStyle=pg; ctx.beginPath(); ctx.arc(px,py,pr,0,Math.PI*2); ctx.fill();
    // Planet surface bands
    ctx.save(); ctx.beginPath(); ctx.arc(px,py,pr,0,Math.PI*2); ctx.clip();
    for(let band=-3; band<=3; band++){
      const by=py+band*(pr*0.28);
      const bg=ctx.createLinearGradient(0,by-8,0,by+8);
      bg.addColorStop(0,'transparent'); bg.addColorStop(0.5,'rgba(140,80,255,0.08)'); bg.addColorStop(1,'transparent');
      ctx.fillStyle=bg; ctx.fillRect(px-pr,by-8,pr*2,16);
    }
    const rim=ctx.createRadialGradient(px,py,pr*0.75,px,py,pr);
    rim.addColorStop(0,'transparent'); rim.addColorStop(1,'rgba(120,60,255,0.35)');
    ctx.fillStyle=rim; ctx.beginPath(); ctx.arc(px,py,pr,0,Math.PI*2); ctx.fill(); ctx.restore();
    // Rings
    ctx.save(); ctx.translate(px,py); ctx.rotate(-Math.PI/8+Math.sin(t*0.05)*0.03);
    ctx.strokeStyle='rgba(180,100,255,0.5)'; ctx.lineWidth=5;
    ctx.beginPath(); ctx.ellipse(0,0,pr*2.5,pr*0.4,0,0,Math.PI*2); ctx.stroke();
    ctx.strokeStyle='rgba(220,130,255,0.35)'; ctx.lineWidth=3;
    ctx.beginPath(); ctx.ellipse(0,0,pr*2.1,pr*0.33,0,0,Math.PI*2); ctx.stroke();
    ctx.strokeStyle='rgba(255,180,255,0.18)'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.ellipse(0,0,pr*1.7,pr*0.26,0,0,Math.PI*2); ctx.stroke(); ctx.restore();
    // Re-clip ring behind planet
    ctx.save(); ctx.translate(px,py); ctx.rotate(-Math.PI/8+Math.sin(t*0.05)*0.03);
    ctx.beginPath(); ctx.ellipse(0,0,pr*2.5,pr*0.4,0,Math.PI,Math.PI*2);
    ctx.fillStyle=pg; ctx.fill(); ctx.restore();
    ctx.fillStyle=pg; ctx.beginPath(); ctx.arc(px,py,pr-1,0,Math.PI*2); ctx.fill();
    // Moon
    const ma=t*0.35, md=pr*3.2;
    const mx2=px+Math.cos(ma)*md, my2=py+Math.sin(ma)*md*0.35;
    const mg=ctx.createRadialGradient(mx2-3,my2-3,0,mx2,my2,12);
    mg.addColorStop(0,'#c0a0ff'); mg.addColorStop(1,'#3a1a6a');
    ctx.fillStyle=mg; ctx.beginPath(); ctx.arc(mx2,my2,12,0,Math.PI*2); ctx.fill();
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 3. COZY LOFI WINDOW
  // ══════════════════════════════════════════════════════════════════════════
  lofi(ctx, W, H, els, t) {
    const ext=ctx.createLinearGradient(0,0,0,H);
    ext.addColorStop(0,'#060810'); ext.addColorStop(1,'#0e1118');
    ctx.fillStyle=ext; ctx.fillRect(0,0,W,H);
    // City light glow through glass
    for(let i=0;i<8;i++){
      const lx=(W/8)*i+W/16;
      const lg=ctx.createRadialGradient(lx,H*0.55,0,lx,H*0.55,60);
      lg.addColorStop(0,i%3===0?'rgba(255,200,80,0.08)':'rgba(120,160,255,0.06)'); lg.addColorStop(1,'transparent');
      ctx.fillStyle=lg; ctx.fillRect(0,0,W,H);
    }
    // Interior glow
    const ig=ctx.createRadialGradient(W/2,H/2,H*0.1,W/2,H/2,H*0.8);
    ig.addColorStop(0,'rgba(255,180,60,0.12)'); ig.addColorStop(0.5,'rgba(255,130,40,0.06)'); ig.addColorStop(1,'transparent');
    ctx.fillStyle=ig; ctx.fillRect(0,0,W,H);
    // Window frame
    const fw=28, midX=W/2, midY=H*0.42;
    ctx.fillStyle='#09070f';
    ctx.fillRect(0,0,fw,H); ctx.fillRect(W-fw,0,fw,H);
    ctx.fillRect(0,0,W,fw); ctx.fillRect(0,H-fw-60,W,fw);
    ctx.fillRect(midX-fw/2,0,fw,H); ctx.fillRect(0,midY,W,fw);
    // Condensation drops
    els.forEach(p=>{
      p.y+=p.speedY*0.28*(1+Math.sin(t+p.x)*0.15);
      if(p.y>H-fw-60){ p.y=fw+Math.random()*20; p.x=fw+Math.random()*(W-fw*2); }
      if(Math.abs(p.x-midX)<fw||Math.abs(p.y-midY)<fw) return;
      const a=0.25+Math.sin(t*2+p.x)*0.08;
      ctx.fillStyle=`rgba(180,210,255,${a})`;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill();
      const tr=ctx.createLinearGradient(p.x,p.y-15,p.x,p.y);
      tr.addColorStop(0,'transparent'); tr.addColorStop(1,`rgba(180,210,255,${a*0.5})`);
      ctx.strokeStyle=tr; ctx.lineWidth=p.size*0.7;
      ctx.beginPath(); ctx.moveTo(p.x,p.y-15); ctx.lineTo(p.x,p.y); ctx.stroke();
    });
    // Sill objects
    const sillY=H-fw-60;
    ctx.fillStyle='#06050d';
    ctx.fillRect(W*0.2,sillY-35,28,35); ctx.fillRect(W*0.2+28,sillY-22,8,12);
    ctx.beginPath(); ctx.moveTo(W*0.4-18,sillY); ctx.lineTo(W*0.4-12,sillY-30);
    ctx.lineTo(W*0.4+12,sillY-30); ctx.lineTo(W*0.4+18,sillY); ctx.fill();
    ctx.fillStyle='#08100a';
    ctx.beginPath(); ctx.ellipse(W*0.4,sillY-42,14,22,Math.PI/6,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(W*0.4+12,sillY-50,10,18,-Math.PI/6,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#06050d';
    ctx.fillRect(W*0.65,sillY-50,22,50); ctx.fillRect(W*0.65+24,sillY-38,18,38);
    ctx.fillRect(W*0.65+44,sillY-55,20,55);
    // Steam
    for(let s=0;s<3;s++){
      const sx=W*0.2+14+s*4, sy=sillY-35-((t*20+s*25)%45);
      const sa=Math.max(0,0.15-((t*20+s*25)%45)/45*0.15);
      ctx.strokeStyle=`rgba(255,200,130,${sa})`; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(sx,sy+15);
      ctx.bezierCurveTo(sx-6,sy+8,sx+6,sy+3,sx,sy); ctx.stroke();
    }
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 4. MOUNTAIN AURORA
  // ══════════════════════════════════════════════════════════════════════════
  nature(ctx, W, H, els, t) {
    const sky=ctx.createLinearGradient(0,0,0,H*0.72);
    sky.addColorStop(0,'#010a04'); sky.addColorStop(0.5,'#011208'); sky.addColorStop(1,'#01200e');
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
    // Aurora ribbons
    const aColors=[{r:16,g:185,b:129},{r:6,g:182,b:212},{r:99,g:102,b:241},{r:16,g:185,b:129}];
    aColors.forEach((clr,layer)=>{
      const yBase=H*(0.10+layer*0.08), amp=35+layer*15, freq=0.0025-layer*0.0004, spd2=t*(0.3+layer*0.12);
      ctx.beginPath(); ctx.moveTo(0,H*0.72);
      for(let x=0;x<=W;x+=8){
        const y=yBase+Math.sin(x*freq+spd2)*amp+Math.sin(x*freq*1.7-spd2*0.6)*(amp*0.5);
        ctx.lineTo(x,y);
      }
      ctx.lineTo(W,H*0.72); ctx.lineTo(0,H*0.72); ctx.closePath();
      const ag=ctx.createLinearGradient(0,yBase-amp,0,H*0.72);
      ag.addColorStop(0,`rgba(${clr.r},${clr.g},${clr.b},0)`);
      ag.addColorStop(0.3,`rgba(${clr.r},${clr.g},${clr.b},${0.22-layer*0.03})`);
      ag.addColorStop(1,`rgba(${clr.r},${clr.g},${clr.b},0)`);
      ctx.fillStyle=ag; ctx.fill();
    });
    // Stars
    els.forEach(p=>{
      const tw=Math.sin(t*1.8+p.x*0.07)*0.35+0.65;
      ctx.fillStyle=`rgba(200,255,220,${p.alpha*tw*0.8})`;
      ctx.beginPath(); ctx.arc(p.x,p.y*0.72,p.size*0.45,0,Math.PI*2); ctx.fill();
    });
    // Far mountain
    ctx.fillStyle='#050f08'; ctx.beginPath(); ctx.moveTo(0,H);
    ctx.lineTo(0,H*0.62); ctx.lineTo(W*0.08,H*0.52); ctx.lineTo(W*0.18,H*0.60);
    ctx.lineTo(W*0.28,H*0.44); ctx.lineTo(W*0.38,H*0.56); ctx.lineTo(W*0.50,H*0.38);
    ctx.lineTo(W*0.62,H*0.54); ctx.lineTo(W*0.74,H*0.42); ctx.lineTo(W*0.84,H*0.58);
    ctx.lineTo(W*0.92,H*0.48); ctx.lineTo(W,H*0.60); ctx.lineTo(W,H); ctx.fill();
    // Near mountain
    ctx.fillStyle='#020a04'; ctx.beginPath(); ctx.moveTo(0,H);
    ctx.lineTo(0,H*0.75); ctx.lineTo(W*0.12,H*0.62); ctx.lineTo(W*0.22,H*0.72);
    ctx.lineTo(W*0.35,H*0.55); ctx.lineTo(W*0.45,H*0.68); ctx.lineTo(W*0.55,H*0.59);
    ctx.lineTo(W*0.65,H*0.72); ctx.lineTo(W*0.78,H*0.57); ctx.lineTo(W*0.88,H*0.70);
    ctx.lineTo(W,H*0.64); ctx.lineTo(W,H); ctx.fill();
    // Snow caps
    ctx.fillStyle='rgba(200,240,220,0.25)';
    ctx.beginPath(); ctx.moveTo(W*0.35,H*0.55); ctx.lineTo(W*0.32,H*0.60); ctx.lineTo(W*0.38,H*0.60); ctx.fill();
    ctx.beginPath(); ctx.moveTo(W*0.78,H*0.57); ctx.lineTo(W*0.75,H*0.62); ctx.lineTo(W*0.81,H*0.62); ctx.fill();
    // Pines
    ctx.fillStyle='#010604';
    for(let tx=0;tx<W;tx+=38){
      const th=55+Math.sin(tx*0.1)*20;
      ctx.beginPath(); ctx.moveTo(tx+10,H-th); ctx.lineTo(tx,H); ctx.lineTo(tx+20,H); ctx.fill();
      ctx.beginPath(); ctx.moveTo(tx+10,H-th*0.65); ctx.lineTo(tx-4,H-th*0.35); ctx.lineTo(tx+24,H-th*0.35); ctx.fill();
    }
    // Fireflies
    els.forEach(p=>{
      p.x+=Math.sin(t*0.8+p.y*0.02)*0.7; p.y-=0.18; if(p.y<H*0.6) p.y=H-10;
      const fa=(Math.sin(t*2.5+p.x*0.1)+1)*0.4;
      const ffg=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,8);
      ffg.addColorStop(0,`rgba(80,240,120,${fa*0.9})`); ffg.addColorStop(1,'transparent');
      ctx.fillStyle=ffg; ctx.beginPath(); ctx.arc(p.x,p.y,8,0,Math.PI*2); ctx.fill();
    });
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 5. RETRO SYNTHWAVE
  // ══════════════════════════════════════════════════════════════════════════
  synthwave(ctx, W, H, els, t, spd) {
    const horizY=H*0.58;
    const skyGrad=ctx.createLinearGradient(0,0,0,horizY);
    skyGrad.addColorStop(0,'#04011a'); skyGrad.addColorStop(0.5,'#1a044a');
    skyGrad.addColorStop(0.85,'#5a0a55'); skyGrad.addColorStop(1,'#8a0840');
    ctx.fillStyle=skyGrad; ctx.fillRect(0,0,W,horizY);
    // Stars
    els.forEach(p=>{
      if(p.y>horizY*0.9) return;
      const tw=Math.sin(t*2+p.x*0.08)*0.4+0.6;
      ctx.fillStyle=`rgba(255,200,255,${p.alpha*tw*0.6})`;
      ctx.beginPath(); ctx.arc(p.x,p.y*0.9,p.size*0.4,0,Math.PI*2); ctx.fill();
    });
    // Sun glow
    const sunR=Math.min(W,H)*0.13, sunX=W/2, sunY=horizY;
    const sunGlow=ctx.createRadialGradient(sunX,sunY,sunR*0.4,sunX,sunY,sunR*2.5);
    sunGlow.addColorStop(0,'rgba(255,80,180,0.4)'); sunGlow.addColorStop(0.4,'rgba(255,60,100,0.15)'); sunGlow.addColorStop(1,'transparent');
    ctx.fillStyle=sunGlow; ctx.fillRect(0,0,W,horizY);
    // Sun body
    const sg=ctx.createLinearGradient(sunX,sunY-sunR,sunX,sunY);
    sg.addColorStop(0,'#ff9a6c'); sg.addColorStop(0.3,'#ff6b9d'); sg.addColorStop(0.7,'#ff3a78'); sg.addColorStop(1,'#e91e63');
    ctx.fillStyle=sg; ctx.beginPath(); ctx.arc(sunX,sunY,sunR,-Math.PI,0); ctx.fill();
    // Scan lines on sun
    ctx.save(); ctx.beginPath(); ctx.arc(sunX,sunY,sunR,-Math.PI,0); ctx.clip();
    ctx.fillStyle='#04011a';
    for(let sc=0;sc<8;sc++){
      const sy=sunY-sunR+(sunR/8)*(sc*2+(sc%2===0?0.3:0.7));
      ctx.fillRect(sunX-sunR,sy,sunR*2,3+sc*0.8);
    }
    ctx.restore();
    // Grid floor
    const floorG=ctx.createLinearGradient(0,horizY,0,H);
    floorG.addColorStop(0,'#0a0116'); floorG.addColorStop(1,'#020006');
    ctx.fillStyle=floorG; ctx.fillRect(0,horizY,W,H-horizY);
    // Vertical lines
    ctx.strokeStyle='rgba(255,60,200,0.5)'; ctx.lineWidth=1.2;
    for(let vx=-W*1.5;vx<=W*2.5;vx+=60){
      ctx.beginPath(); ctx.moveTo(W/2,horizY); ctx.lineTo(vx,H); ctx.stroke();
    }
    // Horizontal lines (moving)
    const scrollOff=(t*spd*18)%1;
    for(let i=0;i<20;i++){
      const depth=(i/20+scrollOff)%1;
      const lineY=horizY+easeInExpo(depth)*(H-horizY);
      if(lineY>H||lineY<horizY) continue;
      ctx.strokeStyle=`rgba(255,60,200,${0.7*depth})`;
      ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(0,lineY); ctx.lineTo(W,lineY); ctx.stroke();
    }
    // Horizon glow
    const hg=ctx.createLinearGradient(0,horizY-3,0,horizY+3);
    hg.addColorStop(0,'rgba(255,100,255,0.8)'); hg.addColorStop(1,'rgba(255,100,255,0)');
    ctx.fillStyle=hg; ctx.fillRect(0,horizY-2,W,5);
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 6. PRISM WAVES
  // ══════════════════════════════════════════════════════════════════════════
  liquid(ctx, W, H, els, t) {
    ctx.fillStyle='#03060f'; ctx.fillRect(0,0,W,H);
    // Caustic light
    for(let i=0;i<6;i++){
      const cx=W*(0.15+i*0.15), cy=H*0.5+Math.sin(t*0.4+i)*H*0.2;
      const cg=ctx.createRadialGradient(cx,cy,0,cx,cy,200+i*30);
      const hue=(i*60+t*15)%360;
      cg.addColorStop(0,`hsla(${hue},90%,65%,0.08)`); cg.addColorStop(1,'transparent');
      ctx.fillStyle=cg; ctx.fillRect(0,0,W,H);
    }
    // Wave layers
    const waves=[
      {hue:265,alpha:0.35,amp:80,freq:0.0028,spd:0.7,y:0.38},
      {hue:195,alpha:0.28,amp:65,freq:0.0035,spd:1.0,y:0.46},
      {hue:320,alpha:0.22,amp:55,freq:0.0042,spd:0.55,y:0.53},
      {hue:150,alpha:0.18,amp:45,freq:0.005,spd:0.85,y:0.60},
      {hue:40,alpha:0.15,amp:35,freq:0.006,spd:1.2,y:0.67},
    ];
    waves.forEach(wd=>{
      ctx.beginPath(); ctx.moveTo(0,H);
      for(let x=0;x<=W;x+=6){
        const y=H*wd.y+Math.sin(x*wd.freq+t*wd.spd)*wd.amp
          +Math.sin(x*wd.freq*2.1-t*wd.spd*0.7)*(wd.amp*0.4)
          +Math.cos(x*wd.freq*0.7+t*wd.spd*1.3)*(wd.amp*0.25);
        ctx.lineTo(x,y);
      }
      ctx.lineTo(W,H); ctx.closePath();
      ctx.fillStyle=`hsla(${wd.hue},80%,60%,${wd.alpha})`; ctx.fill();
      // Crest highlight
      ctx.beginPath();
      for(let x=0;x<=W;x+=6){
        const y=H*wd.y+Math.sin(x*wd.freq+t*wd.spd)*wd.amp+Math.sin(x*wd.freq*2.1-t*wd.spd*0.7)*(wd.amp*0.4);
        x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }
      ctx.strokeStyle=`hsla(${(wd.hue+20)%360},100%,85%,${wd.alpha*0.6})`; ctx.lineWidth=1.5; ctx.stroke();
    });
    // Floating light bubbles
    els.forEach(p=>{
      p.x+=Math.sin(t*0.5+p.y*0.02)*0.6; p.y-=0.35; if(p.y<0) p.y=H;
      const hue=(p.x/W*240+t*20)%360;
      const bg=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.size*3);
      bg.addColorStop(0,`hsla(${hue},90%,75%,0.45)`); bg.addColorStop(1,'transparent');
      ctx.fillStyle=bg; ctx.beginPath(); ctx.arc(p.x,p.y,p.size*3,0,Math.PI*2); ctx.fill();
    });
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 7. MATRIX STREAM
  // ══════════════════════════════════════════════════════════════════════════
  matrix(ctx, W, H, els, t, spd) {
    ctx.fillStyle='rgba(0,8,2,0.88)'; ctx.fillRect(0,0,W,H);
    const cg=ctx.createRadialGradient(W/2,H/2,50,W/2,H/2,Math.max(W,H)*0.6);
    cg.addColorStop(0,'rgba(0,180,60,0.04)'); cg.addColorStop(1,'transparent');
    ctx.fillStyle=cg; ctx.fillRect(0,0,W,H);
    els.forEach(p=>{
      p.y+=p.speedY*(spd/2.5);
      if(p.y>H+20){ p.y=-20; p.char=String.fromCharCode(0x30A0+Math.floor(Math.random()*96)); }
      if(Math.random()<0.02) p.char=String.fromCharCode(0x30A0+Math.floor(Math.random()*96));
      const depth=p.size, fsize=8+depth*2;
      ctx.font=`${fsize}px monospace`;
      if(Math.random()<0.06){
        ctx.fillStyle='rgba(200,255,210,0.95)';
        ctx.fillText(String.fromCharCode(0x30A0+Math.floor(Math.random()*96)),p.x,p.y);
      } else {
        ctx.fillStyle=`rgba(30,${140+depth*20},50,${0.3+depth*0.12})`;
        ctx.fillText(p.char,p.x,p.y);
      }
      for(let tr=1;tr<=5;tr++){
        const ty=p.y-tr*(8+depth*2); if(ty<0) break;
        ctx.fillStyle=`rgba(20,120,40,${(0.3-depth*0.02)*(1-tr/5)})`;
        ctx.fillText(p.char,p.x,ty);
      }
    });
    for(let sl=0;sl<H;sl+=4){ ctx.fillStyle='rgba(0,0,0,0.06)'; ctx.fillRect(0,sl,W,2); }
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 8. MEADOW FIREFLIES
  // ══════════════════════════════════════════════════════════════════════════
  fireflies(ctx, W, H, els, t) {
    const sky=ctx.createLinearGradient(0,0,0,H);
    sky.addColorStop(0,'#02010a'); sky.addColorStop(0.5,'#06030f'); sky.addColorStop(1,'#04080a');
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
    // Moon
    const mg=ctx.createRadialGradient(W*0.82,H*0.15,5,W*0.82,H*0.15,160);
    mg.addColorStop(0,'rgba(220,230,255,0.12)'); mg.addColorStop(1,'transparent');
    ctx.fillStyle=mg; ctx.fillRect(0,0,W,H);
    ctx.fillStyle='rgba(240,245,255,0.4)'; ctx.beginPath(); ctx.arc(W*0.82,H*0.15,22,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='rgba(0,0,0,0.18)'; ctx.beginPath(); ctx.arc(W*0.82+6,H*0.15-4,18,0,Math.PI*2); ctx.fill();
    // Stars
    els.forEach((p,i)=>{
      if(i%3!==0||p.y>H*0.55) return;
      const tw=Math.sin(t*1.2+p.x*0.06)*0.3+0.7;
      ctx.fillStyle=`rgba(200,210,255,${p.alpha*tw*0.5})`;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.size*0.35,0,Math.PI*2); ctx.fill();
    });
    // Fog
    const fog=ctx.createLinearGradient(0,H*0.7,0,H);
    fog.addColorStop(0,'transparent'); fog.addColorStop(0.4,'rgba(20,40,30,0.25)'); fog.addColorStop(1,'rgba(10,25,18,0.55)');
    ctx.fillStyle=fog; ctx.fillRect(0,H*0.7,W,H*0.3);
    // Grass base
    ctx.fillStyle='#04090a'; ctx.beginPath(); ctx.moveTo(0,H);
    for(let x=0;x<=W;x+=8){
      const gy=H*0.82+Math.sin(x*0.05)*30+Math.cos(x*0.02)*20; ctx.lineTo(x,gy);
    }
    ctx.lineTo(W,H); ctx.closePath(); ctx.fill();
    // Grass blades
    ctx.fillStyle='#020607';
    for(let x=0;x<W;x+=12){
      const gh=50+Math.sin(x*0.09+t*0.2)*22+Math.cos(x*0.04)*12;
      const sway=Math.sin(t*0.6+x*0.1)*5;
      ctx.beginPath(); ctx.moveTo(x,H);
      ctx.quadraticCurveTo(x+sway,H-gh*0.5,x+sway*1.5,H-gh);
      ctx.quadraticCurveTo(x+3+sway,H-gh+5,x+7,H); ctx.fill();
    }
    // Fireflies
    els.forEach((p,i)=>{
      if(i%3===0) return;
      p.x+=Math.sin(t*0.6+p.y*0.03)*1.2; p.y+=Math.cos(t*0.5+p.x*0.03)*0.9-0.15;
      if(p.y<H*0.4) p.y=H*0.82; if(p.x<0) p.x=W; if(p.x>W) p.x=0;
      const pulse=(Math.sin(t*3+p.x*0.1)+1)/2;
      const ffg=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,10+pulse*8);
      ffg.addColorStop(0,`rgba(100,255,140,${0.85*pulse})`); ffg.addColorStop(0.4,`rgba(40,200,80,${0.35*pulse})`); ffg.addColorStop(1,'transparent');
      ctx.fillStyle=ffg; ctx.beginPath(); ctx.arc(p.x,p.y,10+pulse*8,0,Math.PI*2); ctx.fill();
      ctx.fillStyle=`rgba(200,255,180,${0.9*pulse})`; ctx.beginPath(); ctx.arc(p.x,p.y,2,0,Math.PI*2); ctx.fill();
    });
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 9. LIGHTHOUSE WAVES
  // ══════════════════════════════════════════════════════════════════════════
  waves(ctx, W, H, els, t) {
    const sky=ctx.createLinearGradient(0,0,0,H*0.65);
    sky.addColorStop(0,'#040a12'); sky.addColorStop(0.5,'#0a1828'); sky.addColorStop(1,'#0f2040');
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
    // Stars
    els.forEach((p,i)=>{
      if(i%2!==0||p.y>H*0.55) return;
      ctx.fillStyle=`rgba(180,200,255,${p.alpha*0.35})`;
      ctx.beginPath(); ctx.arc(p.x,p.y*0.8,p.size*0.4,0,Math.PI*2); ctx.fill();
    });
    // Cliff silhouette
    ctx.fillStyle='#030609'; ctx.beginPath(); ctx.moveTo(0,H);
    ctx.lineTo(0,H*0.55); ctx.lineTo(W*0.05,H*0.48); ctx.lineTo(W*0.10,H*0.50);
    ctx.lineTo(W*0.14,H*0.44); ctx.lineTo(W*0.18,H*0.58); ctx.lineTo(W*0.22,H*0.56);
    ctx.lineTo(W*0.26,H*0.65); ctx.lineTo(W*0.28,H*0.62); ctx.fill();
    // Lighthouse
    const lhX=W*0.15, lhBaseY=H*0.62, tW=22, tH=110;
    ctx.fillStyle='#030609';
    ctx.beginPath();
    ctx.moveTo(lhX-tW/2-3,lhBaseY); ctx.lineTo(lhX-tW/2,lhBaseY-tH);
    ctx.lineTo(lhX+tW/2,lhBaseY-tH); ctx.lineTo(lhX+tW/2+3,lhBaseY); ctx.fill();
    ctx.fillStyle='#050c12'; ctx.fillRect(lhX-16,lhBaseY-tH-20,32,20);
    ctx.fillStyle='#020408';
    ctx.beginPath(); ctx.moveTo(lhX,lhBaseY-tH-32); ctx.lineTo(lhX-18,lhBaseY-tH-20); ctx.lineTo(lhX+18,lhBaseY-tH-20); ctx.fill();
    // Beam
    ctx.save(); ctx.translate(lhX,lhBaseY-tH-10); ctx.rotate(t*0.8);
    const beamLen=Math.max(W,H)*1.2;
    const bg=ctx.createLinearGradient(0,0,beamLen,0);
    bg.addColorStop(0,'rgba(255,255,200,0.5)'); bg.addColorStop(0.3,'rgba(255,255,180,0.2)'); bg.addColorStop(1,'transparent');
    ctx.fillStyle=bg; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(beamLen,-beamLen*0.11); ctx.lineTo(beamLen,beamLen*0.11); ctx.fill();
    ctx.rotate(Math.PI);
    const bg2=ctx.createLinearGradient(0,0,beamLen,0);
    bg2.addColorStop(0,'rgba(255,240,150,0.15)'); bg2.addColorStop(1,'transparent');
    ctx.fillStyle=bg2; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(beamLen,-beamLen*0.06); ctx.lineTo(beamLen,beamLen*0.06); ctx.fill();
    ctx.restore();
    // Lantern glow
    const lg=ctx.createRadialGradient(lhX,lhBaseY-tH-10,0,lhX,lhBaseY-tH-10,55);
    lg.addColorStop(0,`rgba(255,255,150,${0.5+Math.sin(t*3)*0.1})`); lg.addColorStop(1,'transparent');
    ctx.fillStyle=lg; ctx.fillRect(0,0,W,H);
    // Ocean waves
    const wDefs=[
      {yF:0.62,amp:22,freq:0.006,spd:0.9,a:0.12},{yF:0.67,amp:18,freq:0.009,spd:1.3,a:0.18},
      {yF:0.72,amp:15,freq:0.011,spd:1.0,a:0.25},{yF:0.78,amp:10,freq:0.014,spd:1.5,a:0.35},
      {yF:0.84,amp:7,freq:0.018,spd:1.8,a:0.50},
    ];
    wDefs.forEach(wd=>{
      ctx.beginPath(); ctx.moveTo(0,H);
      for(let x=0;x<=W;x+=8){
        const y=H*wd.yF+Math.sin(x*wd.freq+t*wd.spd)*wd.amp+Math.cos(x*wd.freq*1.6-t*wd.spd*0.7)*(wd.amp*0.45);
        ctx.lineTo(x,y);
      }
      ctx.lineTo(W,H); ctx.closePath();
      const wg=ctx.createLinearGradient(0,H*wd.yF-wd.amp,0,H);
      wg.addColorStop(0,`rgba(30,100,180,${wd.a})`); wg.addColorStop(1,`rgba(10,40,80,${wd.a*1.4})`);
      ctx.fillStyle=wg; ctx.fill();
    });
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 10. CYBER VORTEX
  // ══════════════════════════════════════════════════════════════════════════
  vortex(ctx, W, H, els, t) {
    ctx.fillStyle='#01010a'; ctx.fillRect(0,0,W,H);
    const cx=W/2, cy=H/2;
    const bgG=ctx.createRadialGradient(cx,cy,0,cx,cy,Math.max(W,H)*0.5);
    bgG.addColorStop(0,'rgba(0,220,255,0.06)'); bgG.addColorStop(0.5,'rgba(0,100,255,0.03)'); bgG.addColorStop(1,'transparent');
    ctx.fillStyle=bgG; ctx.fillRect(0,0,W,H);
    // Hex grid
    const hs=40;
    ctx.strokeStyle='rgba(0,180,255,0.03)'; ctx.lineWidth=0.5;
    for(let hx=-hs;hx<W+hs;hx+=hs*1.5){
      for(let hy=-hs;hy<H+hs;hy+=hs*Math.sqrt(3)){
        ctx.beginPath();
        for(let c=0;c<6;c++){
          const a=Math.PI/3*c, nx=hx+hs*Math.cos(a), ny=hy+hs*Math.sin(a);
          c===0?ctx.moveTo(nx,ny):ctx.lineTo(nx,ny);
        }
        ctx.closePath(); ctx.stroke();
      }
    }
    // Concentric rings
    const maxR=Math.min(W,H)*0.47;
    for(let r=0;r<18;r++){
      const frac=r/18, base=frac*maxR, pulse=Math.sin(t*1.8-frac*8)*8, rR=base+pulse;
      if(rR<=0) continue;
      const hue=(200+frac*60+t*20)%360, alpha=Math.max(0,0.6-frac*0.55+Math.sin(t*2+frac*5)*0.08);
      ctx.strokeStyle=`hsla(${hue},100%,65%,${alpha})`; ctx.lineWidth=1.5-frac*0.8;
      ctx.beginPath(); ctx.arc(cx,cy,rR,0,Math.PI*2); ctx.stroke();
    }
    // Spokes
    for(let s=0;s<6;s++){
      const ang=t*0.5+(s/6)*Math.PI*2;
      const sg=ctx.createLinearGradient(cx,cy,cx+Math.cos(ang)*maxR,cy+Math.sin(ang)*maxR);
      sg.addColorStop(0,'rgba(0,220,255,0.5)'); sg.addColorStop(1,'transparent');
      ctx.strokeStyle=sg; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+Math.cos(ang)*maxR,cy+Math.sin(ang)*maxR); ctx.stroke();
    }
    // Core
    const cR=12+Math.sin(t*4)*4;
    const cGlow=ctx.createRadialGradient(cx,cy,0,cx,cy,cR*5);
    cGlow.addColorStop(0,'rgba(0,240,255,0.8)'); cGlow.addColorStop(0.3,'rgba(0,160,255,0.3)'); cGlow.addColorStop(1,'transparent');
    ctx.fillStyle=cGlow; ctx.beginPath(); ctx.arc(cx,cy,cR*5,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#a0f0ff'; ctx.beginPath(); ctx.arc(cx,cy,cR,0,Math.PI*2); ctx.fill();
    // Orbiting dots
    els.forEach((p,i)=>{
      if(i>=20) return;
      const ang=t*(0.3+i*0.04)+i*(Math.PI*2/20);
      const oR=30+i*(maxR/20);
      const ox=cx+Math.cos(ang)*oR, oy=cy+Math.sin(ang)*oR*0.6;
      ctx.fillStyle=`rgba(0,220,255,${0.3+Math.sin(t*3+i)*0.2})`;
      ctx.beginPath(); ctx.arc(ox,oy,2.5,0,Math.PI*2); ctx.fill();
    });
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 11. PLASMA STORM
  // ══════════════════════════════════════════════════════════════════════════
  plasma(ctx, W, H, els, t) {
    ctx.fillStyle='#04000e'; ctx.fillRect(0,0,W,H);
    const oR=Math.min(W,H)*0.22;
    const c1x=W/2+Math.cos(t*0.4)*oR, c1y=H/2+Math.sin(t*0.4)*oR*0.5;
    const c2x=W/2+Math.cos(t*0.4+Math.PI)*oR, c2y=H/2+Math.sin(t*0.4+Math.PI)*oR*0.5;
    const p1G=ctx.createRadialGradient(c1x,c1y,0,c1x,c1y,300);
    p1G.addColorStop(0,'rgba(255,20,120,0.6)'); p1G.addColorStop(0.2,'rgba(200,0,100,0.35)'); p1G.addColorStop(0.5,'rgba(150,0,80,0.18)'); p1G.addColorStop(1,'transparent');
    ctx.fillStyle=p1G; ctx.fillRect(0,0,W,H);
    const p2G=ctx.createRadialGradient(c2x,c2y,0,c2x,c2y,300);
    p2G.addColorStop(0,'rgba(0,220,255,0.6)'); p2G.addColorStop(0.2,'rgba(0,180,220,0.35)'); p2G.addColorStop(0.5,'rgba(0,100,150,0.18)'); p2G.addColorStop(1,'transparent');
    ctx.fillStyle=p2G; ctx.fillRect(0,0,W,H);
    // Field lines
    for(let fl=0;fl<16;fl++){
      const startAng=(fl/16)*Math.PI*2, sR=35;
      const sx=c1x+Math.cos(startAng)*sR, sy=c1y+Math.sin(startAng)*sR;
      ctx.beginPath(); ctx.moveTo(sx,sy);
      let lx=sx, ly=sy;
      for(let step=0;step<40;step++){
        const dx1=lx-c1x, dy1=ly-c1y, dx2=lx-c2x, dy2=ly-c2y;
        const r1sq=dx1*dx1+dy1*dy1+1, r2sq=dx2*dx2+dy2*dy2+1;
        const fx=(dx1/r1sq)-(dx2/r2sq), fy=(dy1/r1sq)-(dy2/r2sq);
        const mag=Math.sqrt(fx*fx+fy*fy)+0.001;
        lx+=(fx/mag)*14; ly+=(fy/mag)*14; ctx.lineTo(lx,ly);
      }
      ctx.strokeStyle=`rgba(160,80,255,${0.15+Math.sin(t*2+fl)*0.05})`; ctx.lineWidth=0.8; ctx.stroke();
    }
    // Plasma clouds
    for(let pc=0;pc<4;pc++){
      const pcx=W*(0.2+pc*0.2)+Math.sin(t*0.3+pc*1.5)*60;
      const pcy=H*0.5+Math.cos(t*0.25+pc*2)*H*0.25;
      const pcR=80+Math.sin(t+pc)*30;
      const pcG=ctx.createRadialGradient(pcx,pcy,0,pcx,pcy,pcR);
      const hue=(280+pc*40+t*10)%360;
      pcG.addColorStop(0,`hsla(${hue},100%,70%,0.25)`); pcG.addColorStop(1,'transparent');
      ctx.fillStyle=pcG; ctx.fillRect(0,0,W,H);
    }
    // Core spots
    const c1cG=ctx.createRadialGradient(c1x,c1y,0,c1x,c1y,30);
    c1cG.addColorStop(0,'rgba(255,150,200,0.9)'); c1cG.addColorStop(1,'transparent');
    ctx.fillStyle=c1cG; ctx.beginPath(); ctx.arc(c1x,c1y,30,0,Math.PI*2); ctx.fill();
    const c2cG=ctx.createRadialGradient(c2x,c2y,0,c2x,c2y,30);
    c2cG.addColorStop(0,'rgba(100,240,255,0.9)'); c2cG.addColorStop(1,'transparent');
    ctx.fillStyle=c2cG; ctx.beginPath(); ctx.arc(c2x,c2y,30,0,Math.PI*2); ctx.fill();
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 12. GOLDEN SUNBEAMS
  // ══════════════════════════════════════════════════════════════════════════
  sunbeams(ctx, W, H, els, t) {
    const bgG=ctx.createLinearGradient(0,0,W,H);
    bgG.addColorStop(0,'#100800'); bgG.addColorStop(0.5,'#1e0f02'); bgG.addColorStop(1,'#0a0601');
    ctx.fillStyle=bgG; ctx.fillRect(0,0,W,H);
    const srcG=ctx.createRadialGradient(W*0.15,0,0,W*0.15,0,H*0.8);
    srcG.addColorStop(0,'rgba(255,210,80,0.35)'); srcG.addColorStop(0.3,'rgba(255,160,30,0.15)'); srcG.addColorStop(1,'transparent');
    ctx.fillStyle=srcG; ctx.fillRect(0,0,W,H);
    const srcG2=ctx.createRadialGradient(W*0.85,0,0,W*0.85,0,H*0.6);
    srcG2.addColorStop(0,'rgba(255,190,60,0.2)'); srcG2.addColorStop(1,'transparent');
    ctx.fillStyle=srcG2; ctx.fillRect(0,0,W,H);
    // Beams
    for(let i=0;i<9;i++){
      const pivot=W*(0.08+i*0.11), spread=W*0.065;
      const breathe=Math.sin(t*0.3+i*0.9)*0.04;
      const alpha=0.12+breathe+(i%2===0?0.05:0);
      const bG=ctx.createLinearGradient(pivot,0,pivot,H);
      bG.addColorStop(0,`rgba(255,200,60,${alpha+0.06})`); bG.addColorStop(0.4,`rgba(255,170,40,${alpha})`); bG.addColorStop(1,'transparent');
      ctx.beginPath(); ctx.moveTo(pivot-spread*0.3,0); ctx.lineTo(pivot+spread*0.3,0);
      ctx.lineTo(pivot+spread+W*0.05,H); ctx.lineTo(pivot-spread+W*0.05,H); ctx.closePath();
      ctx.fillStyle=bG; ctx.fill();
    }
    const flG=ctx.createLinearGradient(0,H*0.6,0,H);
    flG.addColorStop(0,'transparent'); flG.addColorStop(1,'rgba(255,140,20,0.08)');
    ctx.fillStyle=flG; ctx.fillRect(0,H*0.6,W,H*0.4);
    // Dust motes
    els.forEach(p=>{
      p.x+=Math.sin(t*0.2+p.y*0.01)*0.35; p.y-=0.2+Math.sin(t*0.1+p.x*0.02)*0.1;
      if(p.y<0) p.y=H; if(p.x<0) p.x=W; if(p.x>W) p.x=0;
      const pulse=(Math.sin(t*1.5+p.x*0.05)+1)*0.4+0.2;
      const mG=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.size*4);
      mG.addColorStop(0,`rgba(255,220,100,${pulse*0.7})`); mG.addColorStop(1,'transparent');
      ctx.fillStyle=mG; ctx.beginPath(); ctx.arc(p.x,p.y,p.size*4,0,Math.PI*2); ctx.fill();
      ctx.fillStyle=`rgba(255,240,180,${pulse*0.9})`; ctx.beginPath(); ctx.arc(p.x,p.y,p.size*0.8,0,Math.PI*2); ctx.fill();
    });
    // Vignette
    const vig=ctx.createRadialGradient(W/2,H/2,H*0.3,W/2,H/2,H*0.85);
    vig.addColorStop(0,'transparent'); vig.addColorStop(1,'rgba(0,0,0,0.35)');
    ctx.fillStyle=vig; ctx.fillRect(0,0,W,H);
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 13. CYBER HIGHWAY
  // ══════════════════════════════════════════════════════════════════════════
  highway(ctx, W, H, els, t, spd) {
    const sky=ctx.createLinearGradient(0,0,0,H);
    sky.addColorStop(0,'#030610'); sky.addColorStop(0.5,'#090f22'); sky.addColorStop(1,'#180830');
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
    // Distant city
    [0,0.04,0.08,0.12,0.15,0.18,0.22,0.26,0.30,0.35,0.40,0.44,0.48,0.52,0.56,0.60,0.65,0.70,0.74,0.78,0.82,0.86,0.90,0.94,0.98].forEach((xF,i)=>{
      const bh=(0.06+(i%6)*0.025)*H, bw=(0.025+(i%3)*0.01)*W;
      ctx.fillStyle='#09101e'; ctx.fillRect(xF*W,H*0.62-bh,bw,bh);
      if(i%2===0){
        const wc=i%4===0?'0,220,255':'255,140,60';
        ctx.fillStyle=`rgba(${wc},0.25)`;
        ctx.fillRect(xF*W+3,H*0.62-bh+8,3,4); ctx.fillRect(xF*W+8,H*0.62-bh+14,3,4);
      }
    });
    // Horizon glow
    const hg=ctx.createLinearGradient(0,H*0.55,0,H*0.68);
    hg.addColorStop(0,'transparent'); hg.addColorStop(0.5,'rgba(40,80,200,0.12)'); hg.addColorStop(1,'transparent');
    ctx.fillStyle=hg; ctx.fillRect(0,H*0.55,W,H*0.13);
    // Road
    const rg=ctx.createLinearGradient(0,H*0.62,0,H);
    rg.addColorStop(0,'#0f1520'); rg.addColorStop(1,'#07090f');
    ctx.fillStyle=rg; ctx.fillRect(0,H*0.62,W,H*0.38);
    // Lane markings
    const vpX=W/2, vpY=H*0.62;
    for(let lane=-2;lane<=2;lane++){
      if(lane===0) continue;
      for(let d=0;d<12;d++){
        const frac=d/12, nextFrac=(d+0.45)/12;
        const dashY=vpY+frac*(H-vpY), nextY=vpY+nextFrac*(H-vpY);
        const dashX=vpX+lane*80*frac, dashW=2+frac*2;
        ctx.fillStyle=`rgba(255,255,255,${0.05+frac*0.08})`;
        ctx.fillRect(dashX-dashW/2,dashY,dashW,nextY-dashY);
      }
    }
    // Overpass
    const opY=H*0.55;
    ctx.fillStyle='#050810'; ctx.fillRect(0,opY,W,28);
    [0.15,0.35,0.55,0.75,0.92].forEach(xF=>{ ctx.fillRect(xF*W-14,opY+28,28,H-opY-28); });
    const uG=ctx.createLinearGradient(0,opY+28,0,opY+55);
    uG.addColorStop(0,'rgba(0,180,255,0.08)'); uG.addColorStop(1,'transparent');
    ctx.fillStyle=uG; ctx.fillRect(0,opY+28,W,27);
    // Light trails
    const trTime=t*spd*35;
    for(let car=0;car<5;car++){
      const cPos=((trTime*(0.5+car*0.2)+car*W/5)%W);
      const lY=H*0.65+car*(H*0.05), tLen=120+car*30;
      const cg=ctx.createLinearGradient(cPos-tLen,lY,cPos,lY);
      cg.addColorStop(0,'transparent'); cg.addColorStop(0.6,'rgba(0,200,255,0.2)'); cg.addColorStop(1,'rgba(0,240,255,0.7)');
      ctx.fillStyle=cg; ctx.fillRect(cPos-tLen,lY-2,tLen,3);
      ctx.fillStyle='rgba(180,255,255,0.9)';
      ctx.beginPath(); ctx.arc(cPos,lY,3,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(cPos,lY+6,3,0,Math.PI*2); ctx.fill();
    }
    for(let car=0;car<5;car++){
      const cPos=W-((trTime*(0.4+car*0.15)+car*W/5)%W);
      const lY=H*0.72+car*(H*0.04), tLen=100+car*25;
      const cg=ctx.createLinearGradient(cPos,lY,cPos+tLen,lY);
      cg.addColorStop(0,'rgba(255,30,80,0.7)'); cg.addColorStop(0.4,'rgba(200,0,60,0.2)'); cg.addColorStop(1,'transparent');
      ctx.fillStyle=cg; ctx.fillRect(cPos,lY-2,tLen,3);
      ctx.fillStyle='rgba(255,100,120,0.9)';
      ctx.beginPath(); ctx.arc(cPos,lY,3,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(cPos,lY+5,3,0,Math.PI*2); ctx.fill();
    }
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 14. MOON ORBIT
  // ══════════════════════════════════════════════════════════════════════════
  orbital(ctx, W, H, els, t) {
    ctx.fillStyle='#01020a'; ctx.fillRect(0,0,W,H);
    // Stars
    els.forEach((p,i)=>{
      const tw=Math.sin(t*1.5+p.x*0.05+i)*0.35+0.65;
      const sc=i%3===0?'220,230,255':i%3===1?'255,240,220':'200,255,240';
      ctx.fillStyle=`rgba(${sc},${p.alpha*tw*0.8})`;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.size*0.4,0,Math.PI*2); ctx.fill();
    });
    // Background planet
    const pBX=W*0.88, pBY=H*0.9, pBR=H*0.28;
    const pbG=ctx.createRadialGradient(pBX-pBR*0.3,pBY-pBR*0.3,pBR*0.1,pBX,pBY,pBR);
    pbG.addColorStop(0,'#161030'); pbG.addColorStop(0.5,'#0c0820'); pbG.addColorStop(1,'#050310');
    ctx.fillStyle=pbG; ctx.beginPath(); ctx.arc(pBX,pBY,pBR,0,Math.PI*2); ctx.fill();
    const pbR=ctx.createRadialGradient(pBX,pBY,pBR*0.8,pBX,pBY,pBR);
    pbR.addColorStop(0,'transparent'); pbR.addColorStop(1,'rgba(80,40,180,0.4)');
    ctx.fillStyle=pbR; ctx.beginPath(); ctx.arc(pBX,pBY,pBR,0,Math.PI*2); ctx.fill();
    // Moon
    const mx=W*0.3, my=H*0.32, mr=Math.min(W,H)*0.13;
    const mHalo=ctx.createRadialGradient(mx,my,mr*0.5,mx,my,mr*2.5);
    mHalo.addColorStop(0,'rgba(255,240,180,0.18)'); mHalo.addColorStop(0.4,'rgba(255,220,120,0.06)'); mHalo.addColorStop(1,'transparent');
    ctx.fillStyle=mHalo; ctx.fillRect(0,0,W,H);
    const mbG=ctx.createRadialGradient(mx-mr*0.25,my-mr*0.25,mr*0.05,mx,my,mr);
    mbG.addColorStop(0,'#f5e8c0'); mbG.addColorStop(0.5,'#d4b870'); mbG.addColorStop(1,'#8a6030');
    ctx.fillStyle=mbG; ctx.beginPath(); ctx.arc(mx,my,mr,0,Math.PI*2); ctx.fill();
    // Craters
    [{x:-0.2,y:-0.3,r:0.15},{x:0.3,y:0.2,r:0.12},{x:-0.1,y:0.35,r:0.09},{x:0.25,y:-0.15,r:0.08}].forEach(c=>{
      const crX=mx+c.x*mr, crY=my+c.y*mr, crR=c.r*mr;
      ctx.fillStyle='rgba(90,60,20,0.35)'; ctx.beginPath(); ctx.arc(crX,crY,crR,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle='rgba(255,220,140,0.2)'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.arc(crX-crR*0.2,crY-crR*0.2,crR,0,Math.PI*2); ctx.stroke();
    });
    // Crescent shadow
    ctx.fillStyle='#01020a'; ctx.beginPath(); ctx.arc(mx+mr*0.42,my-mr*0.08,mr*0.88,0,Math.PI*2); ctx.fill();
    // Orbit path
    const oA=W*0.38, oB=H*0.28, oCX=W*0.52, oCY=H*0.5, oT=-Math.PI/10;
    ctx.save(); ctx.translate(oCX,oCY); ctx.rotate(oT);
    ctx.strokeStyle='rgba(200,220,255,0.18)'; ctx.lineWidth=1; ctx.setLineDash([6,10]);
    ctx.beginPath(); ctx.ellipse(0,0,oA,oB,0,0,Math.PI*2); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
    // Satellite
    const sAng=t*0.45;
    const sX=oCX+Math.cos(sAng)*oA*Math.cos(oT)-Math.sin(sAng)*oB*Math.sin(oT);
    const sY=oCY+Math.cos(sAng)*oA*Math.sin(oT)+Math.sin(sAng)*oB*Math.cos(oT);
    ctx.save(); ctx.translate(sX,sY); ctx.rotate(sAng+Math.PI/4);
    ctx.fillStyle='#a0c0e0'; ctx.fillRect(-8,-3,16,6);
    ctx.fillStyle='#1a3a6a'; ctx.fillRect(-16,-2,7,4); ctx.fillRect(9,-2,7,4); ctx.restore();
    const satG=ctx.createRadialGradient(sX,sY,0,sX,sY,18);
    satG.addColorStop(0,'rgba(100,200,255,0.5)'); satG.addColorStop(1,'transparent');
    ctx.fillStyle=satG; ctx.beginPath(); ctx.arc(sX,sY,18,0,Math.PI*2); ctx.fill();
    // Second satellite
    const s2A=t*0.28+Math.PI*0.7;
    const s2X=oCX+Math.cos(s2A)*oA*0.75*Math.cos(oT+0.3)-Math.sin(s2A)*oB*0.75*Math.sin(oT+0.3);
    const s2Y=oCY+Math.cos(s2A)*oA*0.75*Math.sin(oT+0.3)+Math.sin(s2A)*oB*0.75*Math.cos(oT+0.3);
    ctx.fillStyle='rgba(180,200,255,0.7)'; ctx.beginPath(); ctx.arc(s2X,s2Y,3.5,0,Math.PI*2); ctx.fill();
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 15. LASER PYRAMID
  // ══════════════════════════════════════════════════════════════════════════
  pyramid(ctx, W, H, els, t) {
    const sky=ctx.createLinearGradient(0,0,0,H*0.72);
    sky.addColorStop(0,'#02010f'); sky.addColorStop(0.5,'#07041a'); sky.addColorStop(1,'#110930');
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
    // Stars
    els.forEach(p=>{
      if(p.y>H*0.68) return;
      const tw=Math.sin(t*1.6+p.x*0.06)*0.3+0.7;
      ctx.fillStyle=`rgba(220,210,255,${p.alpha*tw*0.7})`;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.size*0.38,0,Math.PI*2); ctx.fill();
    });
    // Dune horizon
    ctx.fillStyle='#08050f'; ctx.beginPath(); ctx.moveTo(0,H); ctx.lineTo(0,H*0.75);
    for(let x=0;x<=W;x+=30){
      const dy=H*0.75+Math.sin(x*0.006+1)*H*0.04+Math.cos(x*0.003)*H*0.03; ctx.lineTo(x,dy);
    }
    ctx.lineTo(W,H*0.75); ctx.lineTo(W,H); ctx.fill();
    // Ground
    const gG=ctx.createLinearGradient(0,H*0.73,0,H);
    gG.addColorStop(0,'#06040f'); gG.addColorStop(1,'#02010a');
    ctx.fillStyle=gG; ctx.fillRect(0,H*0.73,W,H*0.27);
    // Pyramid
    const aX=W/2, aY=H*0.22, bW=Math.min(W*0.55,500), bY=H*0.73;
    const sG=ctx.createRadialGradient(aX,bY,0,aX,bY,bW*0.65);
    sG.addColorStop(0,'rgba(80,0,200,0.12)'); sG.addColorStop(1,'transparent');
    ctx.fillStyle=sG; ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#040210';
    ctx.beginPath(); ctx.moveTo(aX,aY); ctx.lineTo(aX-bW/2,bY); ctx.lineTo(aX+bW/2,bY); ctx.closePath(); ctx.fill();
    // Face shading
    const lfG=ctx.createLinearGradient(aX-bW/2,bY,aX,aY);
    lfG.addColorStop(0,'rgba(60,30,120,0.12)'); lfG.addColorStop(1,'rgba(60,30,120,0)');
    ctx.fillStyle=lfG; ctx.beginPath(); ctx.moveTo(aX,aY); ctx.lineTo(aX-bW/2,bY); ctx.lineTo(aX,bY); ctx.closePath(); ctx.fill();
    // Edge glow
    ctx.strokeStyle='rgba(120,60,255,0.3)'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(aX,aY); ctx.lineTo(aX-bW/2,bY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(aX,aY); ctx.lineTo(aX+bW/2,bY); ctx.stroke();
    // Laser beams
    [-0.18,-0.07,0,0.07,0.18].forEach((ang,i)=>{
      const pulse=Math.sin(t*2.5+i*0.8)*0.3+0.7, isCenter=i===2;
      const bEX=aX+Math.sin(ang)*H, bEY=aY-Math.cos(ang)*H;
      const lG=ctx.createLinearGradient(aX,aY,bEX,bEY);
      if(isCenter){ lG.addColorStop(0,`rgba(100,220,255,${pulse*0.9})`); lG.addColorStop(0.1,`rgba(60,180,255,${pulse*0.5})`); }
      else { lG.addColorStop(0,`rgba(180,80,255,${pulse*0.7})`); lG.addColorStop(0.1,`rgba(120,40,200,${pulse*0.3})`); }
      lG.addColorStop(1,'transparent');
      const bW2=isCenter?3:1.5;
      ctx.save(); ctx.translate(aX,aY); ctx.rotate(ang);
      ctx.fillStyle=lG; ctx.beginPath();
      ctx.moveTo(-bW2,0); ctx.lineTo(bW2,0); ctx.lineTo(bW2*2.5,-H); ctx.lineTo(-bW2*2.5,-H); ctx.closePath(); ctx.fill();
      ctx.restore();
    });
    // Apex glow
    const agG=ctx.createRadialGradient(aX,aY,0,aX,aY,50);
    agG.addColorStop(0,`rgba(150,240,255,${0.8+Math.sin(t*3)*0.15})`); agG.addColorStop(0.2,'rgba(80,160,255,0.4)'); agG.addColorStop(1,'transparent');
    ctx.fillStyle=agG; ctx.beginPath(); ctx.arc(aX,aY,50,0,Math.PI*2); ctx.fill();
    ctx.fillStyle=`rgba(220,255,255,${0.9+Math.sin(t*4)*0.09})`;
    ctx.beginPath(); ctx.arc(aX,aY,4,0,Math.PI*2); ctx.fill();
    // Ground rings
    for(let ring=0;ring<4;ring++){
      const rP=((t*0.4+ring*0.25)%1), rR=rP*bW*0.6, rA=(1-rP)*0.15;
      ctx.strokeStyle=`rgba(100,60,255,${rA})`; ctx.lineWidth=1;
      ctx.beginPath(); ctx.ellipse(aX,bY,rR,rR*0.25,0,0,Math.PI*2); ctx.stroke();
    }
  }

};
