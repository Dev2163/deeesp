import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { projects } from "@/data/projects"

interface CardProps {
  project: any;
  index: number;
  progress: MotionValue<number>;
  targetScale: number;
  range: [number, number];
}

const Card = ({ project, index, progress, targetScale, range }: CardProps) => {
  const navigate = useNavigate();
  
  const scale = useTransform(progress, range, [1, targetScale])
  
  // As the card shrinks and goes to the background, it should get darker
  const overlayOpacity = useTransform(progress, range, [0, 0.6])

  return (
    <div className="h-screen w-full flex items-center justify-center sticky top-0 pointer-events-none">
      <motion.div 
        style={{ 
            scale, 
            top: `calc(10vh + ${index * 20}px)` 
        }}
        className="relative w-[90vw] md:w-full h-[75vh] md:h-[80vh] max-w-6xl mx-auto rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-white/10 origin-top bg-slate-50 dark:bg-zinc-950 pointer-events-auto transition-colors duration-500"
      >
        {/* Dark Overlay for Depth Effect */}
        <motion.div 
            style={{ opacity: overlayOpacity }} 
            className="absolute inset-0 bg-black pointer-events-none z-[60]"
        />
        
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        
        {/* Gradient Overlays for Cinematic Feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent dark:from-black dark:via-black/40 transition-colors duration-500" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/20 to-transparent dark:from-black/80 dark:via-black/20 hidden md:block transition-colors duration-500" />
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20 transition-colors duration-500" /> {/* Dimmer */}
        
        {/* Content */}
        <div className="relative z-10 p-6 md:p-16 h-full flex flex-col justify-between text-white">
            {/* Top Row: Category Badge & Index */}
            <div className="flex justify-between items-start">
                <span className="px-4 py-2 rounded-full bg-white/90 dark:bg-[#ffb703]/20 border border-slate-200 dark:border-[#ffb703]/30 text-[#fb8500] dark:text-[#ffb703] text-xs md:text-sm font-bold backdrop-blur-md uppercase tracking-widest shadow-lg">
                  {project.category}
                </span>
                <span className="text-6xl md:text-8xl font-black text-white/40 dark:text-white/10 font-display drop-shadow-md select-none tracking-tighter">
                    0{index + 1}
                </span>
            </div>
            
            {/* Bottom Details */}
            <div className="max-w-3xl">
                <p className="text-xs md:text-sm font-bold tracking-widest text-[#ffb703] dark:text-[#ffb703]/80 uppercase mb-2 drop-shadow-md">
                    {project.subtitle}
                </p>
                <h3 className="text-4xl sm:text-5xl md:text-7xl font-display font-black uppercase tracking-tighter mb-4 md:mb-6 drop-shadow-2xl leading-[0.9] text-white">
                    {project.title}
                </h3>
                <p className="text-sm md:text-xl text-slate-100 dark:text-slate-200 mb-6 md:mb-8 font-light drop-shadow-md leading-relaxed line-clamp-3 md:line-clamp-none">
                    {project.description}
                </p>
                
                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-10">
                    {project.technologies.slice(0, 4).map((tech: string) => (
                        <span key={tech} className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-medium backdrop-blur-sm shadow-md">
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 4 && (
                        <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-medium backdrop-blur-sm shadow-md">
                            +{project.technologies.length - 4} more
                        </span>
                    )}
                </div>
                
                {/* Action Button */}
                <button
                    onClick={() => navigate(`/project/${project.id}`)}
                    className="group relative px-6 py-3 md:px-8 md:py-4 bg-[#ffb703] text-slate-950 font-bold rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,183,3,0.4)] text-sm md:text-base pointer-events-auto"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        View Full Project
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:translate-x-1 transition-transform">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </span>
                </button>
            </div>
        </div>
      </motion.div>
    </div>
  )
}

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track scroll progress of the entire stack container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // State for filtering
  const [filter, setFilter] = useState("Web")
  const categories = [
    { name: "Web", count: projects.filter(p => p.category === "Web").length },
    { name: "Mobile", count: projects.filter(p => p.category === "Mobile").length },
  ]
  const filteredProjects = projects.filter(p => p.category === filter)

  return (
    <section id="projects" className="relative bg-slate-100 dark:bg-black pt-24 pb-12 w-full transition-colors duration-500">
      {/* Header & Filter */}
      <div className="container mx-auto px-4 md:px-8 relative z-20 mb-4 md:mb-1">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 bg-white/50 dark:bg-black/50 backdrop-blur-md p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-2xl transition-colors duration-500">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 font-display">
              <span className="text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-lg tracking-tight uppercase">
                Featured Work
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl">
              Scroll down to explore my curated projects.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setFilter(category.name)}
                className={`px-4 py-1.5 md:px-6 md:py-2 rounded-full font-semibold text-sm md:text-base transition-all duration-300 backdrop-blur-md border ${
                  filter === category.name
                    ? 'bg-[#fb8500] dark:bg-[#ffb703] text-white dark:text-black border-[#fb8500] dark:border-[#ffb703] shadow-[0_4px_15px_rgba(251,133,0,0.3)] dark:shadow-[0_0_15px_rgba(255,183,3,0.5)]'
                    : 'bg-white dark:bg-white/5 text-slate-600 dark:text-white border-slate-200 dark:border-white/20 hover:bg-slate-50 dark:hover:bg-white/10 shadow-sm dark:shadow-none'
                }`}
              >
                {category.name} <span className="ml-1 opacity-70 text-[10px] md:text-xs">({category.count})</span>
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* The Stacked Cards Container */}
      <div ref={containerRef} className="relative w-full pb-[10vh]">
        {filteredProjects.map((project, i) => {
          // Calculate the specific progress range for this card to start shrinking
          // (It only starts shrinking once we scroll PAST it, which is roughly i / length)
          const targetScale = 1 - ((filteredProjects.length - i) * 0.05)
          const range: [number, number] = [i / filteredProjects.length, 1]
          
          return (
            <Card 
              key={project.id} 
              project={project} 
              index={i} 
              progress={scrollYProgress} 
              targetScale={targetScale}
              range={range}
            />
          )
        })}
      </div>
    </section>
  )
}
