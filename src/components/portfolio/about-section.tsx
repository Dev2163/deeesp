import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { useRef, useState } from "react"

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

  const technologies = [
    { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", color: "from-blue-500 to-blue-600" },
    { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", color: "from-orange-500 to-red-500" },
    { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", color: "from-blue-400 to-blue-600" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "from-yellow-400 to-yellow-600" },
    { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg", color: "from-purple-500 to-purple-700" },
    { name: "SQLite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg", color: "from-blue-500 to-cyan-500" },
    { name: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg", color: "from-cyan-500 to-blue-500" },
    { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", color: "from-blue-400 to-cyan-400" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "from-blue-500 to-yellow-500" },
    { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", color: "from-green-600 to-green-800" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "from-cyan-400 to-blue-500" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "from-green-500 to-green-700" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "from-green-500 to-green-600" },
    { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", color: "from-yellow-500 to-orange-500" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", color: "from-blue-600 to-blue-800" }
  ]

  const education = [
    {
      degree: "Master of Computer Applications (MCA)",
      period: "2024 – Present",
      cgpa: "7.08",
      description: "Strengthening my technical depth and exploring advanced systems.",
      icon: "🎓"
    },
    {
      degree: "Bachelor of Science in IT (B.Sc. IT)",
      period: "2021 – 2024",
      cgpa: "7.43",
      description: "Gained a solid foundation in programming, databases, and web tech.",
      icon: "📚"
    }
  ]

  const achievements = [
    { text: "Built Android apps with Kotlin and Flutter", icon: "📱", color: "from-neural-500 to-quantum-500" },
    { text: "Developed dynamic web applications with MERN Stack", icon: "🌐", color: "from-quantum-500 to-photon-500" },
    { text: "Created engaging video content as YouTuber", icon: "🎥", color: "from-photon-500 to-plasma-500" },
    { text: "Proficient in UI/UX design principles", icon: "🎨", color: "from-plasma-500 to-neural-500" }
  ]

  // 3D Card Component
  const Card3D = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
    const [rotateX, setRotateX] = useState(0)
    const [rotateY, setRotateY] = useState(0)
    const cardRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateXValue = ((y - centerY) / centerY) * -10
      const rotateYValue = ((x - centerX) / centerX) * 10

      setRotateX(rotateXValue)
      setRotateY(rotateYValue)
    }

    const handleMouseLeave = () => {
      setRotateX(0)
      setRotateY(0)
    }

    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
        className="transition-transform duration-200 ease-out"
      >
        {children}
      </motion.div>
    )
  }

  return (
    <section ref={sectionRef} id="about" className="relative py-32 overflow-hidden noise-overlay">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient-quantum opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <span className="text-4xl sm:text-5xl md:text-6xl">👨‍💻</span>
          </motion.div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 px-4">
            <span className="text-gradient-quantum">About Me</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            A passionate fresher developer and content creator from Gujarat, India,
            ready to make an impact in the tech world.
          </p>
        </motion.div>

        {/* Introduction & Education Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {/* Personal Introduction */}
          <Card3D delay={0.2}>
            <div className="h-full p-8 rounded-3xl glass-strong shadow-neural hover:shadow-glow transition-shadow duration-500">
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="text-5xl"
                >
                  👋
                </motion.div>
                <h3 className="font-display text-3xl">Hi, I'm Dev Suthar</h3>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  A multi-skilled developer, creator, and lifelong learner passionate about
                  building impactful digital solutions. As a fresher in the tech industry,
                  I bring fresh perspectives and enthusiasm to every project.
                </p>
                <p>
                  Beyond coding, I'm also a YouTuber and video editor, which gives me a
                  unique creative approach to UI/UX design and user experience.
                </p>

                <div className="pt-6 space-y-3">
                  <h4 className="font-semibold text-foreground text-lg mb-4">What I Can Build:</h4>
                  {[
                    { icon: "🌐", text: "Websites & Web Applications" },
                    { icon: "📱", text: "Android and iOS Apps" },
                    { icon: "💻", text: "Custom Software Solutions" }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl glass hover:bg-white/10 transition-colors"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Card3D>

          {/* Education - My Journey */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 mb-8"
            >
              <motion.span
                className="text-4xl"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                🎓
              </motion.span>
              <h3 className="font-display text-3xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-lime-400 to-green-400">
                  My Journey
                </span>
              </h3>
            </motion.div>

            {education.map((edu, i) => (
              <Card3D key={i} delay={0.4 + i * 0.1}>
                <div className="relative p-6 rounded-2xl bg-gradient-to-br from-void-900/90 to-void-800/90 border border-lime-500/20 shadow-lg hover:shadow-lime-500/20 transition-all duration-500 overflow-hidden group">
                  {/* Animated gradient border effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/0 via-lime-400/20 to-green-400/0"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    style={{ backgroundSize: '200% 100%' }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3 flex-1">
                        <motion.span
                          className="text-3xl mt-1"
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          {edu.icon}
                        </motion.span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg text-white mb-1">{edu.degree}</h4>
                          <p className="text-lime-400 font-medium text-sm">{edu.period}</p>
                        </div>
                      </div>
                      <motion.div
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/20 to-lime-400/20 border border-lime-400/30"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="text-sm font-bold text-lime-400">CGPA: {edu.cgpa}</span>
                      </motion.div>
                    </div>
                    <p className="text-void-300 leading-relaxed">{edu.description}</p>
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-lime-400/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Card3D>
            ))}
          </div>
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
                    <span className="text-sm font-medium text-center">{tech.name}</span>
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
                <div className="p-6 rounded-2xl glass-strong shadow-neural hover:shadow-glow transition-all duration-500 group">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center text-3xl shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {achievement.icon}
                    </motion.div>
                    <p className="flex-1 font-medium group-hover:text-neural-500 dark:group-hover:text-neural-400 transition-colors">
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
        className="absolute top-20 right-20 w-64 h-64 rounded-full bg-gradient-to-br from-quantum-500/10 to-neural-500/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-gradient-to-br from-photon-500/10 to-quantum-500/10 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
    </section>
  )
}