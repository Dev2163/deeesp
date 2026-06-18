import { motion } from "framer-motion"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { projects } from "@/data/projects"

interface CardProps {
  project: any;
  index: number;
  totalCards: number;
}

const Card = ({ project, index, totalCards }: CardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate Fan Layout parameters
  const middleIndex = Math.floor(totalCards / 2);
  const distance = index - middleIndex;
  
  // Angle and spread logic
  const rotation = distance * 6; // degrees rotation
  const yOffset = Math.abs(distance) * 15; // arc downward curve
  const xOffset = distance * 90; // spread horizontally

  // zIndex calculation: middle card is highest, edges are lowest
  const baseZIndex = 10 + (totalCards - Math.abs(distance));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: yOffset }}
      viewport={{ once: true }}
      animate={{
        rotate: rotation,
        y: yOffset,
        x: xOffset,
        scale: 1,
        zIndex: isHovered ? 50 : baseZIndex, // keep zIndex managed via state to delay slightly if needed, or just let framer handle it.
      }}
      whileHover={{
        rotate: 0,
        y: -50,
        scale: 1.15,
        zIndex: 50,
      }}
      transition={{ 
        type: "tween", 
        ease: "easeInOut",
        duration: 0.3
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="absolute top-0 left-1/2 -ml-[125px] lg:-ml-[150px] w-[250px] lg:w-[300px] h-[350px] lg:h-[400px] rounded-3xl overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_15px_50px_rgba(0,0,0,0.6)] border border-slate-200/50 dark:border-white/10 cursor-pointer bg-slate-900 origin-bottom"
      onClick={() => navigate(`/project/${project.id}`)}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
        style={{ backgroundImage: `url(${project.image})` }}
      />
      
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent dark:from-black dark:via-black/40 transition-opacity duration-300 ${isHovered ? 'opacity-80' : 'opacity-100'}`} />
      
      {/* Content */}
      <div className="relative z-10 p-5 lg:p-6 h-full flex flex-col justify-end text-white">
          <motion.div 
            animate={{ y: isHovered ? -5 : 0 }} 
            transition={{ duration: 0.2 }}
            className="mb-2"
          >
              <span className="px-3 py-1 rounded-full bg-white/20 dark:bg-[#ffb703]/20 border border-white/30 dark:border-[#ffb703]/30 text-white dark:text-[#ffb703] text-[10px] font-bold backdrop-blur-md uppercase tracking-widest shadow-lg">
                {project.category}
              </span>
          </motion.div>
          
          <motion.h3 
             animate={{ y: isHovered ? -5 : 0, color: isHovered ? '#ffb703' : '#ffffff' }}
             className="text-2xl lg:text-3xl font-display font-black uppercase tracking-tighter mb-2 leading-[0.9] text-white drop-shadow-lg"
          >
              {project.title}
          </motion.h3>
          <motion.p 
             animate={{ opacity: isHovered ? 1 : 0.8, y: isHovered ? -5 : 0 }}
             className="text-xs lg:text-sm text-slate-100 mb-3 font-light drop-shadow-md line-clamp-2"
          >
              {project.description}
          </motion.p>
          
          {/* Tech Stack Chips - Fade in slightly on hover */}
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: isHovered ? 1 : 0.5 }}
             className="flex flex-wrap gap-1 mt-1"
          >
              {project.technologies.slice(0, 3).map((tech: string) => (
                  <span key={tech} className="px-2 py-0.5 rounded-md bg-white/10 border border-white/20 text-white text-[9px] font-medium backdrop-blur-sm">
                      {tech}
                  </span>
              ))}
          </motion.div>
      </div>
    </motion.div>
  )
}

export function ProjectsSection() {
  // State for filtering
  const [filter, setFilter] = useState("All")
  const categories = [
    { name: "All", count: projects.length },
    { name: "Web", count: projects.filter(p => p.category === "Web").length },
    { name: "Mobile", count: projects.filter(p => p.category === "Mobile").length },
  ]
  const filteredProjects = filter === "All" ? projects : projects.filter(p => p.category === filter)

  // Fan layout works best with 5-7 items max.
  const displayProjects = filteredProjects.slice(0, 7);

  return (
    <section id="projects" className="relative bg-slate-50 dark:bg-black pt-24 pb-32 lg:pb-48 w-full transition-colors duration-500 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#fb8500]/10 dark:bg-[#ffb703]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header & Filter */}
      <div className="container mx-auto px-4 md:px-8 relative z-50 mb-16 lg:mb-24">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left w-full md:w-auto"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-3 font-display">
              <span className="text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-lg tracking-tight">
                Featured Work
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto md:mx-0">
              A place to display my masterpieces.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 justify-center bg-white/60 dark:bg-zinc-900/60 p-2 rounded-full backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-lg"
          >
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setFilter(category.name)}
                className={`px-5 py-2 lg:px-6 lg:py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                  filter === category.name
                    ? 'bg-[#fb8500] dark:bg-[#ffb703] text-white dark:text-black shadow-[0_4px_15px_rgba(251,133,0,0.3)] dark:shadow-[0_4px_15px_rgba(255,183,3,0.5)]'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-white/10'
                }`}
              >
                {category.name} <span className="ml-1 opacity-70 text-[10px]">({category.count})</span>
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Fan Layout Container (Desktop / Tablet) */}
      <div className="relative w-full h-[400px] lg:h-[450px] justify-center items-end mt-10 hidden sm:flex pointer-events-none">
          <div className="relative w-full max-w-5xl h-full mx-auto pointer-events-auto">
              {displayProjects.map((project, i) => (
                  <Card 
                    key={project.id} 
                    project={project} 
                    index={i} 
                    totalCards={displayProjects.length} 
                  />
              ))}
          </div>
      </div>
      
      {/* View All Text (Desktop) */}
      <div className="hidden sm:flex justify-center mt-12 opacity-50 dark:opacity-40">
         <p className="text-sm font-medium tracking-widest uppercase">Hover over cards to explore</p>
      </div>

      {/* Fallback Mobile Stack Layout (Since fan is too wide for phones) */}
      <div className="sm:hidden flex flex-col gap-6 px-4 relative z-20">
          {filteredProjects.map((project) => (
               <div 
                  key={project.id}
                  onClick={() => window.location.href = `/project/${project.id}`}
                  className="w-full h-[350px] rounded-3xl overflow-hidden shadow-2xl relative border border-slate-200 dark:border-white/10"
               >
                   <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent dark:from-black dark:via-black/40" />
                    <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
                        <span className="px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-[10px] font-bold backdrop-blur-md uppercase tracking-widest self-start mb-2">
                            {project.category}
                        </span>
                        <h3 className="text-2xl font-display font-black uppercase tracking-tighter mb-2 leading-[0.9] text-white drop-shadow-md">
                            {project.title}
                        </h3>
                        <p className="text-xs text-slate-200 line-clamp-2">
                           {project.description}
                        </p>
                    </div>
               </div>
          ))}
      </div>
    </section>
  )
}
