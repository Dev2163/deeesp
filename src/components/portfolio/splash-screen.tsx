import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface SplashScreenProps {
    onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
    const [progress, setProgress] = useState(0)
    const [showContent, setShowContent] = useState(false)

    useEffect(() => {
        setTimeout(() => setShowContent(true), 100)

        const duration = 2000; // 2 seconds total loading
        const intervalTime = 20;
        const steps = duration / intervalTime;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            const newProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
            setProgress(newProgress);

            if (newProgress >= 100) {
                clearInterval(interval)
                setTimeout(onComplete, 600) // Brief pause at 100%
            }
        }, intervalTime)

        return () => clearInterval(interval)
    }, [onComplete])

    // Animated text array
    const title = "DEV SUTHAR".split("");

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-black text-slate-900 dark:text-white"
            >
                {/* Background Ambient Effects */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-200/50 via-transparent to-transparent dark:from-[#ffb703]/10 dark:via-transparent dark:to-transparent pointer-events-none" />
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

                {/* Main Content */}
                <div className="relative z-10 flex flex-col items-center">
                    <AnimatePresence>
                        {showContent && (
                            <>
                                {/* Animated Geometric Logo Mark */}
                                <motion.div
                                    initial={{ scale: 0, rotate: -180, opacity: 0 }}
                                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 100, damping: 20, duration: 1 }}
                                    className="mb-8 relative flex items-center justify-center w-24 h-24"
                                >
                                    <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-[#ffb703]/50 animate-[spin_10s_linear_infinite]" />
                                    <div className="absolute inset-2 rounded-full border-2 border-solid border-[#fb8500]/50 animate-[spin_5s_linear_infinite_reverse]" />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#fb8500] to-[#ffb703] blur-2xl opacity-20" />
                                    <span className="font-display text-4xl font-black bg-gradient-to-br from-[#fb8500] to-[#ffb703] bg-clip-text text-transparent">
                                        D
                                    </span>
                                </motion.div>

                                {/* Staggered Text Reveal */}
                                <div className="flex overflow-hidden mb-3">
                                    {title.map((char, index) => (
                                        <motion.span
                                            key={index}
                                            initial={{ y: 100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{
                                                duration: 0.8,
                                                ease: [0.22, 1, 0.36, 1],
                                                delay: index * 0.05 + 0.2
                                            }}
                                            className={`font-display text-4xl md:text-6xl font-black tracking-tight ${char === ' ' ? 'w-4 md:w-6' : ''}`}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </div>

                                {/* Subtitle */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.8 }}
                                    className="flex items-center gap-4 text-xs md:text-sm font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase"
                                >
                                    <span>Creative</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffb703] animate-pulse" />
                                    <span>Developer</span>
                                </motion.div>

                                {/* Modern Minimal Loading Bar */}
                                <motion.div 
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: 250 }}
                                    transition={{ duration: 0.8, delay: 1 }}
                                    className="mt-12 h-[2px] md:h-[3px] bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden relative"
                                >
                                    <motion.div 
                                        className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#fb8500] to-[#ffb703] shadow-[0_0_10px_#ffb703]"
                                        style={{ width: `${progress}%` }}
                                        layout
                                    />
                                </motion.div>
                                
                                {/* Percentage Text */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 1.2 }}
                                    className="mt-6 font-mono text-xs text-slate-400 dark:text-slate-500 flex items-center gap-3"
                                >
                                    <span className="tracking-[0.2em]">INITIALIZING</span>
                                    <span className="text-[#ffb703] font-bold w-8 text-right">{progress}%</span>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
