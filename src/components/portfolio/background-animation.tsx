import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Particle {
    id: number
    x: number
    y: number
    size: number
    duration: number
    delay: number
}

export function BackgroundAnimation() {
    const [particles, setParticles] = useState<Particle[]>([])

    useEffect(() => {
        // Generate random particles
        const newParticles: Particle[] = Array.from({ length: 80 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 1,
            duration: Math.random() * 20 + 15,
            delay: Math.random() * 5,
        }))
        setParticles(newParticles)
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Floating particles */}
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                        background: `radial-gradient(circle, ${particle.id % 3 === 0
                            ? "rgba(71, 133, 255, 0.6)"
                            : particle.id % 3 === 1
                                ? "rgba(168, 85, 247, 0.6)"
                                : "rgba(16, 185, 129, 0.6)"
                            }, transparent)`,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, Math.random() * 50 - 25, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Animated gradient orbs */}
            <motion.div
                className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
                style={{
                    background: "radial-gradient(circle, rgba(71, 133, 255, 0.4), transparent)",
                    top: "10%",
                    left: "10%",
                }}
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
                style={{
                    background: "radial-gradient(circle, rgba(168, 85, 247, 0.4), transparent)",
                    top: "60%",
                    right: "10%",
                }}
                animate={{
                    scale: [1.2, 1, 1.2],
                    x: [0, -80, 0],
                    y: [0, -60, 0],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute w-96 h-96 rounded-full blur-3xl opacity-15"
                style={{
                    background: "radial-gradient(circle, rgba(16, 185, 129, 0.3), transparent)",
                    bottom: "20%",
                    left: "50%",
                }}
                animate={{
                    scale: [1, 1.4, 1],
                    x: [0, -50, 0],
                    y: [0, 40, 0],
                }}
                transition={{
                    duration: 28,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Animated lines/connections */}
            <svg className="absolute inset-0 w-full h-full opacity-5">
                <defs>
                    <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgb(71, 133, 255)" stopOpacity="0.6" />
                        <stop offset="50%" stopColor="rgb(168, 85, 247)" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0.6" />
                    </linearGradient>
                </defs>

                {/* Animated grid lines */}
                {Array.from({ length: 8 }).map((_, i) => (
                    <motion.line
                        key={`v-${i}`}
                        x1={`${(i * 100) / 7}%`}
                        y1="0%"
                        x2={`${(i * 100) / 7}%`}
                        y2="100%"
                        stroke="url(#line-gradient)"
                        strokeWidth="0.5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: [0, 1, 0],
                            opacity: [0, 0.3, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeInOut",
                        }}
                    />
                ))}

                {Array.from({ length: 6 }).map((_, i) => (
                    <motion.line
                        key={`h-${i}`}
                        x1="0%"
                        y1={`${(i * 100) / 5}%`}
                        x2="100%"
                        y2={`${(i * 100) / 5}%`}
                        stroke="url(#line-gradient)"
                        strokeWidth="0.5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: [0, 1, 0],
                            opacity: [0, 0.3, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            delay: i * 0.5 + 0.25,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </svg>

            {/* Lightning bolts that appear randomly */}
            {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                    key={`lightning-${i}`}
                    className="absolute"
                    style={{
                        left: `${20 + i * 20}%`,
                        top: `${10 + i * 15}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 0.4, 0],
                        scale: [0, 1, 0],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 3,
                        repeatDelay: 8,
                    }}
                >
                    <svg width="60" height="60" viewBox="0 0 100 100">
                        <path
                            d="M50 10 L55 45 L70 45 L45 90 L50 55 L30 55 Z"
                            fill="url(#thunder-bg-gradient)"
                        />
                        <defs>
                            <linearGradient id="thunder-bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="rgb(71, 133, 255)" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0.3" />
                            </linearGradient>
                        </defs>
                    </svg>
                </motion.div>
            ))}

            {/* Rotating circles */}
            {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                    key={`circle-${i}`}
                    className="absolute border border-neural-500/10 rounded-full"
                    style={{
                        width: 100 + i * 50,
                        height: 100 + i * 50,
                        left: `${30 + i * 10}%`,
                        top: `${20 + i * 12}%`,
                    }}
                    animate={{
                        rotate: i % 2 === 0 ? 360 : -360,
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        rotate: {
                            duration: 20 + i * 5,
                            repeat: Infinity,
                            ease: "linear",
                        },
                        scale: {
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        },
                    }}
                />
            ))}

            {/* Glowing dots that pulse */}
            {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                    key={`dot-${i}`}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        background: i % 2 === 0 ? "rgb(71, 133, 255)" : "rgb(168, 85, 247)",
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 2, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                    }}
                />
            ))}

            {/* Wave effect */}
            <svg className="absolute bottom-0 left-0 w-full h-32 opacity-10">
                <motion.path
                    d="M0,50 Q250,0 500,50 T1000,50 T1500,50 T2000,50 V100 H0 Z"
                    fill="url(#wave-gradient)"
                    animate={{
                        d: [
                            "M0,50 Q250,0 500,50 T1000,50 T1500,50 T2000,50 V100 H0 Z",
                            "M0,50 Q250,100 500,50 T1000,50 T1500,50 T2000,50 V100 H0 Z",
                            "M0,50 Q250,0 500,50 T1000,50 T1500,50 T2000,50 V100 H0 Z",
                        ],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <defs>
                    <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgb(71, 133, 255)" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="rgb(168, 85, 247)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0.3" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    )
}
