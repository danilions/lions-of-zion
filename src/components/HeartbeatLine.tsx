'use client';
import React, { useEffect, useRef } from 'react';

export default function HeartbeatLine() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId: number;

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#1ec6ff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);

      for (let x = 0; x < canvas.width; x += 2) {
        const t = (x + performance.now() / 3.7) / 27.5;
        let y = canvas.height / 2 + Math.sin(t) * 7;

        if (Math.floor((x + performance.now() / 7) / 180) % 2 === 0 && (x % 180) < 20) {
          y -= 20 * Math.exp(-0.09 * (x % 180));
        }
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      // TRUE / FALSE labels
      ctx.font = 'bold 15px Arial, sans-serif';
      ctx.fillStyle = '#2ffe89';
      ctx.fillText('TRUE', 80, 15);
      ctx.fillStyle = '#ff4d4d';
      ctx.fillText('FALSE', canvas.width - 100, canvas.height - 10);

      animationFrameId = requestAnimationFrame(draw);
    };

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    draw();

    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
      }, 150);
    };

    window.addEventListener('resize', debouncedResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);

  return <canvas ref={canvasRef} id="heartbeat-canvas" className="w-full h-full" />;
}
