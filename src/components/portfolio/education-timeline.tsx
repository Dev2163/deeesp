import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { GraduationCap, BookOpen, Calendar, Sparkles } from "lucide-react"

export function EducationTimeline() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
    const [activeStep, setActiveStep] = useState(0)

    const educationSteps = [
        {
            id: 1,
            degree: "Bachelor of Science in IT",
            shortName: "B.Sc. IT",
            period: "2021 – 2024",
            institution: "University of Gujarat",
            cgpa: "7.43",
            description: "Gained a solid foundation in software development, data structures, and modern web applications.",
            icon: <BookOpen className="w-8 h-8 text-blue-400" />,
            color: "from-blue-600 to-blue-400",
            current: false
        },
        {
            id: 2,
            degree: "Master of Computer Applications",
            shortName: "MCA",
            period: "2024 – Present",
            institution: "University of Gujarat",
            cgpa: "7.08",
            description: "Strengthening technical depth and specializing in mobile application engineering and advanced server architectures.",
            icon: <GraduationCap className="w-8 h-8 text-blue-400" />,
            color: "from-blue-500 to-blue-300",
            current: true
        }
    ]

    return (
        <section
            ref={sectionRef}
            id="education"
            className="relative py-32 overflow-hidden noise-overlay"
        >
            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-24 flex flex-col items-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
                        className="inline-block mb-4"
                    >
                        <GraduationCap className="w-16 h-16 text-blue-400" />
                    </motion.div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 px-4">
                        <span className="text-gradient-cosmic cosmic-glow">
                            My Journey
                        </span>
                    </h2>
                    <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto px-4">
                        A detailed timeline of my academic milestones and technological progression
                    </p>
                </motion.div>

                {/* Symmetrical Timeline Road Container */}
                <div className="relative max-w-6xl mx-auto">
                    {/* Symmetrical Central Laser Axis (Hidden on Mobile) */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 bg-gradient-to-b from-blue-600/10 via-blue-400 to-blue-600/10 shadow-[0_0_10px_rgba(59,130,246,0.3)] z-0" />

                    {/* Simple vertical timeline line for mobile */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/20 via-blue-400/10 to-blue-500/20 block md:hidden" />

                    {/* Education Steps */}
                    <div className="relative space-y-16 md:space-y-36 pt-4">
                        {educationSteps.map((step, index) => (
                          <div 
                            key={step.id}
                            className="relative w-full flex flex-col md:flex-row items-center"
                          >
                            {/* Desktop Symmetrical Node & Year Capsule */}
                            <div className="absolute left-4 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center">
                              <motion.div
                                className={`w-14 h-14 rounded-2xl bg-slate-950 border-2 ${activeStep === index ? 'border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.6)]' : 'border-white/10'} flex items-center justify-center transition-all duration-300`}
                                animate={{
                                    scale: activeStep === index ? 1.15 : 1,
                                    rotate: activeStep === index ? [0, 5, -5, 0] : 0
                                }}
                                transition={{ duration: 0.5 }}
                              >
                                {step.icon}
                              </motion.div>
                              {/* Year badge */}
                              <div className="mt-3 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 backdrop-blur-md text-[10px] font-bold text-blue-300 uppercase tracking-widest whitespace-nowrap shadow-md">
                                  {step.period}
                              </div>
                            </div>

                            {/* timeline card item */}
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
                                onMouseEnter={() => setActiveStep(index)}
                                className={`relative w-full md:w-[calc(50%-48px)] pl-10 md:pl-0 ${index % 2 === 0 ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'}`}
                            >
                                {/* Glowing Holographic Card */}
                                <motion.div
                                    className="relative group"
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {/* Card Background with Glass Effect */}
                                    <div className="relative rounded-3xl overflow-hidden glass-strong border border-white/5 shadow-void transition-shadow duration-300">
                                        {/* Animated Glow Border */}
                                        <motion.div
                                            className="absolute inset-0 rounded-3xl pointer-events-none"
                                            style={{
                                                background: `linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(96, 165, 250, 0.08))`,
                                                filter: 'blur(20px)',
                                                opacity: activeStep === index ? 0.2 : 0.05
                                            }}
                                            animate={{
                                                opacity: activeStep === index ? [0.1, 0.25, 0.1] : 0.05,
                                                scale: activeStep === index ? [1, 1.02, 1] : 1
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />

                                        {/* Card Content */}
                                        <div className="relative p-6 md:p-8 z-10 flex flex-col">
                                            {/* Current Status Flashing Beacon */}
                                            {step.current && (
                                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-4 w-fit">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                                                    Current Milestone
                                                </div>
                                            )}

                                            {/* Icon and CGPA for Mobile */}
                                            <div className="flex items-start justify-between mb-4">
                                                <motion.div
                                                    className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-900/20 border border-blue-500/20"
                                                    animate={{ scale: activeStep === index ? 1.05 : 1 }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    {step.icon}
                                                </motion.div>

                                                {/* CGPA Badge */}
                                                <motion.div
                                                    className="px-4 py-2 rounded-full bg-blue-900/20 border border-blue-500/20 backdrop-blur-sm shadow-sm"
                                                    whileHover={{ scale: 1.1 }}
                                                >
                                                    <span className="text-blue-400 font-bold text-sm">
                                                        CGPA: {step.cgpa}
                                                    </span>
                                                </motion.div>
                                            </div>

                                            {/* Degree Title */}
                                            <h3 className="text-2xl md:text-3xl font-display font-bold mb-2 text-gradient-cosmic">
                                                {step.degree}
                                            </h3>

                                            {/* Short Name */}
                                            <p className="text-lg text-blue-400 font-semibold mb-3">
                                                ({step.shortName})
                                            </p>

                                            {/* Period (Shown inside card for mobile readability) */}
                                            <motion.p
                                                className="text-slate-400 font-medium mb-4 flex items-center gap-2 md:hidden"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                            >
                                                <Calendar className="w-5 h-5 text-slate-400" />
                                                {step.period}
                                            </motion.p>

                                            {/* Description */}
                                            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                                                {step.description}
                                            </p>

                                            {/* Decorative Stars */}
                                            <div className="absolute top-4 right-4 flex gap-1">
                                                {[...Array(3)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
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
                                                        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Holographic Shine Effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent pointer-events-none"
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
                                                    className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full"
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

                                {/* Connection Line to Center Axis (Hidden on Mobile) */}
                                <motion.div
                                    className={`absolute top-1/2 w-12 h-0.5 bg-gradient-to-r ${index % 2 === 0 ? 'from-blue-400 to-transparent' : 'from-transparent to-blue-400'} hidden md:block`}
                                    style={{
                                        [index % 2 === 0 ? 'right' : 'left']: '-48px',
                                        transformOrigin: index % 2 === 0 ? 'left' : 'right'
                                    }}
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                                    transition={{ duration: 0.6, delay: 0.8 + index * 0.4 }}
                                />
                            </motion.div>
                          </div>
                        ))}
                    </div>

                    {/* Final Burst of Light */}
                    <motion.div
                        className="relative mt-24 md:mt-36 text-center pl-10 md:pl-0"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                    >
                        {/* Blue Laser Burst Effect */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.1, 0.2, 0.1]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <div className="w-64 h-64 rounded-full bg-gradient-radial from-blue-500/10 via-blue-500/5 to-transparent blur-2xl" />
                        </motion.div>

                        {/* Final Text */}
                        <motion.div
                            className="relative z-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 1, delay: 1.0 }}
                        >
                            <h3 className="text-3xl md:text-5xl font-bold font-display text-gradient-cosmic">
                                Continuing the Journey
                            </h3>
                            <p className="text-lg md:text-xl text-slate-300 mt-4 flex items-center justify-center gap-2">
                                Building the future, one line of code at a time
                                <Sparkles className="w-5 h-5 text-blue-400 inline" />
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
