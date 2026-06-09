import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Code2, MonitorSmartphone, Layout, Award, Rocket, Sparkles, Terminal } from "lucide-react"

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  const technologies = [
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
    { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
    { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  ]

  const platforms = [
    { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "Render", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/render/render-original.svg" },
  ]

  const capabilities = [
    { title: "Web Apps", icon: <Layout className="w-6 h-6 text-[#ffb703]" />, desc: "Scalable MERN stack applications" },
    { title: "Mobile", icon: <MonitorSmartphone className="w-6 h-6 text-[#fb8500]" />, desc: "Cross-platform iOS & Android" },
    { title: "Backend", icon: <Terminal className="w-6 h-6 text-[#ffb703]" />, desc: "Robust APIs and architectures" },
  ]

  // Bento Box Container Component
  const BentoBox = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-3xl bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-white/10 overflow-hidden group hover:border-[#fb8500]/40 dark:hover:border-[#ffb703]/30 transition-colors duration-500 shadow-sm dark:shadow-none ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  )

  return (
    <section ref={sectionRef} id="about" className="relative py-32 overflow-hidden bg-slate-50 dark:bg-black transition-colors duration-500">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#ffb703]/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#fb8500]/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 flex flex-col items-start lg:items-center text-left lg:text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffb703]/10 border border-[#ffb703]/20 mb-6">
            <Sparkles className="w-4 h-4 text-[#fb8500] dark:text-[#ffb703]" />
            <span className="text-sm font-medium text-[#fb8500] dark:text-[#ffb703] tracking-wide uppercase">Discover</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight">
            Behind the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fb8500] to-[#ffb703] dark:from-[#ffb703] dark:to-[#fb8500]">Code</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            I blend technical expertise with creative problem-solving to build digital experiences that look great and perform flawlessly.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
          
          {/* Main Intro Box - Spans 2 cols, 2 rows */}
          <BentoBox className="md:col-span-2 lg:col-span-2 row-span-2 p-8 md:p-10" delay={0.1}>
            <div className="h-full flex flex-col justify-between gap-8">
              <div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Hi, I'm Dev Suthar</h3>
                <p className="text-[#fb8500] dark:text-[#ffb703] font-medium tracking-wide">Developer & Creative Creator</p>
              </div>
              <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  As a multi-skilled developer and fresher in the tech industry, I bring high energy, fresh perspectives, and an obsession with quality to every project.
                </p>
                <p>
                  My unique background as a YouTuber and video editor gives me an edge in UI/UX design—I don't just write code, I craft engaging digital journeys.
                </p>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex -space-x-4">
                  {/* Abstract representations of code commits/activity */}
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`w-12 h-12 rounded-full border-2 border-slate-50 dark:border-slate-900 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center z-[${4-i}]`}>
                      <Code2 className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                    </div>
                  ))}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  <span className="text-slate-900 dark:text-white font-bold block">100+</span> Repositories
                </div>
              </div>
            </div>
          </BentoBox>

          {/* Capabilities Box */}
          <BentoBox className="md:col-span-1 lg:col-span-2 p-8" delay={0.2}>
            <div className="flex items-center gap-3 mb-6">
              <Rocket className="w-5 h-5 text-[#fb8500] dark:text-[#ffb703]" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">What I Build</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
              {capabilities.map((cap, i) => (
                <div key={i} className="flex flex-col gap-3 p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 hover:bg-white dark:hover:bg-slate-800 transition-colors shadow-sm dark:shadow-none">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 w-fit">
                    {cap.icon}
                  </div>
                  <div>
                    <h4 className="text-slate-800 dark:text-slate-200 font-semibold">{cap.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{cap.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </BentoBox>

          {/* Tech Stack Marquee Box */}
          <BentoBox className="md:col-span-3 lg:col-span-2 p-8 flex flex-col justify-center overflow-hidden" delay={0.3}>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Tech Arsenal</h3>
            
            {/* Row 1 */}
            <div className="relative w-full overflow-hidden mb-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex gap-4 animate-scroll-infinite w-max">
                {[...technologies, ...technologies].slice(0, 12).map((tech, i) => (
                  <div key={`t1-${i}`} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 backdrop-blur-sm min-w-max hover:bg-white dark:hover:bg-slate-800 transition-colors shadow-sm dark:shadow-none">
                    <img src={tech.icon} alt={tech.name} className="w-6 h-6 object-contain" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Row 2 (Reverse) */}
            <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex gap-4 animate-scroll-infinite-reverse w-max">
                {[...technologies, ...technologies].slice(12, 24).map((tech, i) => (
                  <div key={`t2-${i}`} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 backdrop-blur-sm min-w-max hover:bg-white dark:hover:bg-slate-800 transition-colors shadow-sm dark:shadow-none">
                    <img src={tech.icon} alt={tech.name} className="w-6 h-6 object-contain" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </BentoBox>

          {/* Achievements / Highlights */}
          <BentoBox className="md:col-span-2 lg:col-span-2 p-8" delay={0.4}>
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-5 h-5 text-[#fb8500] dark:text-[#ffb703]" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Highlights</h3>
            </div>
            <div className="space-y-4">
              {[
                { text: "Built scalable Android apps using Kotlin & Flutter", highlight: "Kotlin & Flutter" },
                { text: "Developed high-performance web apps with the MERN Stack", highlight: "MERN Stack" },
                { text: "Content creator blending dev skills with UI/UX mastery", highlight: "UI/UX mastery" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-white/5 group-hover:border-slate-300 dark:group-hover:border-white/10 transition-colors shadow-sm dark:shadow-none">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#fb8500] dark:bg-[#ffb703] mt-2 shadow-[0_0_8px_#fb8500] dark:shadow-[0_0_8px_#ffb703]" />
                  <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                    {item.text.split(item.highlight).map((part, index, arr) => 
                      <span key={index}>
                        {part}
                        {index < arr.length - 1 && <span className="text-[#fb8500] dark:text-[#ffb703] font-semibold">{item.highlight}</span>}
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </BentoBox>

          {/* Deployment Tools */}
          <BentoBox className="md:col-span-1 lg:col-span-2 p-8" delay={0.5}>
            <div className="h-full flex flex-col justify-between">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Cloud & DevOps</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Streamlined deployment pipelines</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {platforms.map((platform, i) => (
                  <div key={i} className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 hover:scale-[1.02] transition-transform shadow-sm dark:shadow-none">
                    <img src={platform.icon} alt={platform.name} className="w-10 h-10 object-contain drop-shadow-sm dark:drop-shadow-md" />
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{platform.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </BentoBox>

        </div>
      </div>
    </section>
  )
}
