import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface SplashScreenProps {
    onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
    const [progress, setProgress] = useState(0)
    const [showLogo, setShowLogo] = useState(false)

    useEffect(() => {
        // Show logo after brief delay
        setTimeout(() => setShowLogo(true), 300)

        // Animate progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setTimeout(onComplete, 500)
                    return 100
                }
                return prev + 2
            })
        }, 30)

        return () => clearInterval(interval)
    }, [onComplete])

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-void-950 overflow-hidden"
            >
                {/* Animated background particles */}
                <div className="absolute inset-0">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-neural-500 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1.5, 0],
                            }}
                            transition={{
                                duration: 2 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>

                {/* Neural network background */}
                <svg className="absolute inset-0 w-full h-full opacity-10">
                    <defs>
                        <linearGradient id="splash-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgb(71, 133, 255)" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0.5" />
                        </linearGradient>
                    </defs>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <motion.circle
                            key={i}
                            cx={`${(i % 4) * 33.33}%`}
                            cy={`${Math.floor(i / 4) * 50}%`}
                            r="3"
                            fill="url(#splash-gradient)"
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1, 0.8, 1] }}
                            transition={{
                                duration: 2,
                                delay: i * 0.1,
                                repeat: Infinity,
                                repeatDelay: 2,
                            }}
                        />
                    ))}
                </svg>

                {/* Main content */}
                <div className="relative z-10 flex flex-col items-center gap-8">
                    {/* Logo/Name */}
                    <AnimatePresence>
                        {showLogo && (
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 20,
                                    duration: 0.8
                                }}
                                className="relative"
                            >
                                {/* Glowing background */}
                                <motion.div
                                    className="absolute inset-0 blur-3xl bg-gradient-to-r from-neural-500 to-quantum-500 opacity-50"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.5, 0.8, 0.5],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}
                                />

                                {/* Logo text */}
                                <div className="relative">
                                    <h1 className="font-display text-8xl md:text-9xl font-bold">
                                        <span className="text-gradient-neural">Dev</span>
                                    </h1>

                                    {/* Subtitle */}
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="text-center text-xl text-muted-foreground mt-2"
                                    >
                                        Portfolio
                                    </motion.p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Loading bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="w-64 md:w-96"
                    >
                        {/* Progress bar container */}
                        <div className="relative h-2 bg-void-800 rounded-full overflow-hidden">
                            {/* Animated background */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-neural-500/20 to-quantum-500/20"
                                animate={{
                                    x: ['-100%', '100%'],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />

                            {/* Progress fill */}
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-neural-600 to-quantum-600 rounded-full"
                                style={{ width: `${progress}%` }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-neural-400 to-quantum-400 blur-sm opacity-50" />
                            </motion.div>
                        </div>

                        {/* Progress percentage */}
                        <motion.div
                            className="flex justify-between items-center mt-3 text-sm font-mono"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            <span className="text-muted-foreground">Loading...</span>
                            <span className="text-neural-400 font-bold">{progress}%</span>
                        </motion.div>
                    </motion.div>

                    {/* Loading dots */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="flex gap-2"
                    >
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 bg-neural-500 rounded-full"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Corner decorations */}
                <motion.div
                    className="absolute top-10 right-10 w-32 h-32 border-2 border-neural-500/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute bottom-10 left-10 w-24 h-24 border-2 border-quantum-500/20 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
            </motion.div>
        </AnimatePresence>
    )
}
