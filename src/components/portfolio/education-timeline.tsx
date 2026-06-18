import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

export function EducationTimeline() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
    const [activeStep, setActiveStep] = useState(0)

    const timelineSteps = [
        {
            id: 1,
            degree: "Bachelor of Science in IT",
            shortName: "B.Sc. IT",
            period: "2021 – 2024",
            institution: "Charotar University of Science and Technology (CHARUSAT)",
            cgpa: "7.43",
            description: "Gained a solid foundation in software development, data structures, and modern web applications.",
            color: "from-blue-600 to-[#ffb703]",
            current: false
        },
        {
            id: 2,
            degree: "Master of Computer Applications",
            shortName: "MCA",
            period: "2024 – Present",
            institution: "Charotar University of Science and Technology (CHARUSAT)",
            cgpa: "7.08",
            description: "Strengthening technical depth and specializing in mobile application engineering and advanced server architectures.",
            color: "from-[#ffb703] to-[#ffb703]/80",
            current: false
        },
        {
            id: 3,
            degree: "Android Developer Intern",
            shortName: "CodFleet, Ahmedabad",
            period: "January 2024 – Present",
            institution: "CodFleet",
            cgpa: "",
            description: "Designed and engineered responsive UI/UX architectures for cross-platform Android & iOS apps using React Native, while implementing clean state management to eliminate performance bottlenecks. Integrated continuous RESTful APIs with secure asynchronous connection layers and assisted in backend service optimization by developing functional API endpoints. Conducted rigorous UI-side component testing using real-time dynamic data and managed end-to-end multi-platform app deployment preparation pipelines for production environments.",
            color: "from-[#ffb703] to-[#ffb703]/80",
            current: true
        }
    ]


    return (
        <section
            ref={sectionRef}
            id="education"
            className="relative py-24 overflow-clip noise-overlay bg-white dark:bg-[#050505] transition-colors duration-500"
        >
            <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 lg:mb-24 flex flex-col items-center"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 px-4 text-slate-900 dark:text-white transition-colors duration-500">
                        <span className="text-gradient-cosmic cosmic-glow">
                            Experience & Education
                        </span>
                    </h2>
                    <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto px-4 transition-colors duration-500">
                        A detailed timeline of my professional experience and academic milestones
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-8">

                    {/* Left Side - 3D Sphere Graphic */}
                    <div
                        className="w-full lg:w-1/2 flex items-center justify-center h-[350px] lg:h-[600px] lg:sticky lg:top-32 mt-10 lg:mt-0"
                        style={{ perspective: '1000px' }}
                    >
                        <motion.div
                            className="relative w-[300px] h-[300px] flex items-center justify-center"
                            style={{ transformStyle: 'preserve-3d' }}
                            animate={{
                                rotateX: [0, 360],
                                rotateY: [0, 360]
                            }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        >
                            {/* Inner cosmic glow */}
                            <div className="absolute top-1/2 left-1/2 w-[150px] h-[150px] -mt-[75px] -ml-[75px] bg-[#ffb703]/20 blur-[50px] rounded-full pointer-events-none" />

                            {/* Core Sphere */}
                            <div className="absolute top-1/2 left-1/2 w-24 h-24 -mt-12 -ml-12 rounded-full bg-gradient-to-br from-[#ffb703] to-[#e85d04] opacity-80 blur-[2px] shadow-[0_0_30px_rgba(255,183,3,0.6)]" />
                            
                            {/* 3D Rings forming a sphere (Longitude) */}
                            {Array.from({ length: 12 }).map((_, i) => {
                                const rotateY = i * (180 / 12);
                                return (
                                    <motion.div
                                        key={`long-${i}`}
                                        className="absolute inset-0 rounded-full border-[1px]"
                                        style={{
                                            transform: `rotateY(${rotateY}deg)`,
                                            transformStyle: 'preserve-3d',
                                            borderColor: i % 3 === 0 ? 'rgba(255, 183, 3, 0.5)' : 'rgba(148, 163, 184, 0.2)',
                                            boxShadow: i % 3 === 0 ? '0 0 15px rgba(255, 183, 3, 0.2) inset' : 'none',
                                        }}
                                    />
                                );
                            })}
                            
                            {/* 3D Rings forming a sphere (Latitude/Diagonal) */}
                            {Array.from({ length: 12 }).map((_, i) => {
                                const rotateX = 90;
                                const rotateY = i * (180 / 12);
                                return (
                                    <motion.div
                                        key={`lat-${i}`}
                                        className="absolute inset-0 rounded-full border-[1px]"
                                        style={{
                                            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                                            transformStyle: 'preserve-3d',
                                            borderColor: i % 3 === 0 ? 'rgba(255, 183, 3, 0.3)' : 'rgba(148, 163, 184, 0.1)',
                                        }}
                                    />
                                );
                            })}
                            
                            {/* Orbiting Elements */}
                            {timelineSteps.map((step, i) => {
                                const isActive = activeStep === i;
                                const angle = i * (360 / timelineSteps.length);
                                
                                return (
                                    <motion.div
                                        key={`node-${i}`}
                                        className="absolute top-1/2 left-1/2 rounded-full"
                                        style={{
                                            width: isActive ? 24 : 16,
                                            height: isActive ? 24 : 16,
                                            marginTop: isActive ? -12 : -8,
                                            marginLeft: isActive ? -12 : -8,
                                            transform: `rotateY(${angle}deg) rotateX(20deg) translateZ(150px)`,
                                            transformStyle: 'preserve-3d',
                                        }}
                                        animate={{
                                            background: isActive ? '#ffb703' : '#cbd5e1',
                                            boxShadow: isActive ? '0 0 20px #ffb703' : 'none',
                                            border: isActive ? 'none' : '2px solid rgba(148, 163, 184, 0.5)',
                                            scale: isActive ? 1.2 : 1,
                                        }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {isActive && (
                                            <div className="absolute inset-0 bg-white/40 rounded-full blur-[2px]" />
                                        )}
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* Right Side - Timeline Steps */}
                    <div className="w-full lg:w-1/2 py-4 px-4 lg:px-0 relative">
                        <div className="flex flex-col space-y-12 lg:space-y-16 relative">
                            {timelineSteps.map((step, index) => {
                                return (
                                    <TimelineStepItem
                                        key={step.id}
                                        step={step}
                                        index={index}
                                        activeStep={activeStep}
                                        setActiveStep={setActiveStep}
                                        totalSteps={timelineSteps.length}
                                        globalIsInView={isInView}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function TimelineStepItem({ step, index, activeStep, setActiveStep, totalSteps, globalIsInView }: any) {
    const ref = useRef<HTMLDivElement>(null);
    const isScrollInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

    useEffect(() => {
        if (isScrollInView) {
            setActiveStep(index);
        }
    }, [isScrollInView, index, setActiveStep]);

    const isActive = activeStep === index;
    const isPast = index < activeStep;

    return (
        <div
            ref={ref}
            className="relative pl-14 lg:pl-20 cursor-pointer group"
            onMouseEnter={() => setActiveStep(index)}
            onClick={() => setActiveStep(index)}
        >
            {/* Track Line */}
            {index < totalSteps - 1 && (
                <>
                    <div
                        className="absolute left-[27px] top-[28px] w-[2px] bg-slate-200 dark:bg-slate-800/80 z-0 hidden sm:block transition-colors duration-500"
                        style={{ height: 'calc(100% + 64px)' }}
                    />
                    <div
                        className="absolute left-[27px] top-[28px] w-[2px] bg-slate-200 dark:bg-slate-800/80 z-0 block sm:hidden transition-colors duration-500"
                        style={{ height: 'calc(100% + 48px)' }}
                    />
                    <motion.div
                        className="absolute left-[27px] top-[28px] w-[2px] bg-[#ffb703] z-0 origin-top hidden sm:block"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: activeStep > index ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ height: 'calc(100% + 64px)' }}
                    />
                    <motion.div
                        className="absolute left-[27px] top-[28px] w-[2px] bg-[#ffb703] z-0 origin-top block sm:hidden"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: activeStep > index ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ height: 'calc(100% + 48px)' }}
                    />
                </>
            )}

            {/* Dot Container */}
            <div className="absolute left-0 top-0 w-14 h-14 flex items-center justify-center z-10">
                <motion.div
                    className={`w-5 h-5 rounded-full border-[3px] flex items-center justify-center transition-colors duration-300
                        ${isActive || isPast ? 'border-[#ffb703] bg-white dark:bg-slate-900' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900'}
                    `}
                    animate={{
                        scale: isActive ? 1.3 : 1,
                        boxShadow: isActive ? '0 0 15px rgba(255, 183, 3, 0.4)' : 'none'
                    }}
                >
                    {isActive && (
                        <motion.div
                            className="w-2 h-2 rounded-full bg-[#ffb703]"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring' }}
                        />
                    )}
                </motion.div>
            </div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={globalIsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex flex-col pt-[18px]"
            >
                <div className="flex items-center gap-3 mb-3">
                    <span className={`text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-[#ffb703]' : 'text-slate-500 group-hover:text-slate-400'}`}>
                        Step 0{index + 1}
                    </span>
                    {step.current && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ffb703]/10 text-[#ffb703] border border-[#ffb703]/20">
                            CURRENT
                        </span>
                    )}
                </div>

                <h3 className={`text-2xl lg:text-3xl font-bold mb-2 transition-colors duration-300 ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                    {step.degree}
                </h3>

                <div className="flex flex-wrap gap-2 text-slate-600 dark:text-slate-400 font-medium text-base mb-4 transition-colors duration-500">
                    <span className={isActive ? 'text-[#fb8500] dark:text-[#ffb703]' : ''}>{step.institution}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="block sm:inline w-full sm:w-auto">{step.period}</span>
                    {step.shortName && (
                        <>
                            <span className="hidden sm:inline">•</span>
                            <span className="block sm:inline w-full sm:w-auto text-slate-500 dark:text-slate-500">{step.shortName}</span>
                        </>
                    )}
                </div>

                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm lg:text-base transition-colors duration-500">
                    {step.description}
                </p>

                {step.cgpa && (
                    <div className="mt-5 inline-flex w-fit items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm transition-colors duration-500">
                        <span className="text-[#fb8500] dark:text-[#ffb703] font-bold">CGPA</span> {step.cgpa}
                    </div>
                )}
            </motion.div>
        </div>
    )
}
