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
                className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#090a0f]"
            >
                {/* Modern subtle ambient glow (Black & White with a touch of Blue) */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />

                {/* Main content */}
                <div className="relative z-10 flex flex-col items-center gap-8">
                    {/* Logo/Name */}
                    <AnimatePresence>
                        {showLogo && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 150,
                                    damping: 25,
                                    duration: 0.8
                                }}
                                className="relative text-center"
                            >
                                {/* Glowing backdrop indicator */}
                                <motion.div
                                    className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-500 to-white opacity-20"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.15, 0.3, 0.15],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                    }}
                                />

                                {/* Logo text */}
                                <div className="relative">
                                    <h1 className="font-display text-8xl md:text-9xl font-bold tracking-tight text-white">
                                        Dev
                                    </h1>

                                    {/* Subtitle */}
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="text-center text-lg font-medium tracking-widest text-slate-400 uppercase mt-3"
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
                        className="w-64 md:w-96 mt-4"
                    >
                        {/* Progress bar container */}
                        <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                            {/* Animated background shine */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-white/5 to-blue-500/5"
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
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-white via-indigo-200 to-blue-500 rounded-full"
                                style={{ width: `${progress}%` }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-white blur-sm opacity-30" />
                            </motion.div>
                        </div>

                        {/* Progress percentage */}
                        <motion.div
                            className="flex justify-between items-center mt-3 text-xs font-mono"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            <span className="text-slate-400">Initializing...</span>
                            <span className="text-white font-bold">{progress}%</span>
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
                                className="w-1.5 h-1.5 bg-white rounded-full"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.3, 0.9, 0.3],
                                }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Corner decorations */}
                <motion.div
                    className="absolute top-10 right-10 w-32 h-32 border border-white/5 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute bottom-10 left-10 w-24 h-24 border border-white/5 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
            </motion.div>
        </AnimatePresence>
    )
}
