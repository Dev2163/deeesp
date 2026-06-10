import { useParams, useNavigate } from "react-router-dom";
import { projects } from "@/data/projects";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { RequestAccessModal } from "@/components/portfolio/request-access-modal";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [activeLinkType, setActiveLinkType] = useState<"sourceCode" | "liveDemo">("liveDemo");
  const [activeLinkUrl, setActiveLinkUrl] = useState("");

  const handleLinkClick = (e: React.MouseEvent, type: "sourceCode" | "liveDemo", url: string) => {
    e.preventDefault();
    setActiveLinkType(type);
    setActiveLinkUrl(url);
    setModalOpen(true);
  };

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
    <div ref={containerRef} className="min-h-screen bg-black text-white selection:bg-[#ffb703]/30 selection:text-white font-sans overflow-x-hidden">
      
      {/* Decorative Background Glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#fb8500]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Back Button */}
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onClick={() => navigate('/')}
        className="fixed top-8 left-4 md:left-8 z-50 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 group"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        <span className="font-medium tracking-wide text-sm">Back to Portfolio</span>
      </motion.button>

      {/* Hero Section */}
      <div className="relative min-h-[100vh] w-full flex flex-col pt-32 pb-20 px-6 md:px-12 lg:px-24">
        
        {/* Top Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 mb-20">
          
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-white/10 border border-white/20 text-white backdrop-blur-sm">
                  {project.category}
                </span>
                <span className="w-12 h-px bg-white/30" />
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold leading-[1.05] tracking-tight mb-6 text-white drop-shadow-lg">
                {project.title}
              </h1>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-[#fb8500] mb-8 leading-relaxed">
                {project.subtitle}
              </h2>

              <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed font-light mb-12">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={(e) => handleLinkClick(e, "liveDemo", project.liveDemo || "#")}
                  className="px-8 py-4 bg-[#fb8500] text-black hover:bg-white hover:scale-105 transition-all duration-300 font-bold text-sm tracking-widest uppercase rounded-full shadow-[0_0_30px_rgba(251,133,0,0.3)]"
                >
                  Live Demo
                </button>
                <button 
                  onClick={(e) => handleLinkClick(e, "sourceCode", project.sourceCode || "#")}
                  className="px-8 py-4 bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 font-bold text-sm tracking-widest uppercase rounded-full"
                >
                  Source Code
                </button>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
               animate={{ opacity: 1, scale: 1, rotateY: 0 }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
               className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group perspective-1000"
             >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
             </motion.div>
          </div>

        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-10 mt-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8"
          >
            <h3 className="text-sm font-bold tracking-widest text-white/50 uppercase mb-8">
              Project Overview
            </h3>
            <div className="prose prose-invert prose-lg max-w-none text-slate-300 font-light leading-loose">
              <p>{project.detailedDescription || project.description}</p>
            </div>

            {project.features && project.features.length > 0 && (
              <div className="mt-16">
                <h3 className="text-sm font-bold tracking-widest text-white/50 uppercase mb-8">
                  Key Features
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {project.features.map((feature, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-[#fb8500]/20 text-[#fb8500] flex items-center justify-center mb-4">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <p className="text-slate-200">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4"
          >
            <div className="sticky top-32 p-8 rounded-[2rem] bg-zinc-900 border border-white/10 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#fb8500]/10 rounded-full blur-3xl -mr-10 -mt-10" />
              
              <h3 className="text-sm font-bold tracking-widest text-white/50 uppercase mb-8">
                Technologies
              </h3>
              
              <div className="flex flex-col gap-4 relative z-10">
                {project.technologies.map((tech) => (
                  <div key={tech} className="flex items-center gap-4 p-4 rounded-xl bg-black border border-white/5 hover:border-[#fb8500]/50 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#fb8500]/10 transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400 group-hover:text-[#fb8500]">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </div>
                    <span className="font-medium text-slate-300 group-hover:text-white transition-colors">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {project && (
        <RequestAccessModal 
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          projectId={project.id}
          projectTitle={project.title}
          linkType={activeLinkType}
          linkUrl={activeLinkUrl}
        />
      )}
    </div>
  );
};

export default ProjectDetail;
