import React, { useEffect, useRef } from 'react';

/**
 * Dynamic 3D Cyber Network & Holographic Energy VFX
 * Designed for BuildBytes Digital Studio:
 * - Real-time 3D interconnected node constellation with harmonic wave physics
 * - High-speed glowing data packets shooting through automation pipelines
 * - Dynamic mouse gravity & shockwave ripples on cursor movement & click
 * - Sweeping holographic cyber scanlines & kinetic pulse beacons
 * - 60 FPS hardware-accelerated canvas engine
 */
export default function HeroVantaVFX() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    // Mouse state with spring damping
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      vx: 0,
      vy: 0,
      isHovered: false,
    };

    // Click shockwaves
    const shockwaves = [];

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
      mouse.isHovered = false;
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      shockwaves.push({
        x: clickX,
        y: clickY,
        radius: 5,
        maxRadius: 260,
        alpha: 0.9,
        color: Math.random() > 0.5 ? 'rgba(0, 240, 255,' : 'rgba(229, 62, 156,',
      });
    };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);
    const parent = canvas.parentElement;
    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);
    parent.addEventListener('click', handleClick);

    // Vibrant neon tech color palette
    const colors = [
      { r: 123, g: 47, b: 247, hex: '#7B2FF7' }, // Electric Purple
      { r: 229, g: 62, b: 156, hex: '#E53E9C' }, // Neon Magenta
      { r: 79, g: 110, b: 247, hex: '#4F6EF7' },  // Cyber Blue
      { r: 0, g: 240, b: 255, hex: '#00F0FF' },   // Hologram Cyan
    ];

    // Generate 3D nodes
    const nodeCount = Math.min(95, Math.floor((width * height) / 11000));
    const nodes = [];
    const maxZ = 350;
    const minZ = -350;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * (width * 1.2),
        y: (Math.random() - 0.5) * (height * 1.2),
        z: Math.random() * (maxZ - minZ) + minZ,
        baseX: (Math.random() - 0.5) * (width * 1.2),
        baseY: (Math.random() - 0.5) * (height * 1.2),
        baseZ: Math.random() * (maxZ - minZ) + minZ,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        vz: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2.4 + 1.8,
        color: colors[i % colors.length],
        wavePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.03 + Math.random() * 0.05,
        pulseVal: Math.random() * Math.PI,
      });
    }

    // High-speed automation data packets
    const pulses = [];
    const maxPulses = 18;

    const spawnPulse = (i, j) => {
      if (pulses.length >= maxPulses) return;
      pulses.push({
        from: i,
        to: j,
        progress: 0,
        speed: 0.02 + Math.random() * 0.03,
        color: nodes[i].color,
        trail: [],
      });
    };

    // Camera 3D parameters
    const focalLength = 520;
    let cameraAngleX = 0;
    let cameraAngleY = 0;

    let scanlineY = 0;
    let lastTime = performance.now();

    const render = (now) => {
      const dt = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;
      const timeSec = now * 0.001;

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse damping
      mouse.vx = (mouse.targetX - mouse.x) * 0.08;
      mouse.vy = (mouse.targetY - mouse.y) * 0.08;
      mouse.x += mouse.vx;
      mouse.y += mouse.vy;

      // 3D camera rotation with smooth organic drift
      const targetAngleY = ((mouse.x - width / 2) / width) * 0.45;
      const targetAngleX = -((mouse.y - height / 2) / height) * 0.4;
      cameraAngleY += (targetAngleY - cameraAngleY) * 0.06;
      cameraAngleX += (targetAngleX - cameraAngleX) * 0.06;

      const cosY = Math.cos(cameraAngleY);
      const sinY = Math.sin(cameraAngleY);
      const cosX = Math.cos(cameraAngleX);
      const sinX = Math.sin(cameraAngleX);

      const centerX = width / 2;
      const centerY = height / 2;

      // 1. Holographic Cyber Scanline (sweeps vertically across scene)
      scanlineY = (scanlineY + 1.2) % (height + 100);
      const gradScan = ctx.createLinearGradient(0, scanlineY - 40, 0, scanlineY + 40);
      gradScan.addColorStop(0, 'rgba(0, 240, 255, 0)');
      gradScan.addColorStop(0.5, 'rgba(0, 240, 255, 0.06)');
      gradScan.addColorStop(1, 'rgba(123, 47, 247, 0)');
      ctx.fillStyle = gradScan;
      ctx.fillRect(0, scanlineY - 40, width, 80);

      // 2. Render and expand click shockwaves
      for (let sIdx = shockwaves.length - 1; sIdx >= 0; sIdx--) {
        const sw = shockwaves[sIdx];
        sw.radius += 6;
        sw.alpha *= 0.95;

        if (sw.radius >= sw.maxRadius || sw.alpha <= 0.01) {
          shockwaves.splice(sIdx, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${sw.color} ${sw.alpha})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Secondary ripple
        if (sw.radius > 40) {
          ctx.beginPath();
          ctx.arc(sw.x, sw.y, sw.radius * 0.7, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(123, 47, 247, ${sw.alpha * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // 3. Project 3D nodes with harmonic wave physics
      const projected = [];

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Kinetic harmonic wave drift
        n.x += n.vx + Math.sin(timeSec * 1.5 + n.wavePhase) * 0.6;
        n.y += n.vy + Math.cos(timeSec * 1.2 + n.wavePhase) * 0.6;
        n.z += n.vz + Math.sin(timeSec * 0.9 + n.wavePhase) * 0.4;
        n.pulseVal += n.pulseSpeed;

        // Boundary reflection
        const boundX = width * 0.58;
        const boundY = height * 0.58;
        if (n.x < -boundX || n.x > boundX) n.vx *= -1;
        if (n.y < -boundY || n.y > boundY) n.vy *= -1;
        if (n.z < minZ || n.z > maxZ) n.vz *= -1;

        // 3D rotation matrix
        let x1 = n.x * cosY + n.z * sinY;
        let z1 = -n.x * sinY + n.z * cosY;
        let y1 = n.y * cosX - z1 * sinX;
        let z2 = n.y * sinX + z1 * cosX;

        // Perspective scale
        const zOffset = z2 + focalLength;
        if (zOffset <= 15) continue;
        const scale = focalLength / zOffset;

        const screenX = centerX + x1 * scale;
        const screenY = centerY + y1 * scale;

        // Dynamic mouse interaction: kinetic repulsion & gravity
        if (mouse.isHovered) {
          const dx = screenX - mouse.x;
          const dy = screenY - mouse.y;
          const mouseDist = Math.hypot(dx, dy);
          if (mouseDist < 160 && mouseDist > 0) {
            const force = (1 - mouseDist / 160) * 12;
            n.x += (dx / mouseDist) * force;
            n.y += (dy / mouseDist) * force;
          }
        }

        // React to click shockwaves
        for (const sw of shockwaves) {
          const sdx = screenX - sw.x;
          const sdy = screenY - sw.y;
          const sdist = Math.hypot(sdx, sdy);
          if (Math.abs(sdist - sw.radius) < 30) {
            n.vx += (sdx / (sdist || 1)) * 1.2;
            n.vy += (sdy / (sdist || 1)) * 1.2;
          }
        }

        projected.push({
          index: i,
          screenX,
          screenY,
          scale,
          z: z2,
          color: n.color,
          radius: n.radius * scale,
          pulseVal: n.pulseVal,
        });
      }

      // Max connection distance in 2D
      const maxDist = Math.min(175, width * 0.18);

      // 4. Draw dynamic geometric mesh connections & glowing facets
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];

        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          const dist = Math.hypot(p1.screenX - p2.screenX, p1.screenY - p2.screenY);

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * Math.min(p1.scale, p2.scale) * 0.55;

            // Gradient line connection
            const gradLine = ctx.createLinearGradient(p1.screenX, p1.screenY, p2.screenX, p2.screenY);
            gradLine.addColorStop(0, `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${lineAlpha})`);
            gradLine.addColorStop(1, `rgba(${p2.color.r}, ${p2.color.g}, ${p2.color.b}, ${lineAlpha})`);

            ctx.beginPath();
            ctx.strokeStyle = gradLine;
            ctx.lineWidth = Math.max(0.7, 1.8 * Math.min(p1.scale, p2.scale));
            ctx.moveTo(p1.screenX, p1.screenY);
            ctx.lineTo(p2.screenX, p2.screenY);
            ctx.stroke();

            // Chance to spawn an automation data pulse
            if (Math.random() < 0.005 && pulses.length < maxPulses) {
              spawnPulse(p1.index, p2.index);
            }

            // Translucent Vanta geometric polygon facet
            for (let k = j + 1; k < projected.length; k++) {
              const p3 = projected[k];
              const dist2 = Math.hypot(p2.screenX - p3.screenX, p2.screenY - p3.screenY);
              const dist3 = Math.hypot(p1.screenX - p3.screenX, p1.screenY - p3.screenY);

              if (dist2 < maxDist && dist3 < maxDist) {
                const polyAlpha = (1 - Math.max(dist, dist2, dist3) / maxDist) * 0.09;
                ctx.beginPath();
                ctx.fillStyle = `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${polyAlpha})`;
                ctx.moveTo(p1.screenX, p1.screenY);
                ctx.lineTo(p2.screenX, p2.screenY);
                ctx.lineTo(p3.screenX, p3.screenY);
                ctx.closePath();
                ctx.fill();
              }
            }
          }
        }
      }

      // 5. Draw high-speed traveling automation data packets with neon trails
      for (let pIdx = pulses.length - 1; pIdx >= 0; pIdx--) {
        const pulse = pulses[pIdx];
        pulse.progress += pulse.speed;

        const pFrom = projected.find((p) => p.index === pulse.from);
        const pTo = projected.find((p) => p.index === pulse.to);

        if (!pFrom || !pTo || pulse.progress >= 1) {
          pulses.splice(pIdx, 1);
          continue;
        }

        const px = pFrom.screenX + (pTo.screenX - pFrom.screenX) * pulse.progress;
        const py = pFrom.screenY + (pTo.screenY - pFrom.screenY) * pulse.progress;
        const pScale = (pFrom.scale + pTo.scale) * 0.5;

        // Glowing packet spark with core
        ctx.beginPath();
        ctx.arc(px, py, Math.max(2.5, 4.5 * pScale), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, 0.95)`;
        ctx.shadowColor = `rgba(${pulse.color.r}, ${pulse.color.g}, ${pulse.color.b}, 0.9)`;
        ctx.shadowBlur = 14;
        ctx.fill();

        // Neon outer aura
        ctx.beginPath();
        ctx.arc(px, py, Math.max(5, 9 * pScale), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pulse.color.r}, ${pulse.color.g}, ${pulse.color.b}, 0.35)`;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      // 6. Draw 3D glowing nodes with live breathing glow
      projected.forEach((p) => {
        const pulseEffect = Math.sin(p.pulseVal) * 0.5 + 0.5;
        const nodeAlpha = Math.min(1, p.scale * 0.9);

        // Dynamic outer glow
        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, p.radius * (2.0 + pulseEffect * 0.8), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${0.22 * nodeAlpha})`;
        ctx.fill();

        // High-contrast bright core
        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, Math.max(1.8, p.radius), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * nodeAlpha})`;
        ctx.fill();
      });

      // 7. Dynamic cursor telemetry targeting reticle & glowing beacon
      if (mouse.isHovered) {
        const angle = timeSec * 2;
        ctx.save();
        ctx.translate(mouse.x, mouse.y);
        ctx.rotate(angle);

        // Outer rotating dashed targeting bracket
        ctx.beginPath();
        ctx.arc(0, 0, 48, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([8, 12]);
        ctx.stroke();

        // Inner counter-rotating ring
        ctx.beginPath();
        ctx.arc(0, 0, 32, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(229, 62, 156, 0.35)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 8]);
        ctx.stroke();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
        parent.removeEventListener('click', handleClick);
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none -z-20 overflow-hidden"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-85 sm:opacity-95 mix-blend-screen transition-opacity duration-700"
      />
    </div>
  );
}
