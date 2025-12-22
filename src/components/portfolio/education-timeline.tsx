import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

export function EducationTimeline() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
    const [activeStep, setActiveStep] = useState(0)

    const educationSteps = [
        {
            id: 1,
            degree: "Bachelor of Science in IT",
            shortName: "B.Sc. IT",
            period: "2021 – 2024",
            institution: "University",
            cgpa: "7.43",
            description: "Gained a solid foundation in programming, databases, and web tech.",
            icon: "📚",
            color: "from-green-500 to-teal-500"
        },
        {
            id: 2,
            degree: "Master of Computer Applications",
            shortName: "MCA",
            period: "2024 – Present",
            institution: "University",
            cgpa: "7.08",
            description: "Strengthening my technical depth and exploring advanced systems.",
            icon: "🎓",
            color: "from-teal-500 to-cyan-500"
        }
    ]

    return (
        <section
            ref={sectionRef}
            id="education"
            className="relative py-32 overflow-hidden"
        >
            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                        transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
                        className="inline-block mb-4"
                    >
                        <span className="text-6xl">🎓</span>
                    </motion.div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 px-4">
                        <span className="text-gradient-cosmic cosmic-glow">
                            My Journey
                        </span>
                    </h2>
                    <p className="text-lg sm:text-xl text-purple-300 max-w-3xl mx-auto px-4">
                        Follow the golden celestial path through my educational milestones
                    </p>
                </motion.div>

                {/* Celestial Road Container */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Golden Constellation Path - SVG (Hidden on mobile for performance) */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
                        style={{ zIndex: 0 }}
                    >
                        <defs>
                            <linearGradient id="golden-path" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ffd700" stopOpacity="0.8" />
                                <stop offset="50%" stopColor="#ffed4e" stopOpacity="1" />
                                <stop offset="100%" stopColor="#ffd700" stopOpacity="0.8" />
                            </linearGradient>

                            <filter id="glow">
                                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Animated Path */}
                        <motion.path
                            d="M 100 400 Q 250 300, 400 200 T 700 100"
                            stroke="url(#golden-path)"
                            strokeWidth="3"
                            fill="none"
                            filter="url(#glow)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />

                        {/* Constellation Stars along path */}
                        {[
                            { x: 100, y: 400 },
                            { x: 250, y: 300 },
                            { x: 400, y: 200 },
                            { x: 550, y: 150 },
                            { x: 700, y: 100 }
                        ].map((point, i) => (
                            <motion.circle
                                key={i}
                                cx={point.x}
                                cy={point.y}
                                r="4"
                                fill="#ffd700"
                                filter="url(#glow)"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={isInView ? {
                                    scale: [0, 1.5, 1],
                                    opacity: [0, 1, 0.8]
                                } : { scale: 0, opacity: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: i * 0.3,
                                    repeat: Infinity,
                                    repeatDelay: 2
                                }}
                            />
                        ))}
                    </svg>

                    {/* Education Cards */}
                    <div className="relative space-y-16 md:space-y-32 pt-10 md:pt-20">
                        {educationSteps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, y: 50 }}
                                animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: index % 2 === 0 ? -100 : 100, y: 50 }}
                                transition={{ duration: 0.8, delay: index * 0.4 }}
                                onMouseEnter={() => setActiveStep(index)}
                                className={`relative ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'} max-w-2xl`}
                            >
                                {/* Glowing Holographic Card */}
                                <motion.div
                                    className="relative group"
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {/* Card Background with Glass Effect */}
                                    <div className="relative rounded-3xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-green-900/30 via-teal-900/20 to-cyan-900/30 border border-green-500/30 shadow-2xl">
                                        {/* Animated Glow Border - Desktop only */}
                                        <motion.div
                                            className="absolute inset-0 rounded-3xl hidden md:block"
                                            style={{
                                                background: `linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(0, 255, 127, 0.2), rgba(0, 206, 209, 0.3))`,
                                                filter: 'blur(20px)',
                                                opacity: activeStep === index ? 0.6 : 0.3
                                            }}
                                            animate={{
                                                opacity: activeStep === index ? [0.3, 0.6, 0.3] : 0.3,
                                                scale: activeStep === index ? [1, 1.05, 1] : 1
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />

                                        {/* Card Content */}
                                        <div className="relative p-8 z-10">
                                            {/* Icon and Period */}
                                            <div className="flex items-start justify-between mb-4">
                                                <motion.div
                                                    className="text-5xl"
                                                    animate={{ rotate: activeStep === index ? [0, 10, -10, 0] : 0 }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    {step.icon}
                                                </motion.div>

                                                {/* CGPA Badge */}
                                                <motion.div
                                                    className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-green-500/20 border border-yellow-500/40 backdrop-blur-sm"
                                                    whileHover={{ scale: 1.1 }}
                                                >
                                                    <span className="text-yellow-300 font-bold text-sm">
                                                        CGPA: {step.cgpa}
                                                    </span>
                                                </motion.div>
                                            </div>

                                            {/* Degree Title */}
                                            <motion.h3
                                                className="text-2xl md:text-3xl font-bold mb-2 text-gradient-golden cosmic-glow"
                                                animate={{
                                                    textShadow: activeStep === index
                                                        ? ['0 0 20px rgba(255, 215, 0, 0.5)', '0 0 40px rgba(255, 215, 0, 0.8)', '0 0 20px rgba(255, 215, 0, 0.5)']
                                                        : '0 0 20px rgba(255, 215, 0, 0.5)'
                                                }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            >
                                                {step.degree}
                                            </motion.h3>

                                            {/* Short Name */}
                                            <p className="text-lg text-green-300 font-semibold mb-3">
                                                ({step.shortName})
                                            </p>

                                            {/* Period */}
                                            <motion.p
                                                className="text-yellow-200 font-medium mb-4 flex items-center gap-2"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.5 + index * 0.4 }}
                                            >
                                                <span className="text-xl">📅</span>
                                                {step.period}
                                            </motion.p>

                                            {/* Description */}
                                            <p className="text-purple-200/90 leading-relaxed">
                                                {step.description}
                                            </p>

                                            {/* Decorative Stars */}
                                            <div className="absolute top-4 right-4 flex gap-1">
                                                {[...Array(3)].map((_, i) => (
                                                    <motion.span
                                                        key={i}
                                                        className="text-yellow-400 text-xs"
                                                        animate={{
                                                            opacity: [0.3, 1, 0.3],
                                                            scale: [0.8, 1.2, 0.8]
                                                        }}
                                                        transition={{
                                                            duration: 2,
                                                            delay: i * 0.3,
                                                            repeat: Infinity
                                                        }}
                                                    >
                                                        ✨
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Holographic Shine Effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                            animate={{
                                                x: ['-100%', '100%']
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                repeatDelay: 2
                                            }}
                                            style={{ transform: 'skewX(-20deg)' }}
                                        />
                                    </div>

                                    {/* Floating Particles around card */}
                                    {activeStep === index && (
                                        <>
                                            {[...Array(6)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                                                    style={{
                                                        top: `${Math.random() * 100}%`,
                                                        left: `${Math.random() * 100}%`,
                                                    }}
                                                    animate={{
                                                        y: [-20, -40, -20],
                                                        opacity: [0, 1, 0],
                                                        scale: [0, 1.5, 0]
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        delay: i * 0.2,
                                                        repeat: Infinity
                                                    }}
                                                />
                                            ))}
                                        </>
                                    )}
                                </motion.div>

                                {/* Connection Line to Path */}
                                <motion.div
                                    className="absolute top-1/2 w-20 h-0.5 bg-gradient-to-r from-yellow-500 to-transparent"
                                    style={{
                                        [index % 2 === 0 ? 'right' : 'left']: '-80px',
                                        filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))'
                                    }}
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                                    transition={{ duration: 0.6, delay: 0.8 + index * 0.4 }}
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* Final Burst of Light */}
                    <motion.div
                        className="relative mt-32 text-center"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{ duration: 1, delay: 2.5 }}
                    >
                        {/* Golden Burst Effect */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <div className="w-64 h-64 rounded-full bg-gradient-radial from-yellow-500/30 via-yellow-500/10 to-transparent blur-2xl" />
                        </motion.div>

                        {/* Converging Light Rays */}
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute top-1/2 left-1/2 w-1 h-32 bg-gradient-to-t from-yellow-500/50 to-transparent origin-bottom"
                                style={{
                                    transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                                }}
                                animate={{
                                    opacity: [0, 0.8, 0],
                                    scaleY: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    delay: 2.5 + i * 0.1,
                                    repeat: Infinity,
                                    repeatDelay: 3
                                }}
                            />
                        ))}

                        {/* Final Text */}
                        <motion.div
                            className="relative z-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 1, delay: 3 }}
                        >
                            <motion.p
                                className="text-4xl md:text-5xl font-bold text-gradient-golden cosmic-glow"
                                animate={{
                                    textShadow: [
                                        '0 0 20px rgba(255, 215, 0, 0.5)',
                                        '0 0 40px rgba(255, 215, 0, 0.8)',
                                        '0 0 60px rgba(255, 215, 0, 1)',
                                        '0 0 40px rgba(255, 215, 0, 0.8)',
                                        '0 0 20px rgba(255, 215, 0, 0.5)'
                                    ]
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                Continuing the Journey
                            </motion.p>
                            <motion.p
                                className="text-xl text-purple-300 mt-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 3.5 }}
                            >
                                Building the future, one line of code at a time ✨
                            </motion.p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
