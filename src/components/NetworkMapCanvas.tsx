// הוספת קוד מלא לקובץ NetworkMapCanvas.tsx בקומפוננטת React מבוססת Canvas עם אנימציה מתקדמת של רשת נקודות וקווים

'use client';
import React, { useRef, useEffect } from 'react';

type Point = {
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  pulseDirection: number; // 1 or -1
  pulseSpeed: number;
};

export default function NetworkMapCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | undefined>(undefined);
  const points = useRef<Point[]>([]);

  const POINT_COUNT = 120;
  const MAX_DISTANCE = 120;

  const initPoints = (width: number, height: number) => {
    points.current = [];
    for (let i = 0; i < POINT_COUNT; i++) {
      points.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 2 + Math.random() * 2,
        baseRadius: 2,
        pulseDirection: Math.random() > 0.5 ? 1 : -1,
        pulseSpeed: 0.005 + Math.random() * 0.007,
      });
    }
  };

  const distance = (p1: Point, p2: Point) => {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
  };

  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    ctx.lineCap = 'round';

    // Draw points with glow effect
    points.current.forEach((p) => {
      // Update pulse animation
      p.radius += p.pulseDirection * p.pulseSpeed * 15;
      if (p.radius > p.baseRadius + 1.5) p.pulseDirection = -1;
      if (p.radius < p.baseRadius - 1.5) p.pulseDirection = 1;

      // Outer glow
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
      gradient.addColorStop(0, 'rgba(39, 216, 253, 0.9)');
      gradient.addColorStop(0.8, 'rgba(39, 216, 253, 0.1)');
      gradient.addColorStop(1, 'rgba(39, 216, 253, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
      ctx.fill();

      // Core point
      ctx.fillStyle = 'rgba(39, 216, 253, 1)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw connecting lines
    ctx.strokeStyle = 'rgba(39, 216, 253, 0.25)';
    ctx.lineWidth = 1.3;

    for (let i = 0; i < points.current.length; i++) {
      for (let j = i + 1; j < points.current.length; j++) {
        const dist = distance(points.current[i], points.current[j]);
        if (dist < MAX_DISTANCE) {
          ctx.globalAlpha = 1 - dist / MAX_DISTANCE;
          ctx.beginPath();
          ctx.moveTo(points.current[i].x, points.current[i].y);
          ctx.lineTo(points.current[j].x, points.current[j].y);
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth * dpr;
      const height = canvas.clientHeight * dpr;

      canvas.width = width;
      canvas.height = height;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initPoints(canvas.clientWidth, canvas.clientHeight);
    };

    resizeCanvas();

    const animate = () => {
      if (!ctx) return;
      draw(ctx, canvas.clientWidth, canvas.clientHeight);
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', resizeCanvas);
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute left-1/2 top-[180px] -translate-x-1/2 w-[900px] max-w-[97vw] h-[400px] pointer-events-none z-0"
      style={{ filter: 'drop-shadow(0 0 20px #0ca3ff) drop-shadow(0 0 10px #1b2a49)' }}
    />
  );
}