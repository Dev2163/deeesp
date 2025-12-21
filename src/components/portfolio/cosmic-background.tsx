import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

export function CosmicBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Detect mobile device
        const isMobile = window.innerWidth < 768

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        // Star particles - Reduced for mobile
        const starCount = isMobile ? 50 : 200
        const stars: Array<{
            x: number
            y: number
            size: number
            speedX: number
            speedY: number
            brightness: number
            twinkleSpeed: number
        }> = []

        // Create stars
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.1,
                speedY: (Math.random() - 0.5) * 0.1,
                brightness: Math.random(),
                twinkleSpeed: Math.random() * 0.02 + 0.01
            })
        }

        // Golden dust particles - Reduced for mobile
        const dustCount = isMobile ? 15 : 50
        const dustParticles: Array<{
            x: number
            y: number
            size: number
            speedY: number
            opacity: number
        }> = []

        for (let i = 0; i < dustCount; i++) {
            dustParticles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedY: Math.random() * 0.5 + 0.2,
                opacity: Math.random() * 0.5 + 0.3
            })
        }

        // Constellation points
        const constellationPoints: Array<{ x: number; y: number }> = []
        for (let i = 0; i < 12; i++) {
            constellationPoints.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height
            })
        }

        let animationFrame: number
        let time = 0

        const animate = () => {
            time += 0.01

            // Create nebula gradient background
            const gradient = ctx.createRadialGradient(
                canvas.width / 2,
                canvas.height / 2,
                0,
                canvas.width / 2,
                canvas.height / 2,
                canvas.width
            )
            gradient.addColorStop(0, '#1a0a2e')
            gradient.addColorStop(0.3, '#16213e')
            gradient.addColorStop(0.6, '#0f3460')
            gradient.addColorStop(1, '#0a1929')
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Draw nebula clouds - Reduced for mobile
            const nebulaCount = isMobile ? 2 : 3
            for (let i = 0; i < nebulaCount; i++) {
                const x = canvas.width * (0.3 + i * 0.2) + Math.sin(time + i) * 50
                const y = canvas.height * (0.3 + i * 0.2) + Math.cos(time + i) * 50
                const nebulaSize = isMobile ? 200 : 300
                const nebula = ctx.createRadialGradient(x, y, 0, x, y, nebulaSize)

                if (i === 0) {
                    nebula.addColorStop(0, 'rgba(138, 43, 226, 0.15)')
                    nebula.addColorStop(1, 'rgba(138, 43, 226, 0)')
                } else if (i === 1) {
                    nebula.addColorStop(0, 'rgba(0, 191, 255, 0.12)')
                    nebula.addColorStop(1, 'rgba(0, 191, 255, 0)')
                } else {
                    nebula.addColorStop(0, 'rgba(72, 61, 139, 0.1)')
                    nebula.addColorStop(1, 'rgba(72, 61, 139, 0)')
                }

                ctx.fillStyle = nebula
                ctx.fillRect(0, 0, canvas.width, canvas.height)
            }

            // Draw constellation lines
            ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)'
            ctx.lineWidth = 1
            for (let i = 0; i < constellationPoints.length - 1; i++) {
                if (i % 3 !== 2) {
                    ctx.beginPath()
                    ctx.moveTo(constellationPoints[i].x, constellationPoints[i].y)
                    ctx.lineTo(constellationPoints[i + 1].x, constellationPoints[i + 1].y)
                    ctx.stroke()
                }
            }

            // Draw constellation points (bright stars)
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

            // Update and draw stars
            stars.forEach(star => {
                star.x += star.speedX
                star.y += star.speedY
                star.brightness += star.twinkleSpeed

                if (star.brightness > 1 || star.brightness < 0) {
                    star.twinkleSpeed *= -1
                }

                if (star.x < 0) star.x = canvas.width
                if (star.x > canvas.width) star.x = 0
                if (star.y < 0) star.y = canvas.height
                if (star.y > canvas.height) star.y = 0

                ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`
                ctx.beginPath()
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
                ctx.fill()

                // Add star glow - Skip on mobile for performance
                if (!isMobile) {
                    const starGlow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3)
                    starGlow.addColorStop(0, `rgba(255, 255, 255, ${star.brightness * 0.5})`)
                    starGlow.addColorStop(1, 'rgba(255, 255, 255, 0)')
                    ctx.fillStyle = starGlow
                    ctx.beginPath()
                    ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2)
                    ctx.fill()
                }
            })

            // Update and draw golden dust particles
            dustParticles.forEach(particle => {
                particle.y -= particle.speedY

                if (particle.y < 0) {
                    particle.y = canvas.height
                    particle.x = Math.random() * canvas.width
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

            animationFrame = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            cancelAnimationFrame(animationFrame)
        }
    }, [])

    return (
        <>
            {/* Canvas for animated cosmic background */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 w-full h-full"
                style={{ zIndex: 0 }}
            />

            {/* Additional overlay effects */}
            <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
                {/* Teal glow overlay */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, rgba(0, 206, 209, 0.15) 0%, transparent 70%)'
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                        x: [0, 50, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Purple glow overlay */}
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, transparent 70%)'
                    }}
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.4, 0.6, 0.4],
                        x: [0, -50, 0],
                        y: [0, 30, 0]
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Royal blue glow */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, rgba(65, 105, 225, 0.12) 0%, transparent 70%)'
                    }}
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.3, 0.5, 0.3],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>
        </>
    )
}
