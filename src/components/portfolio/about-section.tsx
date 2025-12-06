import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Code, Award } from "lucide-react"

export function AboutSection() {
  const technologies = [
    { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
    { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
    { name: "SQLite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
    { name: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
    { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" }
  ]

  const education = [
    {
      degree: "Master of Computer Applications (MCA)",
      period: "2024 – Present",
      cgpa: "7.08",
      description: "Strengthening my technical depth and exploring advanced systems."
    },
    {
      degree: "Bachelor of Science in IT (B.Sc. IT)",
      period: "2021 – 2024",
      cgpa: "7.43",
      description: "Gained a solid foundation in programming, databases, and web tech."
    }
  ]

  const achievements = [
    "Built Android apps with Kotlin and Flutter",
    "Developed dynamic web applications with MERN Stack",
    "Created engaging video content as YouTuber",
    "Proficient in UI/UX design principles"
  ]

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-text-gradient bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A passionate fresher developer and content creator from Gujarat, India, ready to make an impact in the tech world.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Personal Introduction */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 bg-card-gradient shadow-elegant border-0">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-6 flex items-center text-black dark:text-white">
                  <span className="text-3xl mr-3">👋</span>
                  Hi, I'm Dev Suthar
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    A multi-skilled developer, creator, and lifelong learner passionate about building impactful digital solutions. As a fresher in the tech industry, I bring fresh perspectives and enthusiasm to every project.
                  </p>
                  <p>
                    Beyond coding, I'm also a YouTuber and video editor, which gives me a unique creative approach to UI/UX design and user experience.
                  </p>
                  <div className="pt-4">
                    <h4 className="font-semibold text-foreground mb-3">What I Can Build:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="text-primary mr-2">🌐</span>
                        <span>Websites & Web Applications</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-primary mr-2">📱</span>
                        <span>Android and iOS Apps</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-primary mr-2">💻</span>
                        <span>Custom Software Solutions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <GraduationCap className="w-6 h-6 mr-3 text-primary" />
              My Journey
            </h3>

            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 bg-card-gradient shadow-elegant border-0 hover:shadow-glow transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                      <Badge variant="secondary" className="text-xs">
                        CGPA: {edu.cgpa}
                      </Badge>
                    </div>
                    <p className="text-primary font-medium mb-2">{edu.period}</p>
                    <p className="text-muted-foreground">{edu.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 overflow-hidden"
        >
          <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center">
            <Code className="w-6 h-6 mr-3 text-primary" />
            Technologies I Use
          </h3>

          {/* Infinite Scrolling Container */}
          <div className="relative">
            <div className="flex animate-scroll">
              {/* First set of technologies */}
              {technologies.map((tech, index) => (
                <div
                  key={`tech-1-${index}`}
                  className="flex-shrink-0 mx-4"
                >
                  <Badge variant="outline" className="px-6 py-4 text-base font-medium whitespace-nowrap flex items-center gap-3">
                    <img src={tech.icon} alt={tech.name} className="w-8 h-8" />
                    {tech.name}
                  </Badge>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {technologies.map((tech, index) => (
                <div
                  key={`tech-2-${index}`}
                  className="flex-shrink-0 mx-4"
                >
                  <Badge variant="outline" className="px-6 py-4 text-base font-medium whitespace-nowrap flex items-center gap-3">
                    <img src={tech.icon} alt={tech.name} className="w-8 h-8" />
                    {tech.name}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center">
            <Award className="w-6 h-6 mr-3 text-primary" />
            Major Projects & Achievements
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 bg-card-gradient shadow-elegant border-0 hover:shadow-glow transition-all duration-300">
                  <CardContent className="p-0 flex items-center">
                    <div className="w-3 h-3 bg-primary rounded-full mr-4 animate-pulse"></div>
                    <p className="text-foreground">{achievement}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>


      </div>
    </section>
  )
}