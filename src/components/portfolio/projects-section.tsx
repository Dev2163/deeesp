import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  const [filter, setFilter] = useState("All")
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const projects = [
    {
      title: "WhoWear",
      subtitle: "Clothing Website",
      description: "An e-commerce fashion site showcasing dynamic product displays, category filters, and secure checkout.",
      image: "/images/whowear.png",
      technologies: ["React", "Node.js", "MongoDB"],
      category: "Web",
      gradient: "from-neural-500 to-quantum-500",
      liveDemo: "#",
      sourceCode: "https://github.com/Dev2163/whowear",
    },
    {
      title: "DS Car Show",
      subtitle: "Automotive Platform",
      description: "A platform for showcasing latest and upcoming cars with detailed specifications and comparisons.",
      image: "/images/carshow.png",
      technologies: ["Django", "SQLite", "Bootstrap"],
      category: "Web",
      gradient: "from-quantum-500 to-photon-500",
      liveDemo: "#",
      sourceCode: "https://github.com/Dev2163/car_shows",
    },
    {
      title: "Finance Tracker",
      subtitle: "Expense Management",
      description: "A comprehensive finance and expense tracking web app with analytics and insights.",
      image: "/images/finance.png",
      technologies: ["MERN Stack"],
      category: "Web",
      gradient: "from-photon-500 to-plasma-500",
      liveDemo: "#",
      sourceCode: "#",
    },
    {
      title: "EV App",
      subtitle: "Charging Stations",
      description: "Real-time charging stations locator with availability tracking and booking system.",
      image: "/images/ev.png",
      technologies: ["Kotlin", "Firebase"],
      category: "Mobile",
      gradient: "from-plasma-500 to-neural-500",
    },
    {
      title: "Grocery Purchase",
      subtitle: "Billing System",
      description: "Bill generation, export PDF, and inventory management for grocery stores.",
      image: "/images/grocery.png",
      technologies: ["Flutter", "SQLite"],
      category: "Mobile",
      gradient: "from-neural-500 to-photon-500",
    },
    {
      title: "Sundarkand Booking",
      subtitle: "Event Management",
      description: "Booking system with WhatsApp reminders and automated notifications.",
      image: "/images/sunderkand.png",
      technologies: ["Flutter", "SQLite"],
      category: "Mobile",
      gradient: "from-quantum-500 to-plasma-500",
    },
    {
      title: "Fixsnap",
      subtitle: "Home Service Platform",
      description: "Complete home service booking app and website with real-time tracking.",
      image: "/images/fixsnap.png",
      technologies: ["Flutter", "MongoDB", "Node.js", "Express.js"],
      category: "Mobile",
      gradient: "from-photon-500 to-quantum-500",
    },
    {
      title: "Over Expence",
      subtitle: "Budget Tracker",
      description: "Personal expense tracker with budget planning and spending insights.",
      image: "/images/tracker.png",
      technologies: ["Flutter", "SQLite"],
      category: "Mobile",
      gradient: "from-plasma-500 to-photon-500",
    },
  ]

  const categories = [
    { name: "All", icon: "✨", count: projects.length },
    { name: "Web", icon: "🌐", count: projects.filter(p => p.category === "Web").length },
    { name: "Mobile", icon: "📱", count: projects.filter(p => p.category === "Mobile").length },
  ]

  const filteredProjects = filter === "All"
    ? projects
    : projects.filter(p => p.category === filter)

  return (
    <section ref={sectionRef} id="projects" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <span className="text-6xl">🚀</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 px-4">
            <span className="text-gradient-cosmic cosmic-glow">
              My Projects
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-purple-300 max-w-3xl mx-auto mb-8 px-4">
            Here are some of the projects I've worked on during my learning journey as a fresher developer.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category, i) => (
            <motion.button
              key={category.name}
              onClick={() => setFilter(category.name)}
              className={`
                relative px-8 py-4 rounded-full font-semibold transition-all duration-300
                ${filter === category.name
                  ? 'bg-gradient-to-r from-yellow-500 via-purple-500 to-blue-500 text-white shadow-glow'
                  : 'glass-strong hover:bg-purple-500/10 border border-purple-500/20'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <span className="flex items-center gap-2">
                <span className="text-xl">{category.icon}</span>
                {category.name}
                <span className="ml-1 px-2 py-0.5 rounded-full bg-white/20 text-xs">
                  {category.count}
                </span>
              </span>

              {filter === category.name && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500 via-purple-500 to-blue-500 -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  layout: { type: "spring", stiffness: 300, damping: 30 }
                }}
                onMouseEnter={() => setHoveredProject(i)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative"
              >
                <div className="relative h-full rounded-3xl overflow-hidden glass-strong shadow-void hover:shadow-glow transition-all duration-500 border border-purple-500/20">
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: hoveredProject === i ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Gradient Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                        className="px-4 py-2 rounded-full glass-strong backdrop-blur-xl text-sm font-semibold border border-purple-500/30"
                      >
                        {project.category === "Web" ? "🌐" : "📱"} {project.category}
                      </motion.div>
                    </div>

                    {/* Action Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: hoveredProject === i ? 1 : 0,
                        y: hoveredProject === i ? 0 : 20
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-4 left-4 right-4 flex gap-2"
                    >
                      {project.sourceCode && (
                        <a
                          href={project.sourceCode}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-4 py-2 rounded-xl glass-strong backdrop-blur-xl text-center font-semibold hover:bg-purple-500/20 transition-colors border border-purple-500/30"
                        >
                          <span className="flex items-center justify-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            Code
                          </span>
                        </a>
                      )}
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500 via-purple-500 to-blue-500 text-white text-center font-semibold hover:shadow-glow transition-shadow"
                        >
                          <span className="flex items-center justify-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                            </svg>
                            Demo
                          </span>
                        </a>
                      )}
                    </motion.div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <motion.h3
                      className="font-display text-2xl mb-1 text-gradient-golden cosmic-glow transition-all"
                      animate={{
                        x: hoveredProject === i ? 5 : 0
                      }}
                    >
                      {project.title}
                    </motion.h3>
                    <p className="text-sm text-purple-300 mb-3">{project.subtitle}</p>
                    <p className="text-purple-200/80 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + i * 0.1 + techIndex * 0.05 }}
                          className="px-3 py-1 rounded-lg glass text-xs font-medium border border-purple-500/30 text-purple-200"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Decorative gradient border */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 -z-10 blur-xl transition-opacity duration-500"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <span className="text-6xl mb-4 block">🔍</span>
            <p className="text-xl text-purple-300">No projects found in this category</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
