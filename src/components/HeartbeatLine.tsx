"use client";
import React, { useEffect, useRef } from "react";

export default function HeartbeatLine() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animationSpeed = 2;
    let time = 0;

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set line style
      ctx.strokeStyle = "#1ec6ff";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Draw heartbeat line
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);

      for (let x = 0; x < canvas.width; x += 2) {
        // Base sine wave for smooth line
        const baseY = canvas.height / 2 + Math.sin((x + time) / 30) * 8;

        // Add heartbeat spikes at intervals
        const beatInterval = 120;
        const beatPosition = (x + time) % beatInterval;
        let spikeY = 0;

        // Create double spike pattern (lub-dub)
        if (beatPosition < 15) {
          spikeY = -25 * Math.exp(-Math.pow(beatPosition - 7, 2) / 10);
        } else if (beatPosition >= 20 && beatPosition < 35) {
          spikeY = -35 * Math.exp(-Math.pow(beatPosition - 27, 2) / 15);
        }

        const y = baseY + spikeY;
        ctx.lineTo(x, y);
      }

      ctx.stroke();

      // Draw TRUE label (green)
      ctx.font = "bold 16px Arial, sans-serif";
      ctx.fillStyle = "#22c55e";
      ctx.textAlign = "left";
      ctx.fillText("TRUE", 20, 25);

      // Draw FALSE label (red)
      ctx.fillStyle = "#ef4444";
      ctx.textAlign = "right";
      ctx.fillText("FALSE", canvas.width - 20, canvas.height - 15);

      // Update animation
      time += animationSpeed;
      animationFrameId.current = requestAnimationFrame(draw);
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // Set actual size in memory (scaled to account for extra pixel density)
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Scale the drawing context so everything will work at the higher ratio
      ctx.scale(dpr, dpr);

      // Set display size (CSS pixels)
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
    };

    // Initial setup
    resizeCanvas();
    draw();

    // Handle window resize
    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full border border-cyan-500/20 rounded-lg bg-gradient-to-r from-slate-900/50 to-blue-900/30 shadow-lg"
      style={{ minHeight: "60px" }}
    />
  );
}
