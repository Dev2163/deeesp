import { useParams, useNavigate } from "react-router-dom";
import { projects } from "@/data/projects";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 rounded-full bg-[#ffb703] text-black font-bold hover:bg-[#ffb703]/80 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white selection:bg-[#ffb703]/30 selection:text-white">
      {/* Back Button (Fixed) */}
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        onClick={() => navigate('/#projects')}
        className="fixed top-8 left-4 md:left-8 z-50 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2 group"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        <span className="font-medium tracking-wide text-sm">Back</span>
      </motion.button>

      {/* Hero Section */}
      <div className="relative h-[100vh] w-full overflow-hidden flex items-center justify-center">
        {/* Parallax Background */}
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0"
        >
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </motion.div>
        
        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase mb-6 bg-[#ffb703]/20 border border-[#ffb703]/30 text-[#ffb703]">
              {project.category}
            </span>
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-black mb-6 uppercase tracking-tighter leading-[0.9] drop-shadow-2xl font-display">
              {project.title}
            </h1>
            <p className="text-lg md:text-2xl text-slate-300 font-light tracking-wide max-w-3xl mx-auto">
              {project.subtitle}
            </p>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-widest text-white/50">Scroll to explore</span>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1 h-8 rounded-full bg-gradient-to-b from-[#ffb703] to-transparent"
            />
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 bg-black rounded-t-[3rem] -mt-8 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* Left Column (Overview & Features) */}
            <div className="lg:col-span-8 space-y-20">
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-sm font-bold tracking-widest text-[#ffb703] uppercase mb-8 flex items-center gap-4">
                  <span className="w-12 h-px bg-[#ffb703]/50"></span>
                  Overview
                </h2>
                <p className="text-xl md:text-3xl text-slate-200 font-light leading-relaxed">
                  {project.detailedDescription || project.description}
                </p>
              </motion.section>

              {project.features && project.features.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-sm font-bold tracking-widest text-[#ffb703] uppercase mb-8 flex items-center gap-4">
                    <span className="w-12 h-px bg-[#ffb703]/50"></span>
                    Key Features
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {project.features.map((feature, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-[#ffb703]/30 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#ffb703]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#ffb703]">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <p className="text-lg text-slate-300 leading-relaxed">{feature}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}
            </div>

            {/* Right Column (Sidebar) */}
            <div className="lg:col-span-4 space-y-12">
              {/* Tech Stack */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="p-8 rounded-[2.5rem] bg-zinc-900 border border-white/10 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffb703]/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-[#ffb703]/20 transition-colors" />
                
                <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-8">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-3 relative z-10">
                  {project.technologies.map((tech, idx) => (
                    <motion.span 
                      key={tech}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="px-4 py-2 rounded-xl bg-black border border-white/10 text-white text-sm font-medium hover:border-[#ffb703]/50 hover:text-[#ffb703] transition-colors"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Links */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-8 rounded-[2.5rem] bg-zinc-900 border border-white/10"
              >
                <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-8">
                  Project Links
                </h3>
                <div className="flex flex-col gap-4">
                  {project.liveDemo && project.liveDemo !== "#" && (
                    <a 
                      href={project.liveDemo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group relative flex items-center justify-between p-4 rounded-2xl bg-[#ffb703] text-black font-bold overflow-hidden transition-transform hover:scale-[1.02]"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                        Visit Live Demo
                      </span>
                      <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </a>
                  )}
                  {project.sourceCode && project.sourceCode !== "#" && (
                    <a 
                      href={project.sourceCode} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 rounded-2xl bg-black border border-white/10 text-white font-medium hover:border-white/30 transition-all hover:scale-[1.02]"
                    >
                      <span className="flex items-center gap-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        View Source Code
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:translate-x-1 transition-transform border border-white/5">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </a>
                  )}
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
