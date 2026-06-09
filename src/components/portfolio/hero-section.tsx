import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Parallax scroll effect
  const { scrollY } = useScroll()
  const yImage = useTransform(scrollY, [0, 1000], [0, 200])
  const yText = useTransform(scrollY, [0, 1000], [0, -100])
  const opacity = useTransform(scrollY, [0, 600], [1, 0])

  return (
    <section 
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-black text-slate-900 dark:text-white transition-colors duration-500"
    >
      {/* Central Portrait Image with Radial Fade */}
      <motion.div 
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
        style={{ y: yImage, opacity }}
      >
        <motion.div 
            className="relative w-full h-full max-w-2xl mx-auto flex items-end md:items-center justify-center"
            initial={{ scale: 1.15, filter: "blur(15px)", opacity: 0 }}
            animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
        >
            {/* The image itself */}
            <img 
                src="/images/dev.png" 
                alt="Dev Suthar" 
                className="object-cover w-full h-full object-top opacity-70 md:opacity-90 mix-blend-lighten"
            />
            {/* Safe gradient overlays to fade the image into background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,white_80%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_20%,black_80%)] transition-colors duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/40 to-transparent dark:from-black dark:via-black/40 dark:to-transparent transition-colors duration-500" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-transparent to-transparent dark:from-black dark:via-transparent dark:to-transparent h-32 transition-colors duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-transparent to-slate-50 dark:from-black dark:via-transparent dark:to-black transition-colors duration-500" />
        </motion.div>
      </motion.div>

      {/* Massive Typography */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 w-full"
        style={{ y: yText, opacity }}
      >
        <div className="relative flex flex-col items-center w-full">
            {/* Cursive Text */}
            <motion.div
                initial={{ opacity: 0, y: 40, rotate: -15, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, rotate: -3, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.7, type: "spring", stiffness: 100, damping: 15 }}
                className="absolute top-0 md:-top-8 z-20"
            >
                <h2 className="font-['Dancing_Script'] text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-[#ffb703] drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                    Creative
                </h2>
            </motion.div>

            {/* Huge PORTFOLIO Text */}
            <div className="overflow-hidden py-4">
                <motion.h1 
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="font-display font-black text-[22vw] sm:text-[20vw] md:text-[18vw] leading-[0.85] text-center uppercase text-slate-900 dark:text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] dark:drop-shadow-2xl select-none whitespace-nowrap z-10 tracking-tighter transition-colors duration-500"
                >
                    PORTFOLIO
                </motion.h1>
            </div>
        </div>
      </motion.div>

      {/* Inner Bottom Elements (Just below PORTFOLIO) */}
      <div className="absolute top-[60%] md:top-[65%] w-full px-6 md:px-[10%] flex flex-col md:flex-row justify-between items-start z-20 pointer-events-none">
        <motion.p 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xs md:text-sm text-slate-600 dark:text-slate-200 font-medium tracking-wide drop-shadow-sm dark:drop-shadow-md"
        >
            Creative Portfolio Presentation
        </motion.p>
        <motion.p 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xs md:text-sm text-slate-600 dark:text-slate-200 font-medium tracking-wide drop-shadow-sm dark:drop-shadow-md mt-4 md:mt-0"
        >
            Presented By: Dev Suthar
        </motion.p>
      </div>

      {/* Absolute Bottom Elements (Icons and Link) */}
      <div className="absolute bottom-8 md:bottom-12 w-full px-6 md:px-12 flex justify-between items-end z-20">
        
        {/* Left Icons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex gap-3"
        >
            <div className="w-8 h-8 rounded-full bg-[#ffb703] flex items-center justify-center text-black shadow-[0_0_15px_rgba(255,183,3,0.4)] hover:scale-110 transition-transform cursor-pointer pointer-events-auto">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#ffb703] flex items-center justify-center text-black shadow-[0_0_15px_rgba(255,183,3,0.4)] hover:scale-110 transition-transform cursor-pointer pointer-events-auto">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
            </div>
        </motion.div>

        {/* Right Link */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-slate-600 dark:text-slate-200 text-sm font-medium tracking-wide drop-shadow-sm dark:drop-shadow-md pointer-events-auto"
        >
          <a 
            href="https://github.com/Dev2163" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#ffb703] transition-colors border-b border-slate-300 dark:border-slate-400 hover:border-[#ffb703] dark:hover:border-[#ffb703] pb-0.5"
          >
            Hey! I'm on GitHub
          </a>
        </motion.div>

      </div>
    </section>
  )
}
