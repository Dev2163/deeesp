import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { GraduationCap, BookOpen, Smartphone, Globe, Video, Palette, Code2, Sparkles, Laptop } from "lucide-react"

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const technologies = [
    { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", color: "from-blue-500 to-blue-600" },
    { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", color: "from-orange-500 to-red-500" },
    { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", color: "from-blue-400 to-blue-600" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "from-blue-400 to-blue-200" },
    { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg", color: "from-blue-600 to-blue-400" },
    { name: "SQLite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg", color: "from-blue-500 to-cyan-500" },
    { name: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg", color: "from-cyan-500 to-blue-500" },
    { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", color: "from-blue-400 to-cyan-400" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "from-blue-500 to-blue-300" },
    { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", color: "from-green-600 to-green-800" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "from-cyan-400 to-blue-500" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "from-green-500 to-green-700" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "from-green-500 to-green-600" },
    { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", color: "from-blue-500 to-cyan-400" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", color: "from-blue-600 to-blue-800" }
  ]

  const deploymentPlatforms = [
    { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", color: "from-black to-gray-800" },
    { name: "Render", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/render/render-original.svg", color: "from-blue-600 to-blue-400" },
    { name: "Railway", icon: "https://railway.app/brand/logo-light.svg", color: "from-blue-500 to-blue-300" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "from-orange-600 to-red-600" },
    { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", color: "from-gray-700 to-gray-900" }
  ]

  const achievements = [
    { text: "Built Android apps with Kotlin and Flutter", icon: <Smartphone className="w-8 h-8 text-white" />, color: "from-neural-500 to-quantum-500" },
    { text: "Developed dynamic web applications with MERN Stack", icon: <Globe className="w-8 h-8 text-white" />, color: "from-quantum-500 to-photon-500" },
    { text: "Created engaging video content as YouTuber", icon: <Video className="w-8 h-8 text-white" />, color: "from-photon-500 to-plasma-500" },
    { text: "Proficient in UI/UX design principles", icon: <Palette className="w-8 h-8 text-white" />, color: "from-plasma-500 to-neural-500" }
  ]

  // Simple, elegant Card Component (highly optimized for performance and mobile)
  const Card3D = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
        whileHover={{ y: -5, scale: 1.01 }}
        className="transition-all duration-300"
      >
        {children}
      </motion.div>
    )
  }

  return (
    <section ref={sectionRef} id="about" className="relative py-32 overflow-hidden noise-overlay">
      {/* Background */}
      <div className="absolute inset-0 bg-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 flex flex-col items-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <Code2 className="w-12 h-12 md:w-16 md:h-16 text-blue-400" />
          </motion.div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 px-4">
            <span className="text-gradient-quantum">About Me</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto px-4">
            A passionate fresher developer and content creator from Gujarat, India,
            ready to make an impact in the tech world.
          </p>
        </motion.div>

        {/* Introduction Card */}
        <div className="max-w-7xl mx-auto mb-20">
          <Card3D delay={0.2}>
            <div className="p-8 md:p-12 rounded-3xl glass-strong shadow-neural hover:shadow-glow transition-shadow duration-500 border border-white/5">
              <div className="flex items-center gap-4 mb-8">
                <h3 className="font-display text-3xl md:text-4xl text-gradient-cosmic cosmic-glow">
                  Hi, I'm Dev Suthar
                </h3>
              </div>

              <div className="space-y-6 text-slate-300 leading-relaxed text-base md:text-lg">
                <p>
                  A multi-skilled developer, creator, and lifelong learner passionate about
                  building impactful digital solutions. As a fresher in the tech industry,
                  I bring fresh perspectives and enthusiasm to every project.
                </p>
                <p>
                  Beyond coding, I'm also a YouTuber and video editor, which gives me a
                  unique creative approach to UI/UX design and user experience.
                </p>

                <div className="pt-6">
                  <h4 className="font-semibold text-slate-200 text-xl mb-6 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-blue-400" />
                    What I Can Build:
                  </h4>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { icon: <Globe className="w-10 h-10 text-blue-400" />, text: "Websites & Web Applications" },
                      { icon: <Smartphone className="w-10 h-10 text-blue-400" />, text: "Android and iOS Apps" },
                      { icon: <Laptop className="w-10 h-10 text-blue-400" />, text: "Custom Software Solutions" }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="flex flex-col items-center gap-3 p-6 rounded-2xl glass hover:bg-blue-900/10 transition-colors border border-white/5 text-center"
                        whileHover={{ scale: 1.05, y: -5 }}
                      >
                        <div>{item.icon}</div>
                        <span className="font-medium text-slate-200">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card3D>
        </div>

        {/* Technologies - Infinite Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="font-display text-4xl mb-4">
              <span className="text-gradient-photon">Technologies I Use</span>
            </h3>
          </div>

          <div className="relative overflow-hidden py-8">
            <div className="flex gap-6 animate-scroll-infinite">
              {[...technologies, ...technologies].map((tech, i) => (
                <motion.div
                  key={i}
                  className="flex-shrink-0 group"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-32 h-32 rounded-2xl glass-strong p-6 flex flex-col items-center justify-center gap-3 shadow-void hover:shadow-glow transition-all duration-300">
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-12 h-12 object-contain group-hover:scale-110 transition-transform"
                    />
                    <span className="text-sm font-medium text-center text-slate-200">{tech.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Deployment & Tools - Infinite Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.7 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="font-display text-4xl mb-4">
              <span className="text-gradient-plasma">Deployment & Tools</span>
            </h3>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto px-4">
              Experienced in deploying projects on modern cloud platforms
            </p>
          </div>

          <div className="relative overflow-hidden py-8">
            <div className="flex gap-6 animate-scroll-infinite-reverse">
              {[...deploymentPlatforms, ...deploymentPlatforms].map((platform, i) => (
                <motion.div
                  key={i}
                  className="flex-shrink-0 group"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-32 h-32 rounded-2xl glass-strong p-6 flex flex-col items-center justify-center gap-3 shadow-void hover:shadow-glow transition-all duration-300 border border-white/5">
                    <img
                      src={platform.icon}
                      alt={platform.name}
                      className="w-12 h-12 object-contain group-hover:scale-110 transition-transform"
                    />
                    <span className="text-sm font-medium text-center text-slate-200">{platform.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="font-display text-4xl mb-4">
              <span className="text-gradient-neural">Major Projects & Achievements</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, i) => (
              <Card3D key={i} delay={0.9 + i * 0.1}>
                <div className="p-6 rounded-2xl glass-strong shadow-neural hover:shadow-glow transition-all duration-500 group border border-white/5">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center text-3xl shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {achievement.icon}
                    </motion.div>
                    <p className="flex-1 font-medium text-slate-200 group-hover:text-blue-400 transition-colors">
                      {achievement.text}
                    </p>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 rounded-full bg-gradient-to-br from-quantum-500/5 to-neural-500/5 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-gradient-to-br from-photon-500/5 to-quantum-500/5 blur-3xl pointer-events-none"
        animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
    </section>
  )
}