'use client'

import { useEffect, useRef } from 'react'

export default function HeartbeatLine() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Animation state
    let animationId: number
    let time = 0

    // Render heartbeat line
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      ctx.strokeStyle = '#00AEEF'
      ctx.lineWidth = 2
      ctx.shadowColor = '#00AEEF'
      ctx.shadowBlur = 5
      
      ctx.beginPath()
      
      const centerY = canvas.height / 2
      const amplitude = 20
      
      for (let x = 0; x < canvas.width; x++) {
        let y = centerY
        
        // Create heartbeat pattern
        const normalizedX = (x - time) % 200
        
        if (normalizedX < 20) {
          y = centerY
        } else if (normalizedX < 30) {
          y = centerY - amplitude * 0.5
        } else if (normalizedX < 40) {
          y = centerY + amplitude
        } else if (normalizedX < 50) {
          y = centerY - amplitude * 1.5
        } else if (normalizedX < 60) {
          y = centerY + amplitude * 0.8
        } else if (normalizedX < 70) {
          y = centerY - amplitude * 0.3
        } else {
          y = centerY
        }
        
        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      
      ctx.stroke()
      
      time += 3
      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
    />
  )
}
