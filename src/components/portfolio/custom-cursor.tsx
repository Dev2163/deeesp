import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface ClickEffect {
    id: number
    x: number
    y: number
}

export function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false)
    const [clickEffects, setClickEffects] = useState<ClickEffect[]>([])
    const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([])

    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 700 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)

            // Add trail point
            setTrail((prev) => [
                ...prev.slice(-15), // Keep last 15 points
                { x: e.clientX, y: e.clientY, id: Date.now() }
            ])
        }

        const handleMouseDown = (e: MouseEvent) => {
            // Create thunder effect on click
            const newEffect: ClickEffect = {
                id: Date.now(),
                x: e.clientX,
                y: e.clientY
            }
            setClickEffects((prev) => [...prev, newEffect])

            // Remove effect after animation
            setTimeout(() => {
                setClickEffects((prev) => prev.filter((effect) => effect.id !== newEffect.id))
            }, 1000)
        }

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") ||
                target.closest("a")
            ) {
                setIsHovering(true)
            } else {
                setIsHovering(false)
            }
        }

        window.addEventListener("mousemove", moveCursor)
        window.addEventListener("mousedown", handleMouseDown)
        window.addEventListener("mouseover", handleMouseOver)

        return () => {
            window.removeEventListener("mousemove", moveCursor)
            window.removeEventListener("mousedown", handleMouseDown)
            window.removeEventListener("mouseover", handleMouseOver)
        }
    }, [cursorX, cursorY])

    return (
        <>
            {/* Hide default cursor */}
            <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

            {/* Trail dots */}
            {trail.map((point, index) => (
                <motion.div
                    key={point.id}
                    className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full bg-gradient-to-r from-neural-500 to-quantum-500"
                    style={{
                        x: point.x - 2,
                        y: point.y - 2,
                        width: 4,
                        height: 4,
                    }}
                    initial={{ opacity: 0.8, scale: 1 }}
                    animate={{
                        opacity: 0,
                        scale: 0,
                    }}
                    transition={{
                        duration: 0.6,
                        delay: index * 0.02,
                    }}
                />
            ))}

            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            >
                {/* Outer ring */}
                <motion.div
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-neural-500"
                    animate={{
                        width: isHovering ? 40 : 32,
                        height: isHovering ? 40 : 32,
                        borderColor: isHovering ? "rgb(168, 85, 247)" : "rgb(71, 133, 255)",
                    }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Pulsing effect */}
                    <motion.div
                        className="absolute inset-0 rounded-full bg-neural-500/20"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                    />
                </motion.div>

                {/* Inner dot */}
                <motion.div
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-neural-500 to-quantum-500"
                    animate={{
                        width: isHovering ? 8 : 6,
                        height: isHovering ? 8 : 6,
                    }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neural-400 to-quantum-400 blur-sm opacity-70" />
                </motion.div>
            </motion.div>

            {/* Thunder/Lightning click effects */}
            <AnimatePresence>
                {clickEffects.map((effect) => (
                    <div key={effect.id} className="fixed top-0 left-0 pointer-events-none z-[9997]">
                        {/* Lightning bolts */}
                        {[0, 1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                className="absolute"
                                style={{
                                    left: effect.x,
                                    top: effect.y,
                                }}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0, 1, 0],
                                    rotate: i * 90,
                                }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: i * 0.05,
                                }}
                            >
                                <svg width="100" height="100" viewBox="0 0 100 100" className="-translate-x-1/2 -translate-y-1/2">
                                    <motion.path
                                        d="M50 10 L55 45 L70 45 L45 90 L50 55 L30 55 Z"
                                        fill="url(#thunder-gradient)"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 0.3, delay: i * 0.05 }}
                                    />
                                    <defs>
                                        <linearGradient id="thunder-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="rgb(71, 133, 255)" stopOpacity="0.8" />
                                            <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0.8" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </motion.div>
                        ))}

                        {/* Expanding ring */}
                        <motion.div
                            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-neural-500"
                            style={{
                                left: effect.x,
                                top: effect.y,
                            }}
                            initial={{ width: 0, height: 0, opacity: 1 }}
                            animate={{
                                width: 100,
                                height: 100,
                                opacity: 0,
                            }}
                            transition={{ duration: 0.6 }}
                        />

                        {/* Particles burst */}
                        {Array.from({ length: 12 }).map((_, i) => {
                            const angle = (i * 360) / 12
                            const distance = 50
                            return (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-neural-500 to-quantum-500"
                                    style={{
                                        left: effect.x,
                                        top: effect.y,
                                    }}
                                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                                    animate={{
                                        x: Math.cos((angle * Math.PI) / 180) * distance,
                                        y: Math.sin((angle * Math.PI) / 180) * distance,
                                        opacity: 0,
                                        scale: 0,
                                    }}
                                    transition={{ duration: 0.6 }}
                                />
                            )
                        })}

                        {/* Flash effect */}
                        <motion.div
                            className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-neural-500/30 to-quantum-500/30 blur-xl"
                            style={{
                                left: effect.x - 64,
                                top: effect.y - 64,
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                ))}
            </AnimatePresence>
        </>
    )
}
