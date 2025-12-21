import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { CosmicBackground } from "./cosmic-background"

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
                className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
            >
                {/* Cosmic Background */}
                <CosmicBackground />

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
                                    className="absolute inset-0 blur-3xl bg-gradient-to-r from-yellow-500 via-purple-500 to-blue-500 opacity-50"
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
                                        <span className="text-gradient-cosmic cosmic-glow">Dev</span>
                                    </h1>

                                    {/* Subtitle */}
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="text-center text-xl text-yellow-200 mt-2 cosmic-glow"
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
                        <div className="relative h-2 bg-purple-900/30 rounded-full overflow-hidden backdrop-blur-sm border border-purple-500/20">
                            {/* Animated background */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-purple-500/20"
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
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500 rounded-full"
                                style={{ width: `${progress}%` }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-purple-400 blur-sm opacity-50" />
                            </motion.div>
                        </div>

                        {/* Progress percentage */}
                        <motion.div
                            className="flex justify-between items-center mt-3 text-sm font-mono"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            <span className="text-purple-300">Loading...</span>
                            <span className="text-yellow-400 font-bold cosmic-glow">{progress}%</span>
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
                                className="w-2 h-2 bg-yellow-400 rounded-full"
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
                    className="absolute top-10 right-10 w-32 h-32 border-2 border-yellow-500/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute bottom-10 left-10 w-24 h-24 border-2 border-purple-500/20 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
            </motion.div>
        </AnimatePresence>
    )
}
