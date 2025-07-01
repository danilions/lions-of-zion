'use client'

import React, { useRef, useEffect, useCallback } from 'react'

interface NetworkNode {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  baseRadius: number
  pulsePhase: number
  pulseSpeed: number
  connections: number[]
  intensity: number
}

interface FlowingPoint {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  intensity: number
  trail: { x: number; y: number; alpha: number }[]
}

export default function UnifiedNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const nodesRef = useRef<NetworkNode[]>([])
  const flowingPointsRef = useRef<FlowingPoint[]>([])
  const timeRef = useRef(0)

  // Increased node density and connection distance for better visual impact
  const NODE_COUNT = 45
  const FLOWING_POINTS_COUNT = 18
  const MAX_CONNECTION_DISTANCE = 220
  const TRAIL_LENGTH = 18

  /** 
   * Recompute the connection list for every node based on distance.
   * Extracted from duplicated logic in initializeNodes and updateNodes.
   */
  function recalculateConnections() {
    nodesRef.current.forEach((node, i) => {
      node.connections = []
      nodesRef.current.forEach((otherNode, j) => {
        if (i !== j) {
          const dist = Math.hypot(node.x - otherNode.x, node.y - otherNode.y)
          if (dist < MAX_CONNECTION_DISTANCE && node.connections.length < 4) {
            node.connections.push(j)
          }
        }
      })
    })
  }

  const initializeNodes = useCallback((width: number, height: number) => {
    nodesRef.current = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: 3 + Math.random() * 4,
      baseRadius: 3 + Math.random() * 4,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.015 + Math.random() * 0.025,
      connections: [],
      intensity: 0.6 + Math.random() * 0.4
    }))

    // Calculate initial connections
    recalculateConnections()
  }, [])

  const initializeFlowingPoints = useCallback((width: number, height: number) => {
    flowingPointsRef.current = Array.from({ length: FLOWING_POINTS_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      life: Math.random() * 400,
      maxLife: 400 + Math.random() * 300,
      intensity: 0.7 + Math.random() * 0.5,
      trail: []
    }))
  }, [])

  const updateNodes = useCallback((width: number, height: number) => {
    nodesRef.current.forEach(node => {
      // Update position
      node.x += node.vx
      node.y += node.vy

      // Bounce off edges with padding
      const padding = 80
      if (node.x <= padding || node.x >= width - padding) {
        node.vx *= -0.7
        node.x = Math.max(padding, Math.min(width - padding, node.x))
      }
      if (node.y <= padding || node.y >= height - padding) {
        node.vy *= -0.7
        node.y = Math.max(padding, Math.min(height - padding, node.y))
      }

      // Update pulse animation
      node.pulsePhase += node.pulseSpeed
      node.radius = node.baseRadius + Math.sin(node.pulsePhase) * 2
      node.intensity = 0.5 + Math.sin(node.pulsePhase * 0.5) * 0.3
    })

    // Recalculate connections
    if (timeRef.current % 120 === 0) {
      recalculateConnections()
    }
  }, [])

  const updateFlowingPoints = useCallback((width: number, height: number) => {
    flowingPointsRef.current.forEach(point => {
      // Update trail
      point.trail.unshift({ x: point.x, y: point.y, alpha: 1 })
      if (point.trail.length > TRAIL_LENGTH) {
        point.trail.pop()
      }

      // Update trail alpha
      point.trail.forEach((segment, i) => {
        segment.alpha = (1 - i / TRAIL_LENGTH) * 0.9
      })

      // Update position
      point.x += point.vx
      point.y += point.vy

      // Wrap around edges smoothly
      if (point.x < -50) point.x = width + 50
      if (point.x > width + 50) point.x = -50
      if (point.y < -50) point.y = height + 50
      if (point.y > height + 50) point.y = -50

      // Update life cycle
      point.life++
      if (point.life > point.maxLife) {
        point.x = Math.random() * width
        point.y = Math.random() * height
        point.vx = (Math.random() - 0.5) * 1.5
        point.vy = (Math.random() - 0.5) * 1.5
        point.life = 0
        point.maxLife = 400 + Math.random() * 300
        point.trail = []
      }

      // Subtle attraction to nearest node
      let nearestNode = nodesRef.current[0]
      let nearestDist = Infinity
      nodesRef.current.forEach(node => {
        const dist = Math.hypot(point.x - node.x, point.y - node.y)
        if (dist < nearestDist) {
          nearestDist = dist
          nearestNode = node
        }
      })

      if (nearestDist < 120) {
        const attraction = 0.003
        const dx = nearestNode.x - point.x
        const dy = nearestNode.y - point.y
        point.vx += dx * attraction
        point.vy += dy * attraction
      }

      // Apply drag
      point.vx *= 0.995
      point.vy *= 0.995
    })
  }, [])

  const drawNetwork = useCallback((ctx: CanvasRenderingContext2D) => {
    // Draw connections with enhanced styling
    ctx.strokeStyle = 'rgba(0, 174, 239, 0.2)'
    ctx.lineWidth = 1.2
    ctx.lineCap = 'round'

    nodesRef.current.forEach((node, i) => {
      node.connections.forEach(connectionIndex => {
        if (connectionIndex > i) {
          const otherNode = nodesRef.current[connectionIndex]
          const dist = Math.hypot(node.x - otherNode.x, node.y - otherNode.y)
          const alpha = Math.max(0, 1 - dist / MAX_CONNECTION_DISTANCE) * 0.4

          // Create gradient line
          const gradient = ctx.createLinearGradient(node.x, node.y, otherNode.x, otherNode.y)
          gradient.addColorStop(0, `rgba(0, 174, 239, ${alpha * node.intensity})`)
          gradient.addColorStop(0.5, `rgba(77, 200, 240, ${alpha * 0.8})`)
          gradient.addColorStop(1, `rgba(0, 174, 239, ${alpha * otherNode.intensity})`)
          
          ctx.strokeStyle = gradient
          ctx.globalAlpha = alpha
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(otherNode.x, otherNode.y)
          ctx.stroke()
        }
      })
    })

    ctx.globalAlpha = 1

    // Draw nodes with enhanced high-resolution glow
    nodesRef.current.forEach(node => {
      // Save context to restore shadow settings later
      ctx.save()
      
      // Enhanced outer glow effect with wider radius
      const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 5)
      glowGradient.addColorStop(0, `rgba(0, 174, 239, ${node.intensity * 0.9})`)
      glowGradient.addColorStop(0.3, `rgba(77, 200, 240, ${node.intensity * 0.5})`)
      glowGradient.addColorStop(0.7, `rgba(0, 174, 239, ${node.intensity * 0.2})`)
      glowGradient.addColorStop(1, 'rgba(0, 174, 239, 0)')
      
      ctx.fillStyle = glowGradient
      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius * 5, 0, Math.PI * 2)
      ctx.fill()

      // Mid-layer glow for more depth
      const midGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 3)
      midGradient.addColorStop(0, `rgba(77, 200, 240, ${node.intensity * 0.8})`)
      midGradient.addColorStop(0.4, `rgba(0, 174, 239, ${node.intensity * 0.6})`)
      midGradient.addColorStop(1, 'rgba(0, 174, 239, 0)')
      
      ctx.fillStyle = midGradient
      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2)
      ctx.fill()

      // Inner glow with higher intensity
      const innerGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 2)
      innerGradient.addColorStop(0, `rgba(128, 230, 255, ${node.intensity})`)
      innerGradient.addColorStop(0.7, `rgba(77, 200, 240, ${node.intensity * 0.7})`)
      innerGradient.addColorStop(1, `rgba(0, 174, 239, ${node.intensity * 0.3})`)
      
      ctx.fillStyle = innerGradient
      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2)
      ctx.fill()

      // Enhanced core node with stronger glow and sharpness
      ctx.shadowColor = '#4DC8F0'
      ctx.shadowBlur = 20
      ctx.fillStyle = '#FFFFFF' // Bright white core for more intensity
      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
      ctx.fill()
      
      // Restore context
      ctx.restore()
    })
  }, [])

  const drawFlowingPoints = useCallback((ctx: CanvasRenderingContext2D) => {
    flowingPointsRef.current.forEach(point => {
      // Save context state
      ctx.save()
      
      // Enhanced trail effects
      point.trail.forEach((segment, i) => {
        if (i === 0) return

        const size = (1 - i / TRAIL_LENGTH) * 6 // Slightly larger for better visibility
        const alpha = segment.alpha * point.intensity * 0.8 // Higher alpha for better visibility
        
        // Enhanced trail outer glow with wider radius
        const trailGradient = ctx.createRadialGradient(segment.x, segment.y, 0, segment.x, segment.y, size * 4)
        trailGradient.addColorStop(0, `rgba(77, 200, 240, ${alpha})`)
        trailGradient.addColorStop(0.4, `rgba(0, 174, 239, ${alpha * 0.7})`)
        trailGradient.addColorStop(0.7, `rgba(0, 174, 239, ${alpha * 0.3})`)
        trailGradient.addColorStop(1, 'rgba(0, 174, 239, 0)')
        
        ctx.fillStyle = trailGradient
        ctx.beginPath()
        ctx.arc(segment.x, segment.y, size * 4, 0, Math.PI * 2)
        ctx.fill()

        // Trail mid-layer for added depth
        const trailMidGradient = ctx.createRadialGradient(segment.x, segment.y, 0, segment.x, segment.y, size * 2)
        trailMidGradient.addColorStop(0, `rgba(128, 230, 255, ${alpha * 0.9})`)
        trailMidGradient.addColorStop(0.6, `rgba(77, 200, 240, ${alpha * 0.6})`)
        trailMidGradient.addColorStop(1, 'rgba(0, 174, 239, 0)')
        
        ctx.fillStyle = trailMidGradient
        ctx.beginPath()
        ctx.arc(segment.x, segment.y, size * 2, 0, Math.PI * 2)
        ctx.fill()

        // Trail core with enhanced glow
        ctx.shadowColor = '#4DC8F0'
        ctx.shadowBlur = 8
        ctx.fillStyle = `rgba(128, 230, 255, ${alpha * 1.2})`
        ctx.beginPath()
        ctx.arc(segment.x, segment.y, size, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Draw main flowing point with significantly enhanced effects
      const mainSize = 10 * point.intensity // Larger size for more impact
      const pulseSize = mainSize + Math.sin(timeRef.current * 0.08 + point.x * 0.005) * 4
      
      // Large outer glow area for dramatic effect
      const outerGlowGradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, pulseSize * 5)
      outerGlowGradient.addColorStop(0, `rgba(0, 174, 239, ${point.intensity * 0.4})`)
      outerGlowGradient.addColorStop(0.5, `rgba(0, 174, 239, ${point.intensity * 0.2})`)
      outerGlowGradient.addColorStop(1, 'rgba(0, 174, 239, 0)')
      
      ctx.fillStyle = outerGlowGradient
      ctx.beginPath()
      ctx.arc(point.x, point.y, pulseSize * 5, 0, Math.PI * 2)
      ctx.fill()

      // Mid-level glow for more depth
      const mainGradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, pulseSize * 3)
      mainGradient.addColorStop(0, `rgba(77, 200, 240, ${point.intensity})`)
      mainGradient.addColorStop(0.3, `rgba(0, 174, 239, ${point.intensity * 0.8})`)
      mainGradient.addColorStop(0.7, `rgba(0, 174, 239, ${point.intensity * 0.4})`)
      mainGradient.addColorStop(1, 'rgba(0, 174, 239, 0)')
      
      ctx.fillStyle = mainGradient
      ctx.beginPath()
      ctx.arc(point.x, point.y, pulseSize * 3, 0, Math.PI * 2)
      ctx.fill()

      // Inner glow for brighter core
      const innerGradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, pulseSize * 1.5)
      innerGradient.addColorStop(0, `rgba(255, 255, 255, ${point.intensity})`)
      innerGradient.addColorStop(0.5, `rgba(128, 230, 255, ${point.intensity * 0.8})`)
      innerGradient.addColorStop(1, `rgba(77, 200, 240, ${point.intensity * 0.4})`)
      
      ctx.fillStyle = innerGradient
      ctx.beginPath()
      ctx.arc(point.x, point.y, pulseSize * 1.5, 0, Math.PI * 2)
      ctx.fill()

      // Main core with enhanced shadow and brightness
      ctx.shadowColor = '#4DC8F0'
      ctx.shadowBlur = 25
      ctx.fillStyle = '#FFFFFF' // Pure white core for maximum brightness
      ctx.beginPath()
      ctx.arc(point.x, point.y, pulseSize, 0, Math.PI * 2)
      ctx.fill()
      
      // Restore context
      ctx.restore()
    })
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { width, height } = canvas

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Update animations
    updateNodes(width, height)
    updateFlowingPoints(width, height)

    // Draw layers
    drawNetwork(ctx)
    drawFlowingPoints(ctx)

    timeRef.current++
    animationFrameRef.current = requestAnimationFrame(animate)
  }, [updateNodes, updateFlowingPoints, drawNetwork, drawFlowingPoints])

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Ensure we're using the highest possible device pixel ratio for crystal clear rendering
    const dpr = Math.max(window.devicePixelRatio || 1, 2)

    // Set actual canvas dimensions scaled by device pixel ratio
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr

    const ctx = canvas.getContext('2d', { alpha: true })
    if (ctx) {
      // Scale drawing operations by device pixel ratio
      ctx.scale(dpr, dpr)
      
      // Apply better quality settings for improved rendering
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
    }

    // Set CSS dimensions to match viewport
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`

    // Reinitialize nodes and flowing points with proper dimensions
    initializeNodes(window.innerWidth, window.innerHeight)
    initializeFlowingPoints(window.innerWidth, window.innerHeight)
  }, [initializeNodes, initializeFlowingPoints])

  useEffect(() => {
    handleResize()
    
    const resizeObserver = new ResizeObserver(handleResize)
    if (canvasRef.current) {
      resizeObserver.observe(canvasRef.current)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      resizeObserver.disconnect()
    }
  }, [handleResize, animate])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full pointer-events-none"
      style={{ 
        filter: 'drop-shadow(0 0 30px rgba(0, 174, 239, 0.2))',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        backfaceVisibility: 'hidden', // Improve performance
        WebkitBackfaceVisibility: 'hidden',
        transform: 'translate3d(0, 0, 0)', // GPU acceleration
        WebkitTransform: 'translate3d(0, 0, 0)'
      }}
      aria-hidden="true"
    />
  )
}
