import { motion } from "framer-motion"
import { useEffect, useRef, useState, useMemo, useCallback } from "react"

export function CosmicBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isMobile, setIsMobile] = useState(false)
    const animationFrameRef = useRef<number>()

    // Memoize mobile detection
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile, { passive: true })

        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Memoize particle counts based on device
    const particleCounts = useMemo(() => ({
        stars: isMobile ? 0 : 150, // Reduced from 200
        dust: isMobile ? 0 : 30,   // Reduced from 50
        constellations: isMobile ? 0 : 8 // Reduced from 12
    }), [isMobile])

    useEffect(() => {
        // Skip canvas rendering on mobile - use CSS only
        if (isMobile) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d', { alpha: false })
        if (!ctx) return

        // Set canvas size
        const resizeCanvas = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2) // Limit DPR for performance
            canvas.width = window.innerWidth * dpr
            canvas.height = window.innerHeight * dpr
            canvas.style.width = `${window.innerWidth}px`
            canvas.style.height = `${window.innerHeight}px`
            ctx.scale(dpr, dpr)
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas, { passive: true })

        // Memoized particle generation
        const createParticles = () => {
            const stars = Array.from({ length: particleCounts.stars }, () => ({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.1,
                speedY: (Math.random() - 0.5) * 0.1,
                brightness: Math.random(),
                twinkleSpeed: Math.random() * 0.02 + 0.01
            }))

            const dustParticles = Array.from({ length: particleCounts.dust }, () => ({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 3 + 1,
                speedY: Math.random() * 0.5 + 0.2,
                opacity: Math.random() * 0.5 + 0.3
            }))

            const constellationPoints = Array.from({ length: particleCounts.constellations }, () => ({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
            }))

            return { stars, dustParticles, constellationPoints }
        }

        const { stars, dustParticles, constellationPoints } = createParticles()

        let time = 0
        let lastTime = performance.now()
        const targetFPS = 30 // Reduced from 60 for better performance
        const frameInterval = 1000 / targetFPS

        const animate = (currentTime: number) => {
            const deltaTime = currentTime - lastTime

            if (deltaTime < frameInterval) {
                animationFrameRef.current = requestAnimationFrame(animate)
                return
            }

            lastTime = currentTime - (deltaTime % frameInterval)
            time += 0.01

            // Create nebula gradient background
            const gradient = ctx.createRadialGradient(
                window.innerWidth / 2,
                window.innerHeight / 2,
                0,
                window.innerWidth / 2,
                window.innerHeight / 2,
                window.innerWidth
            )
            gradient.addColorStop(0, '#1a0a2e')
            gradient.addColorStop(0.3, '#16213e')
            gradient.addColorStop(0.6, '#0f3460')
            gradient.addColorStop(1, '#0a1929')
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

            // Draw nebula clouds (optimized)
            for (let i = 0; i < 3; i++) {
                const x = window.innerWidth * (0.3 + i * 0.2) + Math.sin(time + i) * 50
                const y = window.innerHeight * (0.3 + i * 0.2) + Math.cos(time + i) * 50
                const nebula = ctx.createRadialGradient(x, y, 0, x, y, 300)

                const colors = [
                    ['rgba(138, 43, 226, 0.15)', 'rgba(138, 43, 226, 0)'],
                    ['rgba(0, 191, 255, 0.12)', 'rgba(0, 191, 255, 0)'],
                    ['rgba(72, 61, 139, 0.1)', 'rgba(72, 61, 139, 0)']
                ]

                nebula.addColorStop(0, colors[i][0])
                nebula.addColorStop(1, colors[i][1])

                ctx.fillStyle = nebula
                ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
            }

            // Draw constellation lines
            ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)'
            ctx.lineWidth = 1
            ctx.beginPath()
            for (let i = 0; i < constellationPoints.length - 1; i++) {
                if (i % 3 !== 2) {
                    ctx.moveTo(constellationPoints[i].x, constellationPoints[i].y)
                    ctx.lineTo(constellationPoints[i + 1].x, constellationPoints[i + 1].y)
                }
            }
            ctx.stroke()

            // Draw constellation points
            constellationPoints.forEach(point => {
                const glow = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 8)
                glow.addColorStop(0, 'rgba(255, 215, 0, 0.8)')
                glow.addColorStop(0.5, 'rgba(255, 215, 0, 0.4)')
                glow.addColorStop(1, 'rgba(255, 215, 0, 0)')
                ctx.fillStyle = glow
                ctx.beginPath()
                ctx.arc(point.x, point.y, 8, 0, Math.PI * 2)
                ctx.fill()
            })

            // Update and draw stars (optimized)
            stars.forEach(star => {
                star.x += star.speedX
                star.y += star.speedY
                star.brightness += star.twinkleSpeed

                if (star.brightness > 1 || star.brightness < 0) {
                    star.twinkleSpeed *= -1
                }

                if (star.x < 0) star.x = window.innerWidth
                if (star.x > window.innerWidth) star.x = 0
                if (star.y < 0) star.y = window.innerHeight
                if (star.y > window.innerHeight) star.y = 0

                // Draw star with glow in one pass
                const starGlow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3)
                starGlow.addColorStop(0, `rgba(255, 255, 255, ${star.brightness})`)
                starGlow.addColorStop(0.3, `rgba(255, 255, 255, ${star.brightness * 0.5})`)
                starGlow.addColorStop(1, 'rgba(255, 255, 255, 0)')
                ctx.fillStyle = starGlow
                ctx.beginPath()
                ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2)
                ctx.fill()
            })

            // Update and draw golden dust particles
            dustParticles.forEach(particle => {
                particle.y -= particle.speedY

                if (particle.y < 0) {
                    particle.y = window.innerHeight
                    particle.x = Math.random() * window.innerWidth
                }

                const dustGlow = ctx.createRadialGradient(
                    particle.x,
                    particle.y,
                    0,
                    particle.x,
                    particle.y,
                    particle.size * 2
                )
                dustGlow.addColorStop(0, `rgba(255, 215, 0, ${particle.opacity})`)
                dustGlow.addColorStop(0.5, `rgba(255, 215, 0, ${particle.opacity * 0.5})`)
                dustGlow.addColorStop(1, 'rgba(255, 215, 0, 0)')

                ctx.fillStyle = dustGlow
                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
                ctx.fill()
            })

            animationFrameRef.current = requestAnimationFrame(animate)
        }

        animationFrameRef.current = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [isMobile, particleCounts])

    return (
        <>
            {/* Canvas for desktop - animated cosmic background */}
            {!isMobile && (
                <canvas
                    ref={canvasRef}
                    className="fixed inset-0 w-full h-full pointer-events-none"
                    style={{ zIndex: -1 }}
                />
            )}

            {/* CSS-only background for mobile */}
            {isMobile && (
                <div
                    className="fixed inset-0 w-full h-full pointer-events-none"
                    style={{
                        zIndex: -1,
                        background: 'radial-gradient(ellipse at center, #1a0a2e 0%, #16213e 30%, #0f3460 60%, #0a1929 100%)'
                    }}
                >
                    {/* Simple CSS stars for mobile */}
                    <div className="absolute inset-0 opacity-60">
                        {[...Array(30)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-white rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    opacity: [0.3, 1, 0.3],
                                    scale: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Overlay effects - simplified for mobile */}
            <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
                {/* Purple glow overlay */}
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 rounded-full blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, transparent 70%)'
                    }}
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                        duration: isMobile ? 12 : 18,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Royal blue glow */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 md:w-[600px] h-96 md:h-[600px] rounded-full blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, rgba(65, 105, 225, 0.12) 0%, transparent 70%)'
                    }}
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: isMobile ? 15 : 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>
        </>
    )
}
